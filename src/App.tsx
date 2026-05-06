import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/layout/LeftSidebar";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="app-content flex min-h-screen text-[var(--text-main)]">
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default App;
