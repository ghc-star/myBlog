import { ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";
import grog from "../../assets/grog.png";
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
      style={{ cursor: `url(${grog}),auto` }}
    >
      {theme === "dark" ? (
        <ToggleRight size={25} strokeWidth={1.5} color="var(--button-theme)" />
      ) : (
        <ToggleLeft size={25} strokeWidth={1.5} color="var(--button-theme)" />
      )}
      <span className="mx-2 select-none text-[var(--text-sub)]">切换主题</span>
    </button>
  );
}

export default ThemeToggle;
