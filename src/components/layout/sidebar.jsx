import { Icon } from "../ui/icon";
export const navigation = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "transactions", label: "Transactions", icon: "card" },
  { id: "budgets", label: "Budgets", icon: "budget" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "settings", label: "Settings", icon: "settings" },
];
export function Sidebar({
  activeView,
  name,
  open,
  onClose,
  onNavigate,
  onLogout,
}) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-62 flex-col border-r border-slate-200 bg-white/95 px-5 py-7 backdrop-blur transition-transform lg:translate-x-0 ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
      >
        <button
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg bg-slate-100 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <Icon name="close" />
        </button>

        <button
          className="mb-7 flex items-center gap-3 px-2 text-2xl font-bold tracking-tight"
          onClick={() => onNavigate("dashboard")}
        >
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-2xl font-bold italic text-white shadow-lg shadow-emerald-200">
            P
          </span>
          PaisaFlow
        </button>

        <nav className="grid gap-2" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 text-left font-medium transition ${activeView === item.id ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon name={item.icon} size={22} />
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="mt-auto mb-3 flex items-center gap-4 rounded-xl px-4 py-3 text-left font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          onClick={onLogout}
        >
          <Icon name="logout" size={21} />
          Log out
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-800">
            {name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <strong className="block truncate text-sm">{name}</strong>
            <span className="text-xs text-slate-500">Personal account</span>
          </div>
        </div>
      </aside>

      {open && (
        <button
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        />
      )}
    </>
  );
}
