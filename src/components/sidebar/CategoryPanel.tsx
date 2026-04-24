import { Hash } from "lucide-react";
import { categories } from "../../mock/categories";

function CategoryPanel() {
  return (
    <section className="my-10">
      <div className="mb-4 flex flex-col gap-1 text-[var(--text-sub)]">
        <Hash size={30} strokeWidth={1.6} />
        <h2 className="text-[21px] font-bold leading-none text-[var(--text-title)]">
          分类
        </h2>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-4">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            className="rounded-[6px] bg-[var(--card-bg)] px-2 py-2 text-center text-[15px] leading-7 text-[var(--text-title)] shadow-[var(--shadow-card)] ring-1 ring-[var(--ring-soft)] transition hover:-translate-y-0.5 hover:text-[var(--text-strong)] hover:[box-shadow:var(--shadow-card-hover)]"
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryPanel;
