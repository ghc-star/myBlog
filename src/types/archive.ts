// archive.ts 定义归档相关类型，例如年份、月份和对应文章数组。
export interface ArchiveMonth {
  month: number;
  count: number;
  articleIds: number[];
}

export interface ArchiveYear {
  year: number;
  count: number;
  months: ArchiveMonth[];
}
