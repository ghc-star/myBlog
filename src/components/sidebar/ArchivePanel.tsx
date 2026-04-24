import { Infinity } from "lucide-react";
import { archives } from "../../mock/archives";

function ArchivePanel() {
  return (
    <section className="my-10">
      <div className="mb-4 flex flex-col gap-1 text-[var(--text-sub)]">
        <Infinity size={30} strokeWidth={1.6} />
        <h2 className="text-[21px] font-bold leading-none text-[var(--text-title)]">
          归档
        </h2>
      </div>

      <div className="overflow-hidden rounded-[12px] bg-[var(--card-bg)] shadow-[var(--shadow-card)] ring-1 ring-[var(--ring-soft)]">
        {archives.map((item) => (
          <div
            key={item.year}
            className="flex h-[50px] items-center justify-between border-t border-[var(--border-normal)] px-5 first:border-t-0"
          >
            <span className="text-[18px] tracking-wide text-[var(--text-title)]">
              {item.year}
            </span>
            <span className="text-[18px] font-normal text-[var(--text-sub)]">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ArchivePanel;
