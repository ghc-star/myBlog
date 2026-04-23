export const demoMarkdown = `
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
- Node.js 没有 `window`、`document`
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
- 了解 `node` 命令的作用

#### 常用命令
```bash
node -v
npm -v
```

#### 你要搞懂
- 装 Node 时 npm 一般也会一起装
- `node xxx.js` 是执行一个 JS 文件
- npm 是包管理工具

#### 学完标准
- [ ] 能独立安装 Node
- [ ] 能在终端执行一个 JS 文件
- [ ] 知道 Node 和 npm 分别是干什么的

#### 建议练习
- 新建 `app.js`
- 写一句：

```js
console.log("hello node")
```

- 运行：

```bash
node app.js
```

---

## 四、第三阶段：Node 运行时基础

### 3. 全局对象与运行环境

#### 要学的内容
- `global`
- `process`
- `__dirname`
- `__filename`

#### 重点掌握
- `global`：Node 全局对象
- `process`：当前 Node 进程信息
- `process.argv`
- `process.env`
- `process.cwd()`
- `__dirname`：当前文件所在目录
- `__filename`：当前文件完整路径

#### 你要搞懂
- 为什么 Node 里没有 `window`
- 为什么项目里经常用 `process.env`
- `__dirname` 和相对路径的关系

#### 学完标准
- [ ] 能解释 `process` 是什么
- [ ] 能拿到命令行参数
- [ ] 会打印当前目录和当前文件路径

#### 建议练习
```js
console.log(global)
console.log(process.argv)
console.log(process.cwd())
console.log(__dirname)
console.log(__filename)
```

---

## 五、第四阶段：模块系统

### 4. CommonJS 模块化

#### 要学的内容
- 为什么要模块化
- `require`
- `module.exports`
- `exports`

#### 重点掌握
- 导出一个函数
- 导出一个对象
- 导入别的文件
- `exports` 和 `module.exports` 的区别

#### 你要搞懂
- Node 项目为什么不能全写在一个文件里
- `require("./xx")` 到底在干什么
- 为什么 `exports = {}` 往往不生效

#### 学完标准
- [ ] 能把一个工具函数拆到单独文件
- [ ] 会导入并调用
- [ ] 能说清 CommonJS 的基本机制

#### 建议练习
- 写一个 `math.js`
- 导出 `add`、`sub`
- 在 `app.js` 中引入并使用

示例：

```js
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
```

```js
// app.js
const math = require('./math')

console.log(math.add(1, 2))
console.log(math.sub(5, 3))
```

---

## 六、第五阶段：npm 与 package.json

### 5. 项目管理基础

#### 要学的内容
- `npm init -y`
- `package.json`
- `dependencies` 和 `devDependencies`
- `scripts`
- `node_modules`

#### 常用命令
```bash
npm init -y
npm i axios
npm i nodemon -D
npm run start
```

#### 你要搞懂
- `package.json` 是项目说明书
- 为什么会有 `node_modules`
- `dependencies` 和 `devDependencies` 的区别
- `scripts` 为什么能简化命令

#### 学完标准
- [ ] 能自己初始化一个 Node 项目
- [ ] 会安装和引用第三方包
- [ ] 会写 `start`、`dev` 脚本

#### 建议练习
- 初始化一个项目
- 安装 `dayjs`
- 写一个 `start` 脚本
- 用 `npm run start` 运行

示例：

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```

---

## 七、第六阶段：文件系统 fs

### 6. 文件操作

#### 要学的内容
- `fs.readFile`
- `fs.writeFile`
- `fs.appendFile`
- `fs.unlink`
- `fs.mkdir`
- `fs.readdir`
- 同步和异步 API

#### 你要搞懂
- 为什么服务器端经常要操作文件
- 同步和异步 API 的区别
- 为什么异步更适合 Node 服务端

#### 学完标准
- [ ] 会完成基本文件读写删查
- [ ] 知道什么时候用同步，什么时候用异步
- [ ] 能处理错误回调

