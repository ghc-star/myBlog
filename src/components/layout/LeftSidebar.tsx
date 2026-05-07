import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import AuthorCard from "../sidebar/AuthorCard";
import NavMenu from "../sidebar/NavMenu";
import ThemeToggle from "../sidebar/ThemeToggle";

// LeftSidebar 是左侧栏组件，负责展示作者信息、导航菜单、社交链接和主题切换。
function LeftSidebar() {
  const navMenuRef = useRef<HTMLDivElement | null>(null);
  const themeToggleRef = useRef<HTMLDivElement | null>(null);
  const [hideThemeToggle, setHideThemeToggle] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const minGap = 24;
    let frameId = 0;

    const updateVisibility = () => {
      if (window.innerWidth < 648) {
        setHideThemeToggle(false);
        return;
      }

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
    <aside className="relative w-full shrink-0 border-b border-[var(--border-normal)] p-4 sm:sticky sm:top-0 sm:h-screen sm:w-[200px] sm:overflow-hidden sm:border-b-0">
      <div className="flex items-center justify-between sm:hidden">
        <AuthorCard />
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-lg -translate-y-6"
        >
          <Menu size={24} />
        </button>
      </div>
      <div className="hidden sm:block">
        <AuthorCard />
        <div ref={navMenuRef}>
          <NavMenu />
        </div>
        <div
          ref={themeToggleRef}
          className={`absolute bottom-6 left-4 right-4 transition-opacity duration-200 ${
            hideThemeToggle ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <ThemeToggle />
        </div>
      </div>

      <>
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 sm:hidden ${
            mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`fixed right-0 top-0 z-50 h-full w-64 bg-[var(--card-bg)] p-6 shadow-2xl transition-all duration-300 ease-out sm:hidden ${
            mobileMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg"
            >
              <X size={22} />
            </button>
          </div>

          <NavMenu onItemClick={() => setMobileMenuOpen(false)} />

          <div className="mt-6 -translate-x-5">
            <ThemeToggle />
          </div>
        </div>
      </>
    </aside>
  );
}

export default LeftSidebar;
