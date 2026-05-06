import essayImage from "@/assets/images/essay.png";

function Essays() {
  return (
    <>
      <header
        className={[
          "relative h-[35vh] w-[100vw]",
          "bg-cover bg-center bg-no-repeat",
        ].join(" ")}
        style={{ backgroundImage: `url(${essayImage})` }}
      >
        {/* 顶部遮罩 */}
        <div className="absolute inset-0 bg-black/20" />
      </header>

      <main
        className={[
          "relative -mt-10 min-h-screen overflow-visible px-15 pb-20",
          "bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px)]",
          "bg-[size:48px_48px]",
        ].join(" ")}
      >
        <div
          className={[
            "absolute -top-15 left-25 z-20 flex h-12 w-12 items-center",
            "rounded-md object-cover",
          ].join(" ")}
        >
          <img
            src={essayImage}
            alt=""
            className="h-12 w-12 rounded-md object-cover"
          />
          <span className="ml-4 text-lg font-semibold">Sara</span>
        </div>
        {/* 内容卡片 */}
        <section
          className={[
            "relative z-10 mx-auto max-w-[1250px] rounded-xl bg-white px-10 py-4",
            "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
          ].join(" ")}
        >
          <article className="border-b border-dashed border-gray-200 pb-10">
            {/* 用户信息 */}
            <div className="flex items-start gap-4">
              <img
                src={essayImage}
                alt=""
                className="h-12 w-12 rounded-md object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-600">Sara</h2>
                  <span className="rounded bg-red-500 px-1.5 py-0.5 text-xs text-white">
                    LV6
                  </span>
                  <span className="rounded border border-green-400 px-2 py-0.5 text-xs text-green-600">
                    太乙玉仙
                  </span>
                </div>

                <p className="mt-4 text-lg text-gray-800">终究还是长大了...</p>

                <img
                  src={essayImage}
                  alt=""
                  className="mt-5 w-[430px] rounded-md object-cover"
                />

                <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                  <span>2026-01-08</span>

                  <div className="flex items-center gap-4 rounded bg-gray-50 px-4 py-2">
                    <span>1</span>
                    <span>💬</span>
                    <span>✎</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </>
  );
}

export default Essays;
