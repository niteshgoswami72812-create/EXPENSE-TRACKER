import { navigation } from "./sidebar";
import { Icon } from "../ui/icon";

export function MobileNav({ activeView, onNavigate }) {
  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-30 grid h-17 grid-cols-4 rounded-2xl border border-slate-200 bg-white/95 px-2 shadow-xl backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      {navigation.slice(0, 4).map((item) => (
        <button
          key={item.id}
          className={`grid place-items-center content-center gap-1 text-[10px] font-medium ${activeView === item.id ? "text-emerald-700" : "text-slate-500"}`}
          onClick={() => onNavigate(item.id)}
        >
          <Icon name={item.icon} size={21} />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
