import { createBrowserRouter } from "react-router-dom";
// router/index.tsx 负责统一配置首页、文章详情、归档、分类、搜索、关于和 404 路由。

import Home from "../pages/Home";
import Archive from "../pages/Archive";
import Category from "../pages/Category";
import Search from "../pages/Search";
import App from "../App";
import Hero from "../components/layout/Hero";
import ArticleDemo from "../pages/ArticleDetail";
import ArchivePage from "../pages/Archive";
import About from "../pages/About";
import Echarts from "../echarts";
import Echartsdoube from "../echarts/doubey";
import Essays from "../components/essays";

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-w-0 flex-1 bg-transparent p-6">{children}</main>
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PageLayout>
            <Home />
          </PageLayout>
        ),
      },
      {
        path: "me",
        element: (
          <PageLayout>
            <About></About>
          </PageLayout>
        ),
      },
      {
        path: "archive",
        element: (
          <PageLayout>
            <Archive />
          </PageLayout>
        ),
      },
      {
        path: "about",
        element: (
          <PageLayout>
            <Hero></Hero>
          </PageLayout>
        ),
      },
      {
        path: "category/:slug",
        element: (
          <PageLayout>
            <Category />
          </PageLayout>
        ),
      },
      {
        path: "search",
        element: (
          <PageLayout>
            <Search />
          </PageLayout>
        ),
      },
      {
        path: "essay",
        element: (
          <PageLayout>
            <Essays></Essays>
          </PageLayout>
        ),
      },
      {
        path: "/article/:id",
        element: (
          <PageLayout>
            <ArticleDemo></ArticleDemo>
          </PageLayout>
        ),
      },
      {
        path: "/archive",
        element: <ArchivePage />,
      },
      {
        path: "echarts",
        element: (
          <PageLayout>
            <Echarts></Echarts>
          </PageLayout>
        ),
      },
      {
        path: "echartdoube",
        element: (
          <PageLayout>
            <Echartsdoube></Echartsdoube>
          </PageLayout>
        ),
      },
    ],
  },
]);
