import type { ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Hero from "../components/layout/Hero";
import Archive from "../pages/Archive";
import ArticleDetailPage from "../pages/ArticleDetailPage";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Search from "../pages/Search";

function PageLayout({ children }: { children: ReactNode }) {
  return <main className="min-w-0 flex-1 bg-transparent p-6">{children}</main>;
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
            <Hero />
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
        path: "articles/:slug",
        element: (
          <PageLayout>
            <ArticleDetailPage />
          </PageLayout>
        ),
      },
    ],
  },
]);
