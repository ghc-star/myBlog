export default function About() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[var(--border-card)] bg-[var(--card-bg-overlay)] px-10 py-16 shadow-[var(--shadow-card-hover)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-blob absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div
          className="animate-blob absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 animate-fade-in">
        <p
          className="animate-fade-up text-sm tracking-[0.3em] text-[var(--text-sub)]"
          style={{ animationDelay: "0.1s" }}
        >
          FRONTEND DEVELOPER
        </p>

        <h1
          className="animate-fade-up mt-4 text-5xl font-bold leading-tight text-[var(--text-title)]"
          style={{ animationDelay: "0.25s" }}
        >
          你好，我是你的博客作者
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-2xl text-base leading-8 text-[var(--text-sub)]"
          style={{ animationDelay: "0.4s" }}
        >
          这里记录前端开发、算法刷题、Node.js 学习过程，也会分享一些项目总结和踩坑笔记。
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-wrap gap-4"
          style={{ animationDelay: "0.55s" }}
        >
          <button className="rounded-2xl bg-[var(--text-title)] px-6 py-3 text-sm text-[var(--text-inverse)] transition hover:opacity-90">
            查看文章
          </button>
          <button className="rounded-2xl border border-[var(--border-normal)] bg-[var(--card-bg)] px-6 py-3 text-sm text-[var(--text-strong)] transition hover:bg-[var(--card-bg-soft)]">
            关于我
          </button>
        </div>

        <div
          className="animate-fade-up mt-10 grid max-w-xl grid-cols-3 gap-4"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="rounded-2xl bg-[var(--card-bg-overlay)] p-4 shadow-[var(--shadow-card)]">
            <div className="text-2xl font-bold text-[var(--text-title)]">24</div>
            <div className="mt-1 text-sm text-[var(--text-sub)]">文章</div>
          </div>
          <div className="rounded-2xl bg-[var(--card-bg-overlay)] p-4 shadow-[var(--shadow-card)]">
            <div className="text-2xl font-bold text-[var(--text-title)]">8</div>
            <div className="mt-1 text-sm text-[var(--text-sub)]">分类</div>
          </div>
          <div className="rounded-2xl bg-[var(--card-bg-overlay)] p-4 shadow-[var(--shadow-card)]">
            <div className="text-2xl font-bold text-[var(--text-title)]">3</div>
            <div className="mt-1 text-sm text-[var(--text-sub)]">项目</div>
          </div>
        </div>

        <div
          className="animate-fade-up mt-12 flex items-center gap-2 text-sm text-[var(--text-sub)]"
          style={{ animationDelay: "0.85s" }}
        >
          <span className="animate-scroll-tip inline-block">→</span>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
