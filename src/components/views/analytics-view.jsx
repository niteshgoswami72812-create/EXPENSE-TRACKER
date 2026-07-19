import { Icon } from "../ui/icon";
import { SectionHeading } from "../ui/section-heading";
import { formatMoney } from "../../lib/format";
const bars = [
  "bg-emerald-600",
  "bg-indigo-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
];
const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(30,48,39,0.05)]";
export function AnalyticsView({ transactions, income, expenses, savingsRate }) {
  const categorySpend = Object.entries(
    transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => {
        total[transaction.category] =
          (total[transaction.category] ?? 0) + transaction.amount;
        return total;
      }, {}),
  ).sort((a, b) => b[1] - a[1]);
  const highestSpend = Math.max(1, ...categorySpend.map(([, value]) => value));
  return (
    <section className="grid gap-4 xl:grid-cols-[1.5fr_0.65fr]">
      <article className={`${cardClass} min-h-142`}>
        <SectionHeading
          eyebrow="Spending breakdown"
          title="Expenses by category"
          action={
            <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              This month
            </span>
          }
        />

        <div className="mt-8 grid gap-6">
          {categorySpend.map(([category, value], index) => (
            <div key={category}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-600">{category}</span>
                <strong>{formatMoney(value)}</strong>
              </div>
              <div className="h-4 overflow-hidden rounded-md bg-slate-100">
                <i
                  className={`block h-full rounded-md transition-all duration-500 ${bars[index % bars.length]}`}
                  style={{ width: `${(value / highestSpend) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>

      <aside className="grid content-start gap-4">
        <InsightCard
          icon="down"
          label="Monthly income"
          value={formatMoney(income)}
          note="Your biggest income source is Salary."
          tone="green"
        />
        <InsightCard
          icon="up"
          label="Monthly expenses"
          value={formatMoney(expenses)}
          note={`${income ? Math.round((expenses / income) * 100) : 0}% of your income was spent.`}
          tone="red"
        />
        <InsightCard
          icon="piggy"
          label="Best insight"
          value={`${savingsRate}% saved`}
          note={
            savingsRate >= 20
              ? "Great work—you are above the 20% savings goal."
              : "Try to reach a 20% monthly savings rate."
          }
          tone="indigo"
        />
      </aside>
    </section>
  );
}
function InsightCard({ icon, label, value, note, tone }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-500",
    indigo: "bg-indigo-50 text-indigo-600",
  };
  return (
    <article className={`${cardClass} flex gap-4`}>
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl ${tones[tone]}`}
      >
        <Icon name={icon} size={23} />
      </span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <strong className="mt-1 block text-xl">{value}</strong>
        <small className="mt-2 block leading-5 text-slate-500">{note}</small>
      </div>
    </article>
  );
}
