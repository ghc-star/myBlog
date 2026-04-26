import type { CSSProperties } from "react";
import type { Article } from "../../types/article";
import { Link } from "react-router-dom";

interface Props {
  article: Article;
}

function toRgba(color: string, alpha: number) {
  const hex = color.trim();
  const shortHexMatch = /^#([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
  if (shortHexMatch) {
    const r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16);
    const g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16);
    const b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const hexMatch = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16);
    const g = parseInt(hexMatch[2], 16);
    const b = parseInt(hexMatch[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return "rgba(15, 23, 42, 0.12)";
}

function ArticleCard({ article }: Props) {
  const cardAccentSoft = toRgba(article.category.color, 0.35);
  const cardShadowColor = toRgba(article.category.color, 0.28);

  return (
    <Link
      key={article.id}
      to={`/articles/${article.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-[var(--border-card)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:[border-color:var(--card-accent)] hover:[box-shadow:0_8px_18px_-12px_var(--card-shadow-color)]"
      style={
        {
          "--card-accent": article.category.color,
          "--card-accent-soft": cardAccentSoft,
          "--card-shadow-color": cardShadowColor,
        } as CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, var(--card-accent-soft), transparent)",
        }}
      />

      <div>
        <span
          style={{
            display: "inline-block",
            backgroundColor: article.category.color,
            color: "var(--text-inverse)",
            borderRadius: "999px",
            marginTop: "2px",
            height: "24px",
            lineHeight: "24px",
            paddingLeft: "10px",
            paddingRight: "10px",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          {article.category.name}
        </span>
      </div>

      <div className="my-3 text-xl font-semibold leading-tight text-[var(--text-title)] transition-colors group-hover:[color:var(--card-accent)]">
        {article.title}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-sub)]">
        <span className="rounded-full bg-[var(--card-bg-soft)] px-2.5 py-1">
          <span className="mr-1 text-[var(--text-faint)]">日期</span>
          <span className="font-medium text-[var(--text-strong)]">
            {article.publishedAt}
          </span>
        </span>

        <span className="rounded-full bg-[var(--card-bg-soft)] px-2.5 py-1">
          <span className="mr-1 text-[var(--text-faint)]">浏览</span>
          <span className="font-medium text-[var(--text-strong)]">
            {article.visits}
          </span>
        </span>

        <span className="rounded-full bg-[var(--card-bg-soft)] px-2.5 py-1">
          <span className="mr-1 text-[var(--text-faint)]">评论</span>
          <span className="font-medium text-[var(--text-strong)]">
            {article.comments}
          </span>
        </span>
      </div>
    </Link>
  );
}

export default ArticleCard;
