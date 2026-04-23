// categories.ts 存放分类假数据，供分类面板和分类页开发阶段使用。
import type { Category } from "../types/category";

export const categories: Category[] = [
  {
    id: 1,
    name: "web开发",
    slug: "web-development",
    count: 3,
    description: "前端工程化、React、TypeScript 和浏览器基础。",
    color: "#0ea5e9",
  },
  {
    id: 2,
    name: "校园OJ开发",
    slug: "campus-oj",
    count: 2,
    description: "在线评测系统的题库、判题服务和后台管理实践。",
    color: "#22c55e",
  },
  {
    id: 3,
    name: "Git 新手通关指南",
    slug: "git-beginner-guide",
    count: 3,
    description: "从克隆仓库到协作开发的 Git 入门路线。",
    color: "#0284c7",
  },
  {
    id: 4,
    name: "学习路线",
    slug: "learning-path",
    count: 3,
    description: "面向新手的阶段规划、刷题节奏和项目练习建议。",
    color: "#8b5cf6",
  },
  {
    id: 5,
    name: "算法",
    slug: "algorithm",
    count: 4,
    description: "数据结构、经典算法、LeetCode 高频题与解题模板。",
    color: "#e11d48",
  },
  {
    id: 6,
    name: "开发问题精讲",
    slug: "dev-troubleshooting",
    count: 2,
    description: "开发过程中常见报错、环境问题和排查思路。",
    color: "#f59e0b",
  },
];
