import { useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticles";
import ArticleDetail from "../ArticleDetail";

function ArticleDetailPage() {
  const { slug } = useParams();
  const article = useArticle(slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--border-card)] bg-[var(--card-bg)] p-8 text-[var(--text-strong)] shadow-[var(--shadow-card)]">
        文章不存在
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <section className="rounded-3xl border border-[var(--border-card)] bg-[var(--card-bg)] p-8 shadow-[var(--shadow-card)]">
        <div
          className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: article.category.color,
            color: "var(--text-inverse)",
          }}
        >
          {article.category.name}
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-[var(--text-title)]">
          {article.title}
        </h1>

        <p className="mb-6 text-sm leading-7 text-[var(--text-sub)]">
          {article.summary}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-[var(--text-sub)]">
          <span>作者：{article.author}</span>
          <span>发布时间：{article.publishedAt}</span>
          <span>更新于：{article.updatedAt}</span>
          <span>浏览：{article.visits}</span>
          <span>评论：{article.comments}</span>
        </div>
      </section>

      <ArticleDetail content={article.content} />
    </div>
  );
}

export default ArticleDetailPage;
