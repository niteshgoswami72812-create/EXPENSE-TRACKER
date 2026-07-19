import { Icon } from "../ui/icon";

const viewDetails = {
  dashboard: ["", "Here’s what’s happening with your money this month."],
  transactions: ["Transactions", "Review, filter and manage your activity."],
  budgets: ["Monthly budgets", "Stay on track with category spending limits."],
  analytics: ["Financial analytics", "Understand your spending and savings."],
  settings: ["Settings", "Personalise your PaisaFlow experience."],
};

export function AppHeader({
  activeView,
  name,
  onOpenMenu,
  onAddTransaction,
  onNotify,
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const [viewTitle, subtitle] = viewDetails[activeView];
  const title = activeView === "dashboard" ? `${greeting}, ${name}` : viewTitle;

  return (
    <header className="sticky top-0 z-20 flex min-h-31 items-center justify-between gap-4 border-b border-slate-200/70 bg-[#f7f8f5]/90 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden"
        onClick={onOpenMenu}
        aria-label="Open navigation"
      >
        <Icon name="menu" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="mb-1 hidden text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700 sm:block">
          PaisaFlow · July 2026
        </p>
        <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        <p className="mt-2 hidden text-sm text-slate-500 sm:block">
          {subtitle}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          className="relative hidden size-11 place-items-center rounded-xl border border-slate-200 bg-white sm:grid"
          onClick={onNotify}
          aria-label="Notifications"
        >
          <Icon name="bell" size={20} />
          <i className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-red-500 ring-1 ring-white" />
        </button>
        <button
          className="flex size-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700 sm:w-auto sm:px-5"
          onClick={onAddTransaction}
        >
          <Icon name="plus" size={19} />
          <span className="hidden sm:inline">Add transaction</span>
        </button>
      </div>
    </header>
  );
}
