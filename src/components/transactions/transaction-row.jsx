import { Icon } from "../ui/icon";
import { formatDate, formatMoney } from "../../lib/format";
const avatarColors = [
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-indigo-100 text-indigo-800",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-800",
];
export function TransactionRow({
  transaction,
  compact = false,
  onEdit,
  onDelete,
}) {
  const color =
    avatarColors[
      Math.abs(transaction.title.charCodeAt(0)) % avatarColors.length
    ];
  const sign = transaction.type === "income" ? "+" : "−";
  return (
    <div
      className={`grid items-center gap-3 border-b border-slate-100 py-3 last:border-0 ${compact ? "grid-cols-[36px_minmax(120px,1fr)_auto]" : "grid-cols-[40px_minmax(150px,1fr)_auto_auto_auto]"}`}
    >
      <span
        className={`grid size-9 place-items-center rounded-full text-sm font-bold ${color}`}
      >
        {transaction.title.charAt(0).toUpperCase()}
      </span>

      <div className="min-w-0">
        <strong className="block truncate text-sm font-semibold text-slate-800">
          {transaction.title}
        </strong>
        <span className="text-[11px] text-slate-500">
          {formatDate(transaction.date)}
        </span>
      </div>

      {!compact && (
        <span className="hidden rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-600 sm:block">
          {transaction.category}
        </span>
      )}

      <strong
        className={`justify-self-end whitespace-nowrap text-sm tabular-nums ${transaction.type === "income" ? "text-emerald-700" : "text-red-500"}`}
      >
        {sign}
        {formatMoney(transaction.amount)}
      </strong>

      {!compact && onEdit && onDelete && (
        <div className="flex justify-end">
          <button
            className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
            onClick={() => onEdit(transaction)}
            aria-label={`Edit ${transaction.title}`}
          >
            <Icon name="edit" size={16} />
          </button>
          <button
            className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500"
            onClick={() => onDelete(transaction.id)}
            aria-label={`Delete ${transaction.title}`}
          >
            <Icon name="trash" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
