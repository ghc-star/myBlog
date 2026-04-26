import { useEffect, useMemo, useState } from "react";
import { useArticles } from "../../hooks/useArticles";
import ArticleCard from "./ArticleCard";

const PAGE_SIZE = 10;

function ArticleList() {
  const { articles } = useArticles();
  const [currentPage, setCurrentPage] = useState(1);
  const total = articles.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return articles.slice(start, end);
  }, [articles, currentPage]);

  if (!articles.length) {
    return (
      <div className="rounded-2xl border border-[var(--border-card)] bg-[var(--card-bg)] p-8 text-center text-[var(--text-sub)] shadow-[var(--shadow-card)]">
        暂时还没有文章
      </div>
    );
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {currentList.map((item) => (
        <ArticleCard key={item.id} article={item} />
      ))}

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="rounded-xl border border-[var(--border-normal)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-strong)] shadow-[var(--shadow-card)] transition hover:[box-shadow:var(--shadow-card-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一页
        </button>

        <span className="text-sm text-[var(--text-sub)]">
          第 {currentPage} / {totalPages} 页
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-[var(--border-normal)] bg-[var(--card-bg)] px-4 py-2 text-sm text-[var(--text-strong)] shadow-[var(--shadow-card)] transition hover:[box-shadow:var(--shadow-card-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一页
        </button>
      </div>
    </div>
  );
}

export default ArticleList;
