// article.ts 定义文章相关类型，例如 id、标题、分类、标签、时间、浏览量、评论数和摘要。
export type ArticleStatus = "published" | "draft";

export interface ArticleCategoryInfo {
  name: string;
  slug: string;
  color: string;
}

export interface Article {
  id: number;
  slug: string; //url
  title: string;
  summary: string; //摘要
  content: string;
  category: ArticleCategoryInfo;
  tags: string[]; //标签
  publishedAt: string; //发布时间
  updatedAt: string; //更新事件
  author: string; //作者
  cover: string; //
  visits: number;
  comments: number;
  status: ArticleStatus;
  featured: boolean; //是否推荐
}