#### 建议练习
- 读取一个 txt 文件
- 把内容写入另一个文件
- 追加一行文本
- 删除文件
- 遍历某个目录下的文件名

示例：

```js
const fs = require('fs')

fs.readFile('./test.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log('读取失败', err)
    return
  }
  console.log(data)
})
```

---

## 八、第七阶段：路径 path

### 7. 路径处理

#### 要学的内容
- `path.join`
- `path.resolve`
- `path.basename`
- `path.extname`
- `path.dirname`

#### 你要搞懂
- 为什么不能乱写相对路径
- 为什么通常要配合 `__dirname`
- `join` 和 `resolve` 的区别

#### 学完标准
- [ ] 会安全拼接路径
- [ ] 知道如何拿到文件名和后缀名
- [ ] 不再乱用 `./xxx`

#### 建议练习
- 拼接一个绝对路径
- 获取某个文件扩展名
- 获取文件名
- 用 `fs + path` 读取指定文件

示例：

```js
const path = require('path')

console.log(path.join(__dirname, 'a', 'b', 'c.txt'))
console.log(path.extname('index.html'))
console.log(path.basename('/a/b/c.txt'))
```

---

## 九、第八阶段：异步编程基础

### 8. 回调、Promise、async/await

#### 要学的内容
- 回调函数
- 错误优先回调
- Promise
- `async/await`
- `fs/promises`

#### 你要搞懂
- Node 早期为什么大量使用回调
- 什么叫错误优先回调
- Promise 如何让异步代码更清晰
- `await` 为什么更适合写业务逻辑

#### 学完标准
- [ ] 能把回调写法改成 Promise
- [ ] 会用 `async/await` 读文件
- [ ] 能说清同步和异步执行顺序

#### 建议练习
- 用回调读取文件
- 用 Promise 读取文件
- 用 `async/await` 读取文件
- 串行读取多个文件

示例：

```js
const fs = require('fs/promises')

async function readFileDemo() {
  try {
    const data = await fs.readFile('./test.txt', 'utf-8')
    console.log(data)
  } catch (err) {
    console.log('读取失败', err)
  }
}

readFileDemo()
```

---

## 十、第九阶段：事件循环

### 9. 任务调度机制

#### 要学的内容
- 同步任务
- 异步任务
- 宏任务、微任务
- `setTimeout`
- `setImmediate`
- `process.nextTick`
- Promise 微任务

#### 你要搞懂
- 为什么 `then` 不是同步执行
- `process.nextTick` 为什么优先级高
- Node 里的事件循环和浏览器为什么不完全一样

#### 学完标准
- [ ] 能分析常见输出顺序题
- [ ] 知道 Node 中几个典型异步 API 的执行顺序
- [ ] 理解“异步不等于多线程”

#### 建议练习
- 自己写输出顺序题并分析
- 对比：
  - `setTimeout`
  - `setImmediate`
  - `Promise.then`
  - `process.nextTick`

示例：

```js
console.log('1')

setTimeout(() => {
  console.log('2')
}, 0)

Promise.resolve().then(() => {
  console.log('3')
})

process.nextTick(() => {
  console.log('4')
})

console.log('5')
```

---

## 十一、第十阶段：事件机制 EventEmitter

### 10. events 模块

#### 要学的内容
- `EventEmitter`
- `on`
- `emit`
- `once`
- `off/removeListener`

#### 你要搞懂
- 什么是事件驱动
- 为什么 Node 很多东西基于事件
- `on` 和 `once` 的区别

#### 学完标准
- [ ] 能自己写一个事件监听和触发例子
- [ ] 能说明 EventEmitter 的使用场景

#### 建议练习
- 创建一个自定义事件总线
- 监听登录、支付、退出事件
- 尝试 `once`

示例：

```js
const EventEmitter = require('events')

const bus = new EventEmitter()

bus.on('login', (name) => {
  console.log(name + ' 登录了')
})

bus.emit('login', 'guo')
```

---

## 十二、第十一阶段：Buffer

