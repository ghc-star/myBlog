import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = "哎呦~页面不见了";
    };
  }, [title]);
}
