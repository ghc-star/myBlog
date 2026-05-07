import { Archive, House, Link2, Search, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "首页", path: "/", icon: House },
  { name: "关于", path: "/about", icon: UserRound },
  { name: "归档", path: "/archive", icon: Archive },
  { name: "搜索", path: "/search", icon: Search },
  { name: "随笔", path: "/essay", icon: Search },
  { name: "友链", path: "/friends", icon: Link2 },
];

function NavMenu({ onItemClick }: { onItemClick?: () => void }) {
  const location = useLocation();

  return (
    <div className="w-full px-0 py-4 sm:w-[220px] sm:px-6 sm:py-8">
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onItemClick}
                className={`flex items-center gap-3 text-sm transition-colors sm:gap-6 sm:text-[16px] transition-all duration-300 ${
                  active
                    ? "font-semibold text-[var(--text-strong)]"
                    : "text-[var(--text-sub)] hover:text-[var(--text-title)]"
                }`}
              >
                <Icon size={20} strokeWidth={1.6} />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavMenu;
