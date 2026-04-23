// archives.ts 存放归档假数据，供归档面板和归档页开发阶段使用。
import type { ArchiveYear } from "../types/archive";

export const archives: ArchiveYear[] = [
  {
    year: 2026,
    count: 7,
    months: [
      {
        month: 4,
        count: 2,
        articleIds: [1, 2],
      },
      {
        month: 3,
        count: 2,
        articleIds: [3, 4],
      },
      {
        month: 2,
        count: 1,
        articleIds: [5],
      },
      {
        month: 1,
        count: 2,
        articleIds: [6, 7],
      },
    ],
  },
  {
    year: 2025,
    count: 10,
    months: [
      {
        month: 12,
        count: 1,
        articleIds: [8],
      },
      {
        month: 11,
        count: 1,
        articleIds: [9],
      },
      {
        month: 10,
        count: 1,
        articleIds: [10],
      },
      {
        month: 9,
        count: 1,
        articleIds: [11],
      },
      {
        month: 8,
        count: 1,
        articleIds: [12],
      },
      {
        month: 7,
        count: 1,
        articleIds: [13],
      },
      {
        month: 6,
        count: 1,
        articleIds: [14],
      },
      {
        month: 5,
        count: 1,
        articleIds: [15],
      },
      {
        month: 4,
        count: 1,
        articleIds: [16],
      },
      {
        month: 3,
        count: 1,
        articleIds: [17],
      },
    ],
  },
];
