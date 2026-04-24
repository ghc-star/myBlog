import { useEffect, useRef, useState } from "react";
import AuthorCard from "../sidebar/AuthorCard";
import NavMenu from "../sidebar/NavMenu";
import ThemeToggle from "../sidebar/ThemeToggle";

// LeftSidebar 是左侧栏组件，负责展示作者信息、导航菜单、社交链接和主题切换。
function LeftSidebar() {
  const navMenuRef = useRef<HTMLDivElement | null>(null);
  const themeToggleRef = useRef<HTMLDivElement | null>(null);
  const [hideThemeToggle, setHideThemeToggle] = useState(false);
  useEffect(() => {
    const minGap = 24;
    let frameId = 0;
    const updateVisibility = () => {
      const navMenuElement = navMenuRef.current;
      const themeToggleElement = themeToggleRef.current;
      if (!navMenuElement || !themeToggleElement) {
        return;
      }
      const navMenuRect = navMenuElement.getBoundingClientRect();
      const themeToggleRect = themeToggleElement.getBoundingClientRect();
      setHideThemeToggle(themeToggleRect.top - navMenuRect.bottom <= minGap);
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateVisibility);
    };
    scheduleUpdate();
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (navMenuRef.current) {
      resizeObserver.observe(navMenuRef.current);
    }
    if (themeToggleRef.current) {
      resizeObserver.observe(themeToggleRef.current);
    }
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <aside className="sticky top-0 relative h-screen w-[200px] shrink-0 overflow-hidden p-4">
      <AuthorCard />
      <div ref={navMenuRef}>
        <NavMenu></NavMenu>
      </div>
      <div
        ref={themeToggleRef}
        className={`absolute bottom-6 left-4 right-4 transition-opacity duration-200 ${
          hideThemeToggle ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <ThemeToggle></ThemeToggle>
      </div>
    </aside>
  );
}

export default LeftSidebar;
