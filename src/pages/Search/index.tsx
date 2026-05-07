import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import ArticleCard from "../../components/article/ArticleCard";
import SearchBox from "../../components/sidebar/SearchBox";
import { usePageTitle } from "../../hooks/usePageTitle";

// Search 是搜索结果页组件，负责根据关键字展示过滤后的文章列表。
export default function Search() {
  usePageTitle("搜索");
  const [searchParams] = useSearchParams();
  console.log(searchParams);

  const keyword = searchParams.get("q") ?? "";
  console.log(keyword);

  const results = useSearch(keyword);
  return (
    <section className="mx-auto w-full max-w-[900px] px-4 py-10">
      <SearchBox></SearchBox>

      {keyword ? (
        <p className="mb-6 text-[var(--text-sub)]">
          关键词“{keyword}”，共 {results.length} 条结果
        </p>
      ) : (
        <></>
      )}

      <div className="grid gap-4">
        {results.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
