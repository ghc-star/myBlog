import { ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";
// ThemeToggle 是主题切换组件，负责明亮模式和暗黑模式切换。

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const currentTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  };
  return (
    <button
      type="button"
      className="flex items-center justify-between px-5"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <ToggleRight size={25} strokeWidth={1.5} color="var(--button-theme)" />
      ) : (
        <ToggleLeft size={25} strokeWidth={1.5} color="var(--button-theme)" />
      )}
      <span className="select-none mx-2 text-gray-500">切换主题</span>
    </button>
  );
}

export default ThemeToggle;
