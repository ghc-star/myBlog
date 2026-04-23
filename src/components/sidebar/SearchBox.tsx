import { useState } from "react";
import { Search } from "lucide-react";

// SearchBox 是搜索框组件，负责输入关键字并触发搜索或跳转搜索结果页。
function SearchBox() {
  const [keyword, setKeyword] = useState("");

  return (
    <form className="rounded-[8px] bg-white px-2 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-1 ring-black/5">
      <label className="flex items-center justify-between gap-4">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[16px] leading-none text-gray-500">搜索</span>
          <input
            className="mt-2 w-full border-0 bg-transparent p-0 text-[18px] leading-none text-gray-700 outline-none placeholder:text-gray-500"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="输入关键词..."
          />
        </span>
        <button
          type="submit"
          aria-label="搜索"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-500 transition hover:text-gray-800"
        >
          <Search size={31} strokeWidth={1.6} />
        </button>
      </label>
    </form>
  );
}

export default SearchBox;
