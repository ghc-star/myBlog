import ArchivePanel from "../sidebar/ArchivePanel";
import CategoryPanel from "../sidebar/CategoryPanel";
import SearchBox from "../sidebar/SearchBox";

// RightSidebar 是右侧栏组件，负责展示搜索、归档、分类、标签和推荐文章等模块。
function RightSidebar() {
  return (
    <aside className="hidden lg:fixed lg:right-6 lg:top-6 lg:bottom-6 lg:block lg:w-[240px] lg:overflow-y-auto lg:p-4">
      <SearchBox></SearchBox>
      <ArchivePanel></ArchivePanel>
      <CategoryPanel></CategoryPanel>
    </aside>
  );
}

export default RightSidebar;
