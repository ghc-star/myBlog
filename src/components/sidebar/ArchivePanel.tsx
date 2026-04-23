import { archives } from "../../mock/archives";
import { Infinity } from "lucide-react";
// ArchivePanel 是归档面板组件，负责按年份展示文章数量并跳转归档页。

function ArchivePanel() {
  return (
    <section className="my-10">
      <div className="mb-4 flex flex-col gap-1 text-gray-600">
        <Infinity size={30} strokeWidth={1.6} />
        <h2 className="text-[21px] font-bold leading-none">归档</h2>
      </div>

      <div className="overflow-hidden rounded-[12px] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
        {archives.map((item) => (
          <div
            key={item.year}
            className="flex h-[50px] items-center justify-between border-t border-gray-300 px-5 first:border-t-0"
          >
            <span className="text-[18px]  tracking-wide text-black">
              {item.year}
            </span>
            <span className="text-[18px] font-normal text-gray-500">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArchivePanel;
