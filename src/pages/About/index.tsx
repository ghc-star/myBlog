// About 是关于页组件，负责展示个人介绍、技术栈、博客说明和联系方式。
export default function About() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 px-10 py-16 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      {/* 背景光斑 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div
          className="animate-blob absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* 内容层 */}
      <div className="relative z-10 animate-fade-in">
        <p
          className="animate-fade-up text-sm tracking-[0.3em] text-gray-500"
          style={{ animationDelay: "0.1s" }}
        >
          FRONTEND DEVELOPER
        </p>

        <h1
          className="animate-fade-up mt-4 text-5xl font-bold leading-tight text-gray-900"
          style={{ animationDelay: "0.25s" }}
        >
          你好，我是你的博客作者
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-base leading-8 text-gray-600"
          style={{ animationDelay: "0.4s" }}
        >
          这里记录前端开发、算法刷题、Node.js
          学习过程，也会分享一些项目总结和踩坑笔记。
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-wrap gap-4"
          style={{ animationDelay: "0.55s" }}
        >
          <button className="rounded-2xl bg-gray-900 px-6 py-3 text-sm text-white transition hover:opacity-90">
            查看文章
          </button>
          <button className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50">
            关于我
          </button>
        </div>

        <div
          className="animate-fade-up mt-10 grid max-w-xl grid-cols-3 gap-4"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="mt-1 text-sm text-gray-500">文章</div>
          </div>
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="mt-1 text-sm text-gray-500">分类</div>
          </div>
          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="mt-1 text-sm text-gray-500">项目</div>
          </div>
        </div>

        <div
          className="animate-fade-up mt-12 flex items-center gap-2 text-sm text-gray-500"
          style={{ animationDelay: "0.85s" }}
        >
          <span className="animate-scroll-tip inline-block">↓</span>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
