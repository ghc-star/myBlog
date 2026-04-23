import AuthorCard from "../sidebar/AuthorCard";
import NavMenu from "../sidebar/NavMenu";
import ThemeToggle from "../sidebar/ThemeToggle";

// LeftSidebar 是左侧栏组件，负责展示作者信息、导航菜单、社交链接和主题切换。
function LeftSidebar() {
  return (
    <aside className="sticky top-0 h-screen w-[200px] shrink-0 overflow-hidden p-4">
      <AuthorCard />
      <NavMenu></NavMenu>
      <ThemeToggle></ThemeToggle>
    </aside>
  );
}

export default LeftSidebar;
