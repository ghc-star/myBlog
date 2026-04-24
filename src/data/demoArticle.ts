export const demoMarkdown = String.raw`
# Node.js 从 0 到入门学习清单

> 适合前端转 Node.js / 零基础系统入门
>
> 学习方式建议：**每学一块，就配一个小练习**，不要只看不写。

---

## 一、整体学习目标

这份清单按下面这条主线来学：

**Node 是什么 → 模块系统 → fs/path → 异步 → 事件循环 → HTTP 服务 → Express → 数据库/鉴权/上传下载 → 部署与工程化**

学习目标不是死背 API，而是逐步建立这几个能力：

- 知道 Node.js 是什么，和浏览器 JS 有什么区别
- 会使用 Node 运行 JS 文件
- 会使用 CommonJS 模块化拆分代码
- 会操作文件、路径、事件、HTTP 服务
- 理解异步、事件循环、流这些 Node 核心机制
- 能用原生 Node 写简单接口
- 能继续过渡到 Express、数据库、登录鉴权等实战能力

---

## 二、第一阶段：建立整体认知

### 1. Node.js 是什么

#### 要学的内容
- Node.js 的定义
- Node.js 和浏览器的区别
- Node.js 能做什么
- Node.js 为什么适合做服务端和工程化工具

#### 你要搞懂
- Node.js 不是语言，是 **JavaScript 运行时**
- Node.js 不是框架
- Node.js 可以脱离浏览器运行 JS
- Node.js 没有 \`window\`、\`document\`
- Node.js 可以操作文件、网络、系统

#### 学完标准
- [ ] 能自己解释 Node.js 是什么
- [ ] 能解释 Node.js 和浏览器 JS 的区别
- [ ] 能说出 Node.js 的常见应用场景

#### 建议练习
- 自己口述一遍：
  - 什么是 Node.js
  - Node.js 和浏览器 JS 的区别
  - Node.js 常见应用场景

---

## 三、第二阶段：安装与运行环境

### 2. 安装 Node.js

#### 要学的内容
- 安装 Node.js
- 检查版本
- 了解 npm 是什么
- 了解 \`node\` 命令的作用

#### 常用命令
\`\`\`bash
node -v
npm -v
\`\`\`

#### 你要搞懂
- 装 Node 时 npm 一般也会一起装
- \`node xxx.js\` 是执行一个 JS 文件
- npm 是包管理工具

#### 学完标准
- [ ] 能独立安装 Node
- [ ] 能在终端执行一个 JS 文件
- [ ] 知道 Node 和 npm 分别是干什么的

#### 建议练习
- 新建 \`app.js\`
- 写一句：

\`\`\`js
console.log("hello node")
\`\`\`

- 运行：

\`\`\`bash
node app.js
\`\`\`

---

## 四、第三阶段：Node 运行时基础

### 3. 全局对象与运行环境

#### 要学的内容
- \`global\`
- \`process\`
- \`__dirname\`
- \`__filename\`

#### 重点掌握
- \`global\`：Node 全局对象
- \`process\`：当前 Node 进程信息
- \`process.argv\`
- \`process.env\`
- \`process.cwd()\`
- \`__dirname\`：当前文件所在目录
- \`__filename\`：当前文件完整路径

#### 你要搞懂
- 为什么 Node 里没有 \`window\`
- 为什么项目里经常用 \`process.env\`
- \`__dirname\` 和相对路径的关系

#### 学完标准
- [ ] 能解释 \`process\` 是什么
- [ ] 能拿到命令行参数
- [ ] 会打印当前目录和当前文件路径

#### 建议练习
\`\`\`js
console.log(global)
console.log(process.argv)
console.log(process.cwd())
console.log(__dirname)
console.log(__filename)
\`\`\`

---

## 五、第四阶段：模块系统

### 4. CommonJS 模块化

#### 要学的内容
- 为什么要模块化
- \`require\`
- \`module.exports\`
- \`exports\`

#### 重点掌握
- 导出一个函数
- 导出一个对象
- 导入别的文件
- \`exports\` 和 \`module.exports\` 的区别

#### 你要搞懂
- Node 项目为什么不能全写在一个文件里
- \`require("./xx")\` 到底在干什么
- 为什么 \`exports = {}\` 往往不生效

#### 学完标准
- [ ] 能把一个工具函数拆到单独文件
- [ ] 会导入并调用
- [ ] 能说清 CommonJS 的基本机制

#### 建议练习
- 写一个 \`math.js\`
- 导出 \`add\`、\`sub\`
- 在 \`app.js\` 中引入并使用

示例：

\`\`\`js
// math.js
function add(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b
}

module.exports = {
  add,
  sub,
}
\`\`\`

\`\`\`js
// app.js
const math = require('./math')

console.log(math.add(1, 2))
console.log(math.sub(5, 3))
\`\`\`

---

## 六、第...后面的内容也按同样规则保留
`;
