import { Icon } from "../ui/icon";
const tones = {
  default: {
    icon: "bg-emerald-50 text-emerald-700",
    value: "text-slate-900",
    line: "stroke-emerald-600",
  },
  green: {
    icon: "bg-emerald-50 text-emerald-700",
    value: "text-emerald-700",
    line: "stroke-emerald-600",
  },
  red: {
    icon: "bg-red-50 text-red-500",
    value: "text-red-500",
    line: "stroke-red-500",
  },
};
export function MetricCard({ icon, label, value, caption, tone = "default" }) {
  const colors = tones[tone];
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(30,48,39,0.05)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-xl ${colors.icon}`}
        >
          <Icon name={icon} size={23} />
        </span>
        <div className="min-w-0">
          <p className="mb-1 text-sm font-medium text-slate-500">{label}</p>
          <strong
            className={`block truncate text-2xl font-bold tracking-tight tabular-nums ${colors.value}`}
          >
            {value}
          </strong>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="text-xs text-slate-500">{caption}</span>
        <svg
          className={`h-7 w-16 fill-none stroke-2 ${colors.line}`}
          viewBox="0 0 86 32"
          aria-hidden="true"
        >
          <path d="M2 27c8 0 9-9 17-9s8 7 16 7 8-17 16-17 8 13 15 13S74 5 84 3" />
        </svg>
      </div>
    </article>
  );
}
