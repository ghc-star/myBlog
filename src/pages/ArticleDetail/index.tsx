import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArticleToc, {
  type TocItem,
} from "../../components/ArticleRight/ArticleToc";
import { demoMarkdown } from "../../data/demoArticle";

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}

const headingClasses = {
  1: "mb-6 mt-2 scroll-mt-24 text-3xl font-bold leading-tight text-[var(--text-title)]",
  2: "mb-4 mt-8 scroll-mt-24 border-b border-[var(--border-normal)] pb-2 text-2xl font-semibold leading-tight text-[var(--text-title)]",
  3: "mb-3 mt-6 scroll-mt-24 text-xl font-semibold leading-snug text-[var(--text-title)]",
};

export default function ArticleDemo() {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  const components = useMemo(() => {
    const createHeading =
      (level: 1 | 2 | 3) =>
      ({ children }: { children?: React.ReactNode }) => {
        const text = React.Children.toArray(children).join("");
        const id = slugify(String(text));
        const Tag = `h${level}` as "h1" | "h2" | "h3";

        return (
          <Tag id={id} className={headingClasses[level]}>
            {children}
          </Tag>
        );
      };

    return {
      h1: createHeading(1),
      h2: createHeading(2),
      h3: createHeading(3),
      p: ({ children }: { children?: React.ReactNode }) => (
        <p className="mb-4 leading-8 text-[var(--text-strong)]">{children}</p>
      ),
      ul: ({ children }: { children?: React.ReactNode }) => (
        <ul className="mb-4 list-disc pl-6 text-[var(--text-strong)]">
          {children}
        </ul>
      ),
      ol: ({ children }: { children?: React.ReactNode }) => (
        <ol className="mb-4 list-decimal pl-6 text-[var(--text-strong)]">
          {children}
        </ol>
      ),
      code: ({
        inline,
        children,
      }: {
        inline?: boolean;
        children?: React.ReactNode;
      }) =>
        inline ? (
          <code className="rounded bg-[var(--card-bg-soft)] px-1 py-0.5 text-sm text-[var(--text-title)]">
            {children}
          </code>
        ) : (
          <code className="block overflow-x-auto rounded-xl bg-[var(--article-code-bg)] p-4 text-sm text-[var(--article-code-text)]">
            {children}
          </code>
        ),
    };
  }, []);

  useEffect(() => {
    if (!articleRef.current) return;

    const headings = articleRef.current.querySelectorAll("h1, h2, h3");
    const tocData: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: Number(heading.tagName.charAt(1)),
    }));

    setToc(tocData);
    if (tocData.length > 0) {
      setActiveId(tocData[0].id);
    }
  }, []);

  useEffect(() => {
    if (!articleRef.current) return;

    const headings = articleRef.current.querySelectorAll("h1, h2, h3");
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );

        if (visibleHeadings.length > 0) {
          setActiveId((visibleHeadings[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="mx-auto flex max-w-[1200px] gap-8 px-6 py-10">
      <main className="min-w-0 flex-1">
        <header className="mb-8 border-b border-[var(--border-normal)] pb-6">
          <h1 className="mb-3 text-3xl font-bold text-[var(--text-title)]">
            React 性能优化
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-sub)]">
            <span>2026-04-23</span>
            <span>React</span>
            <span>性能优化</span>
          </div>
        </header>

        <article ref={articleRef} className="max-w-[780px] prose !max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {demoMarkdown}
          </ReactMarkdown>
        </article>
      </main>

      <div className="hidden xl:block">
        <ArticleToc
          toc={toc}
          activeId={activeId}
          onItemClick={handleTocClick}
        />
      </div>
    </div>
  );
}