### 11. 二进制基础

#### 要学的内容
- 什么是 Buffer
- 字符串和 Buffer 的转换
- 常见编码
- Buffer 的基本操作

#### 你要搞懂
- 为什么 Node 需要 Buffer
- Buffer 和普通字符串的区别
- 文件传输、网络传输为什么离不开 Buffer

#### 学完标准
- [ ] 知道 Buffer 的用途
- [ ] 会基本创建和转换 Buffer
- [ ] 能说清 Node 处理二进制的基础是什么

#### 建议练习
```js
const buf = Buffer.from('hello')
console.log(buf)
console.log(buf.toString())
```

---

## 十三、第十二阶段：HTTP 服务基础

### 12. http 模块

#### 要学的内容
- `http.createServer`
- `server.listen`
- `req`
- `res`
- 请求与响应的基本流程

#### 你要搞懂
- 浏览器访问一个地址时，Node 服务干了什么
- `req` 是请求对象
- `res` 是响应对象
- 监听端口是什么意思

#### 学完标准
- [ ] 能自己写一个最小 Node 服务
- [ ] 能通过浏览器访问并看到返回结果
- [ ] 知道服务器如何接收请求和返回响应

#### 建议练习
- 写一个 `localhost:3000`
- 返回字符串
- 返回 JSON

示例：

```js
const http = require('http')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('你好，Node.js')
})

server.listen(3000, () => {
  console.log('服务器启动：http://localhost:3000')
})
```

---

## 十四、第十三阶段：请求处理

### 13. GET / POST / 路由判断

#### 要学的内容
- `req.url`
- `req.method`
- 简单路由判断
- 接收 POST 请求数据
- `req.on('data')`
- `req.on('end')`

#### 你要搞懂
- GET 和 POST 的区别
- 为什么 POST 数据不是一下子拿到
- 为什么要监听 `data` 和 `end`

#### 学完标准
- [ ] 能根据不同路径返回不同内容
- [ ] 能接收简单 POST 数据
- [ ] 知道请求体是流式传输

#### 建议练习
- `/` 返回首页
- `/user` 返回用户 JSON
- `/login` 接收 POST 数据并打印

示例：

```js
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/login' && req.method === 'POST') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => {
      console.log('收到数据:', body)
      res.end('登录成功')
    })

    return
  }

  res.end('hello')
})

server.listen(3000)
```

---

## 十五、第十四阶段：JSON 与前后端交互

### 14. JSON 数据处理

#### 要学的内容
- `JSON.stringify`
- `JSON.parse`
- 设置响应头
- 返回 JSON 格式接口

#### 你要搞懂
- 为什么后端接口常返回 JSON
- 为什么要设置 `Content-Type`
- 字符串和对象怎么转换

#### 学完标准
- [ ] 能返回一个标准 JSON 接口
- [ ] 知道前后端传输对象本质上是字符串

#### 建议练习
- 返回商品列表 JSON
- 接收 JSON 字符串并解析

示例：

```js
res.setHeader('Content-Type', 'application/json; charset=utf-8')
res.end(JSON.stringify({ name: 'guo', age: 20 }))
```

---

## 十六、第十五阶段：流 Stream

### 15. 流的概念与基本使用

#### 要学的内容
- 什么是流
- 可读流
- 可写流
- `createReadStream`
- `createWriteStream`
- `pipe`

#### 你要搞懂
- 为什么大文件不能一次性全读进内存
- 为什么流是“一边读一边处理”
- `pipe` 有什么好处

#### 学完标准
- [ ] 能用流复制一个文件
- [ ] 知道流和普通读写文件的区别
- [ ] 理解流在上传下载里的作用

#### 建议练习
- 用 `readStream.pipe(writeStream)` 复制文件
- 对比 `readFile` 和 stream 的使用场景

示例：

```js
const fs = require('fs')

const readStream = fs.createReadStream('./a.txt')
const writeStream = fs.createWriteStream('./b.txt')

readStream.pipe(writeStream)
```

---

