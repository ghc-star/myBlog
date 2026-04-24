export interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTocProps {
  toc: TocItem[];
  activeId: string;
  onItemClick: (id: string) => void;
}

export default function ArticleToc({
  toc,
  activeId,
  onItemClick,
}: ArticleTocProps) {
  if (!toc.length) return null;

  return (
    <aside className="w-[260px] shrink-0 border-l border-[var(--border-normal)] pl-4">
      <h3 className="mb-3 text-sm font-semibold text-[var(--text-title)]">
        目录
      </h3>
      <ul className="space-y-2">
        {toc.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li
              key={item.id}
              style={{
                paddingLeft: item.level === 1 ? 0 : item.level === 2 ? 12 : 24,
              }}
            >
              <button
                type="button"
                onClick={() => onItemClick(item.id)}
                className={`text-left text-sm transition ${
                  isActive
                    ? "font-semibold text-[var(--theme-accent)]"
                    : "text-[var(--text-sub)] hover:text-[var(--text-title)]"
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
