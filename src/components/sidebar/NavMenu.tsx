import { Link, useLocation } from "react-router-dom";
import { House, UserRound, Archive, Search, Link2 } from "lucide-react";
// NavMenu 是导航菜单组件，负责展示首页、关于、归档、搜索、友链等入口。

const navItems = [
  { name: "主页", path: "/", icon: House },
  { name: "我", path: "/about", icon: UserRound },
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
                    ? "text-slate-700 font-semibold"
                    : "text-gray-500 hover:text-slate-600"
                }`}
              >
                <Icon size={20} strokeWidth={1.6}></Icon>
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
