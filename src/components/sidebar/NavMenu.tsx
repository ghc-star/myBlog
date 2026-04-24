import { Archive, House, Link2, Search, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "首页", path: "/", icon: House },
  { name: "关于", path: "/about", icon: UserRound },
  { name: "归档", path: "/archive", icon: Archive },
  { name: "搜索", path: "/search", icon: Search },
  { name: "友链", path: "/friends", icon: Link2 },
];

function NavMenu() {
  const location = useLocation();

  return (
    <div className="w-[220px] px-6 py-8">
      <ul className="flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-6 text-[16px] transition-colors ${
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