## 十七、第十六阶段：项目结构拆分

### 16. 项目分层

#### 要学的内容
- 入口文件
- 路由层
- 控制器层
- 业务层
- 工具层
- 配置层

#### 你要搞懂
- 为什么不能把所有逻辑都写在 `app.js`
- 路由和业务逻辑为什么要分开
- 项目分层的意义是什么

#### 学完标准
- [ ] 会拆出 routes / controllers / services / utils
- [ ] 能让项目结构更清晰

#### 建议练习
- 写一个简单用户接口项目
- 路由、控制器、工具函数分文件管理

---

## 十八、第十七阶段：Express 框架

### 17. Express 基础

#### 要学的内容
- Express 是什么
- 路由
- 中间件
- 静态资源
- 处理 JSON
- 错误处理中间件

#### 你要搞懂
- Express 本质上是对原生 http 的封装
- 中间件机制是什么
- `next()` 的作用

#### 学完标准
- [ ] 能用 Express 写接口
- [ ] 能写 GET / POST 路由
- [ ] 会写基础中间件

#### 建议练习
- 用 Express 重写原生 http 小服务
- 写一个登录接口
- 写一个日志中间件

---

## 十九、第十八阶段：数据库基础

### 18. 数据持久化

#### 要学的内容
- 数据库基本概念
- MySQL 或 MongoDB 先学一个
- 增删改查
- Node 连接数据库
- ORM / 查询库 的基本概念

#### 你要搞懂
- 为什么后端离不开数据库
- 接口数据为什么要存储
- 表、字段、主键、索引这些基本概念

#### 学完标准
- [ ] 能连接数据库
- [ ] 能完成一张表的增删改查
- [ ] 能写一个真实接口把数据存进去

#### 建议练习
- 做一个用户表
- 完成注册、查询用户、修改用户、删除用户

---

## 二十、第十九阶段：登录鉴权

### 19. 权限控制

#### 要学的内容
- cookie
- session
- token
- JWT
- 登录流程
- 权限控制

#### 你要搞懂
- 用户登录后，服务端如何识别用户
- session 和 token 的区别
- JWT 适合什么场景

#### 学完标准
- [ ] 能实现一个简单登录接口
- [ ] 能做一个需要登录后才能访问的接口

#### 建议练习
- 登录接口
- 颁发 token
- 校验 token
- 受保护路由

---

## 二十一、第二十阶段：文件上传与下载

### 20. 上传下载

#### 要学的内容
- 表单上传
- `multipart/form-data`
- 常见上传中间件
- 文件存储
- 文件下载响应头

#### 你要搞懂
- 文件上传和普通 JSON 请求为什么不一样
- 服务端接收文件后通常做什么
- 下载为什么要设置响应头

#### 学完标准
- [ ] 能实现单文件上传
- [ ] 能实现下载接口
- [ ] 知道大文件场景为什么更适合流处理

#### 建议练习
- 图片上传
- 文件下载
- 限制文件类型和大小

---

## 二十二、第二十一阶段：环境变量与配置管理

### 21. 配置管理

#### 要学的内容
- 环境变量
- 开发环境 / 生产环境
- `.env`
- 配置文件拆分

#### 你要搞懂
- 为什么数据库地址不能写死
- 为什么不同环境配置要分开
- `process.env` 在项目里的作用

#### 学完标准
- [ ] 会按环境管理配置
- [ ] 知道开发和生产环境的区别

#### 建议练习
- 用环境变量管理端口号
- 用环境变量管理数据库地址

---

## 二十三、第二十二阶段：错误处理与日志

### 22. 稳定性建设

#### 要学的内容
- try/catch
- Promise 错误处理
- 全局错误处理
- 日志记录
- 接口错误码设计

#### 你要搞懂
- 为什么后端必须重视错误处理
- 为什么不能把报错原样直接抛给用户
- 日志对排查问题的价值

#### 学完标准
- [ ] 能统一处理接口错误
- [ ] 会记录关键日志
- [ ] 知道如何返回规范的错误信息

