import RightSidebar from "./RightSidebar";
import ContentArea from "./ContentArea";

// MainLayout 是博客页面的整体外壳，负责组合左侧栏、中间内容区和右侧栏。
function MainLayout() {
  return (
    <div className="flex min-h-screen pr-[264px] bg-transparent text-slate-900">
      <ContentArea />
      <RightSidebar />
    </div>
  );
}

export default MainLayout;
