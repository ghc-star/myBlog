import ArticleList from "../article/ArticleList";

// ContentArea 是中间内容区域容器，负责包裹文章列表、文章详情等主要内容。
function ContentArea() {
  return (
    <main className="min-w-0 flex-1 bg-transparent p-6">
      <ArticleList></ArticleList>
    </main>
  );
}

export default ContentArea;
