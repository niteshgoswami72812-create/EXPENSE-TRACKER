import { expenseCategories, incomeCategories } from "../../data/finance-data";
import { Icon } from "../ui/icon";
const inputClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100";
export function TransactionModal({
  form,
  editing,
  onChange,
  onClose,
  onSubmit,
}) {
  function changeType(type) {
    onChange({
      ...form,
      type,
      category: type === "income" ? incomeCategories[0] : expenseCategories[0],
    });
  }
  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-5 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="max-h-[calc(100vh-40px)] w-full max-w-lg overflow-auto rounded-3xl bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
              Money movement
            </p>
            <h2
              id="transaction-modal-title"
              className="text-2xl font-bold tracking-tight"
            >
              {editing ? "Edit transaction" : "Add transaction"}
            </h2>
          </div>
          <button
            className="grid size-10 place-items-center rounded-xl border border-slate-200 hover:bg-slate-50"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="close" />
          </button>
        </div>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              className={`flex h-10 items-center justify-center gap-2 rounded-lg font-semibold transition ${form.type === "expense" ? "bg-white text-red-500 shadow-sm" : "text-slate-500"}`}
              onClick={() => changeType("expense")}
            >
              <Icon name="up" size={18} /> Expense
            </button>
            <button
              type="button"
              className={`flex h-10 items-center justify-center gap-2 rounded-lg font-semibold transition ${form.type === "income" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}
              onClick={() => changeType("income")}
            >
              <Icon name="down" size={18} /> Income
            </button>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-600">
            Description
            <input
              className={inputClass}
              autoFocus
              value={form.title}
              onChange={(event) =>
                onChange({ ...form, title: event.target.value })
              }
              placeholder="e.g. Grocery shopping"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-600">
              Amount (₹)
              <input
                className={inputClass}
                type="number"
                min="1"
                step="1"
                value={form.amount || ""}
                onChange={(event) =>
                  onChange({ ...form, amount: Number(event.target.value) })
                }
                placeholder="0"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-600">
              Date
              <input
                className={inputClass}
                type="date"
                value={form.date}
                onChange={(event) =>
                  onChange({ ...form, date: event.target.value })
                }
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-600">
            Category
            <select
              className={inputClass}
              value={form.category}
              onChange={(event) =>
                onChange({ ...form, category: event.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              className="h-11 rounded-xl border border-slate-200 px-5 font-semibold text-slate-600 hover:bg-slate-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700"
            >
              {editing ? "Save changes" : "Add transaction"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
