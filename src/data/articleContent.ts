import type { ArchiveYear } from "../types/archive";
import type { Article, ArticleStatus } from "../types/article";
import type { Category } from "../types/category";

type ArticleFrontmatter = {
  title?: string;
  slug?: string;
  summary?: string;
  category?: string;
  categorySlug?: string;
  categoryColor?: string;
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  cover?: string;
  visits?: number;
  comments?: number;
  status?: ArticleStatus;
  featured?: boolean;
};

const articleModules = import.meta.glob("./articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseScalarValue(value: string) {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  return trimmed;
}

function parseFrontmatter(rawContent: string) {
  if (!rawContent.startsWith("---")) {
    return {
      data: {} as ArticleFrontmatter,
      content: rawContent,
    };
  }

  const lines = rawContent.split(/\r?\n/);
  if (lines[0].trim() !== "---") {
    return {
      data: {} as ArticleFrontmatter,
      content: rawContent,
    };
  }

  const endIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === "---",
  );

  if (endIndex === -1) {
    return {
      data: {} as ArticleFrontmatter,
      content: rawContent,
    };
  }

  const frontmatterLines = lines.slice(1, endIndex);
  const content = lines.slice(endIndex + 1).join("\n");
  const data: Record<string, unknown> = {};
  let currentArrayKey: string | null = null;

  frontmatterLines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      currentArrayKey = null;
      return;
    }

    const arrayMatch = /^-\s+(.*)$/.exec(trimmed);
    if (arrayMatch && currentArrayKey) {
      const currentValue = data[currentArrayKey];
      if (Array.isArray(currentValue)) {
        currentValue.push(String(parseScalarValue(arrayMatch[1])));
      }
      return;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      currentArrayKey = null;
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (!rawValue) {
      data[key] = [];
      currentArrayKey = key;
      return;
    }

    data[key] = parseScalarValue(rawValue);
    currentArrayKey = null;
  });

  return {
    data: data as ArticleFrontmatter,
    content,
  };
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getFileName(path: string) {
  return path.split("/").pop()?.replace(/\.md$/, "") ?? "article";
}

function createStableId(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item));
}

function toNumber(value: unknown, fallback = 0) {
  return typeof value === "number" ? value : fallback;
}

function toBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function toStatus(value: unknown): ArticleStatus {
  return value === "draft" ? "draft" : "published";
}

const allArticles: Article[] = Object.entries(articleModules)
  .map(([path, rawContent]) => {
    const { data: frontmatter, content } = parseFrontmatter(rawContent);
    const fileName = getFileName(path);

    const title = String(frontmatter.title ?? fileName);
    const slug = slugify(String(frontmatter.slug ?? fileName));
    const publishedAt = String(frontmatter.publishedAt ?? "2026-01-01");
    const updatedAt = String(frontmatter.updatedAt ?? publishedAt);
    const categoryName = String(frontmatter.category ?? "Uncategorized");
    const categorySlug = slugify(
      String(frontmatter.categorySlug ?? categoryName),
    );
    const categoryColor = String(frontmatter.categoryColor ?? "#64748b");

    return {
      id: createStableId(slug),
      slug,
      title,
      summary: String(frontmatter.summary ?? ""),
      content: content.trim(),
      category: {
        name: categoryName,
        slug: categorySlug,
        color: categoryColor,
      },
      tags: toStringArray(frontmatter.tags),
      publishedAt,
      updatedAt,
      author: String(frontmatter.author ?? "Husen"),
      cover: String(frontmatter.cover ?? "/src/assets/images/1.png"),
      visits: toNumber(frontmatter.visits, 0),
      comments: toNumber(frontmatter.comments, 0),
      status: toStatus(frontmatter.status),
      featured: toBoolean(frontmatter.featured, false),
    };
  })
  .sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

export function getAllArticles() {
  return allArticles.filter((item) => item.status === "published");
}

export function getArticleBySlug(slug?: string) {
  if (!slug) return undefined;
  return getAllArticles().find((item) => item.slug === slug);
}

export function getAllCategories(): Category[] {
  const categoryMap = new Map<string, Category>();

  getAllArticles().forEach((article) => {
    const current = categoryMap.get(article.category.slug);

    if (current) {
      current.count += 1;
      return;
    }

    categoryMap.set(article.category.slug, {
      id: createStableId(article.category.slug),
      name: article.category.name,
      slug: article.category.slug,
      count: 1,
      description: "",
      color: article.category.color,
    });
  });

  return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count);
}

export function getAllArchives(): ArchiveYear[] {
  const yearMap = new Map<number, ArchiveYear>();

  getAllArticles().forEach((article) => {
    const date = new Date(article.publishedAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (!yearMap.has(year)) {
      yearMap.set(year, {
        year,
        count: 0,
        months: [],
      });
    }

    const yearData = yearMap.get(year)!;
    yearData.count += 1;

    const currentMonth = yearData.months.find((item) => item.month === month);

    if (currentMonth) {
      currentMonth.count += 1;
      currentMonth.articleIds.push(article.id);
      return;
    }

    yearData.months.push({
      month,
      count: 1,
      articleIds: [article.id],
    });
  });

  return Array.from(yearMap.values())
    .sort((a, b) => b.year - a.year)
    .map((yearItem) => ({
      ...yearItem,
      months: [...yearItem.months].sort((a, b) => b.month - a.month),
    }));
}
