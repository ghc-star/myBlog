import ArchivePanel from "../sidebar/ArchivePanel";
import CategoryPanel from "../sidebar/CategoryPanel";
import SearchBox from "../sidebar/SearchBox";

// RightSidebar 是右侧栏组件，负责展示搜索、归档、分类、标签和推荐文章等模块。
function RightSidebar() {
  return (
    <aside className="no-scrollbar fixed top-6 right-6 bottom-6 w-[240px] shrink-0 overflow-y-auto p-4">
      <SearchBox></SearchBox>
      <ArchivePanel></ArchivePanel>
      <CategoryPanel></CategoryPanel>
    </aside>
  );
}

export default RightSidebar;
