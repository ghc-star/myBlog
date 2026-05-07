import { useEffect } from "react";

export function usePageTitleVisibility() {
  useEffect(() => {
    const originTitle = document.title;
    let timer: number | undefined;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "页面偷偷休息中...";
      } else {
        document.title = "欢迎回来！";

        timer = window.setTimeout(() => {
          document.title = originTitle;
        }, 1500);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
}
