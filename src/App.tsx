import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/layout/LeftSidebar";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore";
import { usePageTitleVisibility } from "./hooks/usePageTitleVisibility";

function App() {
  usePageTitleVisibility();
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="app-content flex min-h-screen flex-col text-[var(--text-main)] sm:flex-row">
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default App;
