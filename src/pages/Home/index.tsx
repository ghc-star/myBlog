import MainLayout from "../../components/layout/MainLayout";
import { usePageTitle } from "../../hooks/usePageTitle";
// Home 是首页页面组件，负责使用 MainLayout 并展示文章列表和侧栏模块。

function Home() {
  usePageTitle("首页");
  return <MainLayout></MainLayout>;
}

export default Home;
