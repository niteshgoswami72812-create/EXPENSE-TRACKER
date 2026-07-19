import { formatMoney } from "../../lib/format";
export function OverviewChart({ income, expenses }) {
  const incomeSeries = [12000, 18000, 27000, 35500, 43200, income];
  const expenseSeries = [1800, 3900, 5200, 7800, 10400, expenses];
  const chartMax = Math.max(70000, ...incomeSeries);
  function createPoints(values) {
    return values
      .map(
        (value, index) =>
          `${55 + index * 101},${242 - (value / chartMax) * 205}`,
      )
      .join(" ");
  }
  const incomePoints = createPoints(incomeSeries);
  const expensePoints = createPoints(expenseSeries);
  return (
    <div className="mt-4">
      <div className="flex gap-5 text-xs font-medium text-slate-600">
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-emerald-600" />
          Income
        </span>
        <span className="flex items-center gap-2">
          <i className="size-2 rounded-full bg-indigo-500" />
          Expenses
        </span>
      </div>

      <div className="overflow-x-auto">
        <svg
          className="h-auto min-w-[560px] w-full"
          viewBox="0 0 620 280"
          role="img"
          aria-label="Six-month income and expense chart"
        >
          <defs>
            <linearGradient id="income-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity=".22" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="expense-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity=".15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((line) => (
            <line
              key={line}
              x1="54"
              y1={36 + line * 51}
              x2="570"
              y2={36 + line * 51}
              stroke="#e8ebe7"
              strokeDasharray="4 4"
            />
          ))}

          {["70K", "52K", "35K", "17K", "0"].map((label, index) => (
            <text
              key={label}
              x="7"
              y={41 + index * 51}
              fill="#87909c"
              fontSize="11"
            >
              {label}
            </text>
          ))}

          <polygon
            points={`${incomePoints} 560,242 55,242`}
            fill="url(#income-fill)"
          />
          <polygon
            points={`${expensePoints} 560,242 55,242`}
            fill="url(#expense-fill)"
          />
          <polyline
            points={incomePoints}
            fill="none"
            stroke="#059669"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points={expensePoints}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="560"
            cy={242 - (income / chartMax) * 205}
            r="5"
            fill="#059669"
            stroke="white"
            strokeWidth="2"
          />
          <circle
            cx="560"
            cy={242 - (expenses / chartMax) * 205}
            r="5"
            fill="#6366f1"
            stroke="white"
            strokeWidth="2"
          />

          {["Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((month, index) => (
            <text
              key={month}
              x={47 + index * 101}
              y="268"
              fill="#87909c"
              fontSize="11"
            >
              {month}
            </text>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
        <div className="grid gap-1">
          <span className="text-xs text-slate-500">Total income</span>
          <strong className="tabular-nums">{formatMoney(income)}</strong>
        </div>
        <div className="grid gap-1 border-l border-slate-200 pl-6">
          <span className="text-xs text-slate-500">Total expenses</span>
          <strong className="tabular-nums">{formatMoney(expenses)}</strong>
        </div>
      </div>
    </div>
  );
}