#### 建议练习
- 写统一响应格式
- 写统一错误处理中间件

---

## 二十四、第二十三阶段：性能与部署基础

### 23. 上线前基础

#### 要学的内容
- Node 服务如何启动
- PM2 是什么
- 反向代理
- 跨域处理
- 性能优化基本思路
- 缓存基础

#### 你要搞懂
- 为什么线上不能直接 `node app.js`
- 为什么需要进程管理
- 常见性能瓶颈在哪里

#### 学完标准
- [ ] 知道 Node 项目怎么部署
- [ ] 知道 PM2 的作用
- [ ] 知道一些常见优化方向

---

## 二十五、第二十四阶段：Node 在前端工程化中的作用

### 24. 工程化方向

#### 要学的内容
- Node 为什么能做脚手架
- Vite / Webpack 为什么依赖 Node
- 命令行工具基础
- 读写文件生成模板
- 自动化脚本

#### 你要搞懂
- 前端构建工具为什么离不开 Node
- CLI 工具本质是什么
- 用 Node 写脚本为什么这么常见

#### 学完标准
- [ ] 能写一个小脚本
- [ ] 能写一个简单 CLI
- [ ] 知道前端工程化和 Node 的连接点

#### 建议练习
- 写一个批量重命名文件脚本
- 写一个自动生成组件模板脚本

---

## 二十六、最终执行顺序清单

> 学习时就按这个顺序走，不要乱跳。

### 基础认知
- [ ] Node.js 是什么
- [ ] Node.js 和浏览器 JS 的区别
- [ ] Node.js 的应用场景

### 环境搭建
- [ ] 安装 Node.js
- [ ] 会用 `node -v`、`npm -v`
- [ ] 会运行一个 JS 文件

### 运行时基础
- [ ] global
- [ ] process
- [ ] process.argv
- [ ] process.env
- [ ] __dirname
- [ ] __filename

### 模块系统
- [ ] require
- [ ] module.exports
- [ ] exports
- [ ] CommonJS 模块拆分

### npm 与项目管理
- [ ] npm init
- [ ] package.json
- [ ] scripts
- [ ] 安装第三方包
- [ ] dependencies / devDependencies

### Node 核心模块
- [ ] fs
- [ ] path
- [ ] events
- [ ] http
- [ ] Buffer

### 异步基础
- [ ] 回调函数
- [ ] Promise
- [ ] async/await
- [ ] fs/promises

### 事件循环
- [ ] 同步与异步
- [ ] 宏任务 / 微任务
- [ ] process.nextTick
- [ ] setTimeout
- [ ] setImmediate

### 服务端开发基础
- [ ] 创建 HTTP 服务
- [ ] 处理 GET 请求
- [ ] 处理 POST 请求
- [ ] 路由判断
- [ ] 返回 JSON

### 进阶能力
- [ ] Stream
- [ ] 文件上传下载
- [ ] 项目结构拆分
- [ ] Express
- [ ] 数据库
- [ ] 登录鉴权
- [ ] 环境变量
- [ ] 错误处理
- [ ] 部署基础

---

## 二十七、学习建议

### 1. 不要只背概念
每学完一个知识点，至少写一个小 demo。

### 2. 不要一开始就冲框架
先把原生 Node 的核心概念打透：
- 模块
- 异步
- 文件
- 路径
- HTTP

### 3. 学会“串起来”
比如：
- `http + fs`：读取文件返回给浏览器
- `http + JSON`：写简单接口
- `fs + path`：安全读取项目文件
- `EventEmitter + 异步`：理解 Node 的事件驱动模式

### 4. 先完成“会写”，再追求“会背”
Node 面试题很多，但如果你真能自己搭一个小服务，很多题自然就懂了。

---

## 二十八、一句话总结

**Node.js 不是用来背 API 的，而是用来建立服务端与工程化思维的。真正的入门标准，不是你看了多少，而是你能不能自己写出：文件读写、模块拆分、异步处理、HTTP 服务。**


`;
