import { lazy, type ReactNode } from "react";

const Hero = lazy(() => import("../components/layout/Hero"));
const Home = lazy(() => import("../pages/Home"));
const Archive = lazy(() => import("../pages/Archive"));
const Category = lazy(() => import("../pages/Category"));
const Search = lazy(() => import("../pages/Search"));
const ArticleDetail = lazy(() => import("../pages/ArticleDetail"));
const About = lazy(() => import("../pages/About"));
const Echarts = lazy(() => import("../echarts"));
const EchartsDouble = lazy(() => import("../echarts/doubey"));
const Essays = lazy(() => import("../components/essays"));
const Friends = lazy(() => import("../pages/Friend"));

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="min-w-0 flex-1 bg-transparent p-4 sm:p-6">{children}</main>
  );
}

export function HomeRoute() {
  return (
    <PageLayout>
      <Home />
    </PageLayout>
  );
}

export function MeRoute() {
  return (
    <PageLayout>
      <About />
    </PageLayout>
  );
}

export function ArchiveRoute() {
  return (
    <PageLayout>
      <Archive />
    </PageLayout>
  );
}

export function AboutRoute() {
  return (
    <PageLayout>
      <Hero />
    </PageLayout>
  );
}

export function CategoryRoute() {
  return (
    <PageLayout>
      <Category />
    </PageLayout>
  );
}

export function SearchRoute() {
  return (
    <PageLayout>
      <Search />
    </PageLayout>
  );
}

export function EssaysRoute() {
  return (
    <PageLayout>
      <Essays />
    </PageLayout>
  );
}

export function ArticleRoute() {
  return (
    <PageLayout>
      <ArticleDetail />
    </PageLayout>
  );
}

export function EchartsRoute() {
  return (
    <PageLayout>
      <Echarts />
    </PageLayout>
  );
}

export function EchartsDoubleRoute() {
  return (
    <PageLayout>
      <EchartsDouble />
    </PageLayout>
  );
}

export function FriendRoute() {
  return (
    <PageLayout>
      <Friends></Friends>
    </PageLayout>
  );
}
