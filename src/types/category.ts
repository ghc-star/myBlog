// category.ts 定义分类相关类型，例如分类名、数量和 slug。
export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
  color: string;
}
