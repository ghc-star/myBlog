import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

type ArticleMarkdownProps = {
  content: string;
};

function slugify(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-");
}

function normalizeHeadingIds(container: HTMLElement) {
  const used = new Map<string, number>();
  const headings = Array.from(
    container.querySelectorAll<HTMLElement>("h1,h2,h3"),
  );

  headings.forEach((heading) => {
    const text = heading.textContent || "";
    const baseId = slugify(text) || "heading";
    const count = used.get(baseId) || 0;
    const nextCount = count + 1;

    used.set(baseId, nextCount);
    heading.id = nextCount === 1 ? baseId : `${baseId}-${nextCount}`;
  });

  return headings;
}

export default function Demo({ content }: ArticleMarkdownProps) {
  const articleRef = useRef<HTMLDivElement | null>(null);
  const tocRef = useRef<HTMLElement | null>(null);
  const isClickingTocRef = useRef(false);

  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!articleRef.current) return;

    const headings = normalizeHeadingIds(articleRef.current);
    const list: TocItem[] = headings.map((item) => ({
      id: item.id,
      text: item.textContent || "",
      level: Number(item.tagName[1]),
    }));

    setToc(list);
    if (list.length > 0) {
      setActiveId(list[0].id);
    }
  }, [content]);

  useEffect(() => {
    const updateActiveHeading = () => {
      if (isClickingTocRef.current) return;
      if (!articleRef.current) return;

      const headings = Array.from(
        articleRef.current.querySelectorAll<HTMLElement>("h1,h2,h3"),
      );
      if (!headings.length) return;

      const offset = 120;
      const current = [...headings]
        .reverse()
        .find((heading) => heading.getBoundingClientRect().top <= offset);

      const nextId = current?.id ?? headings[0].id;
      setActiveId((prev) => (prev === nextId ? prev : nextId));
    };

    updateActiveHeading();
    window.addEventListener("scroll", updateActiveHeading);
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [content]);

  useEffect(() => {
    if (!activeId || !tocRef.current) return;

    const container = tocRef.current;
    const activeItem = container.querySelector<HTMLElement>(
      `[data-toc-id="${CSS.escape(activeId)}"]`,
    );
    if (!activeItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const bottomGap = 120;
    const topGap = 80;
    const itemBottomToContainerBottom = containerRect.bottom - itemRect.bottom;
    const itemTopToContainerTop = itemRect.top - containerRect.top;

    if (itemBottomToContainerBottom < bottomGap) {
      container.scrollTo({
        top: container.scrollTop + bottomGap - itemBottomToContainerBottom,
        behavior: "smooth",
      });
    }

    if (itemTopToContainerTop < topGap) {
      container.scrollTo({
        top: container.scrollTop - (topGap - itemTopToContainerTop),
        behavior: "smooth",
      });
    }
  }, [activeId]);

  const handleClick = (id: string) => {
    isClickingTocRef.current = true;
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => {
      isClickingTocRef.current = false;
    }, 700);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        maxWidth: 1200,
        margin: "0 auto",
        padding: 24,
        paddingRight: 284,
        gap: 40,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          ref={articleRef}
          className="max-w-[820px] text-[var(--text-strong)]"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => {
                const text = String(children);
                const id = slugify(text);
                return (
                  <h1
                    id={id}
                    className="mb-6 mt-2 scroll-mt-24 text-3xl font-bold leading-tight text-[var(--text-title)]"
                  >
                    {children}
                  </h1>
                );
              },
              h2: ({ children }) => {
                const text = String(children);
                const id = slugify(text);
                return (
                  <h2
                    id={id}
                    className="mb-4 mt-8 scroll-mt-24 border-b border-[var(--border-normal)] pb-2 text-2xl font-semibold leading-tight text-[var(--text-title)]"
                  >
                    {children}
                  </h2>
                );
              },
              h3: ({ children }) => {
                const text = String(children);
                const id = slugify(text);
                return (
                  <h3
                    id={id}
                    className="mb-3 mt-6 scroll-mt-24 text-xl font-semibold leading-snug text-[var(--text-title)]"
                  >
                    {children}
                  </h3>
                );
              },
              p: ({ children }) => (
                <p className="mb-4 leading-8 text-[var(--text-strong)]">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-4 list-disc space-y-2 pl-6 text-[var(--text-strong)]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-4 list-decimal space-y-2 pl-6 text-[var(--text-strong)]">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-7">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="mb-4 border-l-4 border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-4 py-3 text-[var(--text-strong)]">
                  {children}
                </blockquote>
              ),
              hr: () => (
                <hr className="my-8 border-t border-[var(--border-normal)]" />
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-[var(--text-title)]">
                  {children}
                </strong>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      <aside
        ref={tocRef}
        style={{
          width: 220,
          height: "auto",
          borderLeft: "1px solid var(--border-normal)",
          paddingLeft: 16,
          position: "fixed",
          top: 24,
          right: 24,
          bottom: 24,
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 16,
            color: "var(--text-title)",
          }}
        >
          目录
        </h3>
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              data-toc-id={item.id}
              onClick={() => handleClick(item.id)}
              className={`block cursor-pointer text-left text-sm transition-colors ${
                isActive
                  ? "font-semibold text-[var(--theme-accent)]"
                  : "text-[var(--text-sub)] hover:text-[var(--theme-accent)]"
              }`}
              style={{
                marginBottom: 10,
                paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 12 : 24,
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.text}
            </div>
          );
        })}
      </aside>
    </div>
  );
}
