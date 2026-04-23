import { categories } from "../../mock/categories";
import { Hash } from "lucide-react";
// CategoryPanel 是分类面板组件，负责展示分类列表、文章数量和分类跳转。

function CategoryPanel() {
  return (
    <section className="my-10">
      <div className="mb-4 flex flex-col gap-1 text-gray-600">
        <Hash size={30} strokeWidth={1.6} />
        <h2 className="text-[21px] font-bold leading-none">分类</h2>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-4">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            className=" rounded-[6px] bg-white px-2 py-2 text-center text-[15px] leading-7 text-black shadow-[0_6px_18px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:text-gray-700 hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
}
export default CategoryPanel;
