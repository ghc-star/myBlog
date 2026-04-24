import { Search } from "lucide-react";
import { useState } from "react";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  return (
    <form className="rounded-[8px] bg-[var(--card-bg)] px-2 py-2 shadow-[var(--shadow-card)] ring-1 ring-[var(--ring-soft)]">
      <label className="flex items-center justify-between gap-4">
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[16px] leading-none text-[var(--text-sub)]">
            搜索
          </span>
          <input
            className="mt-2 w-full border-0 bg-transparent p-0 text-[18px] leading-none text-[var(--text-strong)] outline-none placeholder:text-[var(--text-sub)]"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="输入关键词..."
          />
        </span>
        <button
          type="submit"
          aria-label="搜索"
          className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--text-sub)] transition hover:text-[var(--text-title)]"
        >
          <Search size={31} strokeWidth={1.6} />
        </button>
      </label>
    </form>
  );
}

export default SearchBox;
