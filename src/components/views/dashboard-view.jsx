import { MetricCard } from "../dashboard/metric-card";
import { OverviewChart } from "../dashboard/overview-chart";
import { TransactionRow } from "../transactions/transaction-row";
import { Icon } from "../ui/icon";
import { SectionHeading } from "../ui/section-heading";
import { categoryBudgets } from "../../data/finance-data";
import { formatMoney } from "../../lib/format";
const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(30,48,39,0.05)]";
export function DashboardView({
  transactions,
  income,
  expenses,
  balance,
  savingsRate,
  onNavigate,
}) {
  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
    .slice(0, 7);
  const categorySpend = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => {
      total[transaction.category] =
        (total[transaction.category] ?? 0) + transaction.amount;
      return total;
    }, {});
  const topBudgets = Object.entries(categorySpend)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  return (
    <>
      <section
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Financial summary"
      >
        <MetricCard
          icon="wallet"
          label="Total Balance"
          value={formatMoney(balance)}
          caption="Across all accounts"
        />
        <MetricCard
          icon="down"
          label="Income"
          value={formatMoney(income)}
          caption="This month"
          tone="green"
        />
        <MetricCard
          icon="up"
          label="Expenses"
          value={formatMoney(expenses)}
          caption="This month"
          tone="red"
        />
        <MetricCard
          icon="piggy"
          label="Savings"
          value={`${savingsRate}%`}
          caption={`${formatMoney(balance)} saved`}
          tone="green"
        />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_0.9fr]">
        <article className={cardClass}>
          <SectionHeading
            eyebrow="Cash flow"
            title="Overview"
            action={
              <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                Last 6 months
              </span>
            }
          />
          <OverviewChart income={income} expenses={expenses} />
        </article>

        <article className={cardClass}>
          <SectionHeading
            eyebrow="Latest activity"
            title="Recent transactions"
            action={
              <button
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-600"
                onClick={() => onNavigate("transactions")}
              >
                View all
              </button>
            }
          />
          <div className="mt-2">
            {recentTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                compact
              />
            ))}
          </div>
        </article>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.55fr_0.9fr]">
        <article className={cardClass}>
          <SectionHeading
            eyebrow="Monthly limits"
            title="Budget snapshot"
            action={
              <button
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-600"
                onClick={() => onNavigate("budgets")}
              >
                Manage
              </button>
            }
          />
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {topBudgets.map(([category, spent]) => {
              const limit = categoryBudgets[category] ?? 5000;
              const percentage = Math.min(
                100,
                Math.round((spent / limit) * 100),
              );
              return (
                <div key={category}>
                  <strong className="text-sm text-slate-800">{category}</strong>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatMoney(spent)} of {formatMoney(limit)}
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <i
                      className="block h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article
          className={`${cardClass} flex items-center gap-4 bg-gradient-to-br from-emerald-50 to-white`}
        >
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
            <Icon name="piggy" size={28} />
          </span>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
              Savings rate
            </p>
            <h2 className="text-xl font-bold">{savingsRate}% this month</h2>
            <p className="mt-1 text-xs text-slate-500">
              You kept {formatMoney(balance)} after expenses.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}
