import { useMemo, useState } from "react";
import { TransactionRow } from "../transactions/transaction-row";
import { Icon } from "../ui/icon";
const controlClass =
  "min-h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100";
export function TransactionsView({ transactions, onEdit, onDelete, onExport }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");
  const categories = useMemo(
    () =>
      [
        ...new Set(transactions.map((transaction) => transaction.category)),
      ].sort(),
    [transactions],
  );
  const filteredTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
      .filter((transaction) => {
        const words =
          `${transaction.title} ${transaction.category}`.toLowerCase();
        const matchesSearch = words.includes(search.toLowerCase());
        const matchesType = type === "all" || transaction.type === type;
        const matchesCategory =
          category === "all" || transaction.category === category;
        return matchesSearch && matchesType && matchesCategory;
      });
  }, [transactions, search, type, category]);
  return (
    <section className="min-h-140 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(30,48,39,0.05)]">
      <div className="grid gap-3 md:grid-cols-[minmax(220px,1fr)_150px_180px_auto]">
        <label className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-slate-500 focus-within:border-emerald-500 focus-within:ring-3 focus-within:ring-emerald-100">
          <Icon name="search" size={19} />
          <input
            className="w-full bg-transparent text-sm text-slate-800 outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search transactions"
            aria-label="Search transactions"
          />
        </label>

        <select
          className={controlClass}
          value={type}
          onChange={(event) => setType(event.target.value)}
          aria-label="Filter by type"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>

        <select
          className={controlClass}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <button
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          onClick={onExport}
        >
          <Icon name="download" size={18} /> Export CSV
        </button>
      </div>

      <div className="mt-5 hidden grid-cols-[40px_minmax(150px,1fr)_auto_auto_auto] gap-3 border-b border-slate-200 pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:grid">
        <span className="col-span-2">Transaction</span>
        <span>Category</span>
        <span>Amount</span>
        <span>Actions</span>
      </div>

      <div>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="grid place-items-center py-20 text-center text-slate-500">
            <Icon name="search" size={32} />
            <h3 className="mt-3 font-bold text-slate-800">
              No transactions found
            </h3>
            <p className="mt-1 text-sm">Try changing your search or filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
