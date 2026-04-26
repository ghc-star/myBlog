import { useMemo } from "react";
import {
  getAllArchives,
  getAllArticles,
  getAllCategories,
  getArticleBySlug,
} from "../data/articleContent";

export function useArticles() {
  const articles = useMemo(() => getAllArticles(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const archives = useMemo(() => getAllArchives(), []);

  return {
    articles,
    categories,
    archives,
  };
}

export function useArticle(slug?: string) {
  return useMemo(() => getArticleBySlug(slug), [slug]);
}
