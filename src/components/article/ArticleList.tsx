import ArticleCard from "./ArticleCard";
import { articles } from "../../mock/articles";
import { useMemo, useState } from "react";
// ArticleList 是文章列表组件，负责接收文章数组并渲染多个 ArticleCard。

const PAGE_SIZE = 10;

function ArticleList() {
  const [currentPage, setCurrentPage] = useState(1);
  const total = articles.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return articles.slice(start, end);
  }, [currentPage]);

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
        <ArticleCard key={item.id} article={item}></ArticleCard>
      ))}

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一页
        </button>
        <span className="text-sm text-gray-500">
          第 {currentPage} / {totalPages} 页
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          下一页
        </button>
      </div>
    </div>
  );
}

export default ArticleList;
