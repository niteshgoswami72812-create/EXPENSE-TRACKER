import { categoryBudgets } from "../../data/finance-data";
import { formatMoney } from "../../lib/format";
const colors = [
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-indigo-100 text-indigo-800",
  "bg-sky-100 text-sky-800",
  "bg-rose-100 text-rose-700",
];
export function BudgetsView({ transactions }) {
  const spendByCategory = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => {
      total[transaction.category] =
        (total[transaction.category] ?? 0) + transaction.amount;
      return total;
    }, {});
  const totalBudget = Object.values(categoryBudgets).reduce(
    (sum, value) => sum + value,
    0,
  );
  const totalSpent = Object.values(spendByCategory).reduce(
    (sum, value) => sum + value,
    0,
  );
  const overallPercentage = Math.min(
    100,
    Math.round((totalSpent / totalBudget) * 100),
  );
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Object.entries(categoryBudgets).map(([category, limit], index) => {
        const spent = spendByCategory[category] ?? 0;
        const percentage = Math.min(100, Math.round((spent / limit) * 100));
        return (
          <article
            key={category}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(30,48,39,0.05)]"
          >
            <div className="flex items-center justify-between">
              <span
                className={`grid size-10 place-items-center rounded-full font-bold ${colors[index % colors.length]}`}
              >
                {category.charAt(0)}
              </span>
              <span
                className={`rounded-lg px-2 py-1 text-xs font-semibold ${percentage > 85 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-700"}`}
              >
                {percentage}% used
              </span>
            </div>

            <h2 className="mt-5 text-lg font-bold">{category}</h2>
            <p className="mt-1 text-sm text-slate-500">
              <strong className="text-base text-slate-800">
                {formatMoney(spent)}
              </strong>{" "}
              spent of {formatMoney(limit)}
            </p>
            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <i
                className={`block h-full rounded-full ${percentage > 85 ? "bg-red-500" : "bg-gradient-to-r from-emerald-600 to-emerald-400"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="mt-4 flex justify-between text-xs text-slate-500">
              <span>Remaining</span>
              <strong className="text-slate-800">
                {formatMoney(Math.max(0, limit - spent))}
              </strong>
            </div>
          </article>
        );
      })}

      <article className="flex items-center gap-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-[0_8px_30px_rgba(30,48,39,0.05)] md:col-span-2">
        <div
          className="grid size-32 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(#059669 0 ${overallPercentage}%, #dfe9e3 ${overallPercentage}% 100%)`,
          }}
        >
          <div className="grid size-23 place-items-center rounded-full bg-white text-center">
            <span>
              <strong className="block text-base">{overallPercentage}%</strong>
              <small className="text-slate-500">used</small>
            </span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
            Overall budget
          </p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">
            {formatMoney(totalBudget)}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            You have spent {formatMoney(totalSpent)} across all tracked
            categories this month.
          </p>
        </div>
      </article>
    </section>
  );
}
