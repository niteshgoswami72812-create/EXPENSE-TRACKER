import { Icon } from "./icon";

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-22 left-4 right-4 z-60 flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6">
      <span className="grid size-6 place-items-center rounded-full bg-emerald-600">
        <Icon name="check" size={16} />
      </span>
      {message}
    </div>
  );
}
