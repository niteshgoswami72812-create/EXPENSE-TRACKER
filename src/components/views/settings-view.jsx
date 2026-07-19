import { Icon } from "../ui/icon";
import { SectionHeading } from "../ui/section-heading";
const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgba(30,48,39,0.05)]";
const inputClass =
  "min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-100";
export function SettingsView({
  name,
  onNameChange,
  onSave,
  onExport,
  onReset,
}) {
  return (
    <section className="grid items-start gap-4 lg:grid-cols-[0.8fr_1.2fr]">
      <form className={`${cardClass} grid gap-5`} onSubmit={onSave}>
        <SectionHeading eyebrow="Personal details" title="Profile settings" />
        <div className="grid size-19 place-items-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
          {name.trim().charAt(0).toUpperCase() || "R"}
        </div>
        <label className="grid gap-2 text-sm font-medium text-slate-600">
          Display name
          <input
            className={inputClass}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-600">
          Default currency
          <select className={inputClass} defaultValue="INR">
            <option value="INR">Indian Rupee (₹)</option>
          </select>
        </label>
        <button
          className="flex h-11 w-fit items-center gap-2 rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-lg shadow-emerald-100 hover:bg-emerald-700"
          type="submit"
        >
          <Icon name="check" size={18} /> Save changes
        </button>
      </form>

      <article className={`${cardClass} grid gap-4`}>
        <SectionHeading eyebrow="Data & privacy" title="Local storage" />
        <p className="text-sm leading-6 text-slate-500">
          PaisaFlow stores your transactions only in this browser. No account or
          server is required.
        </p>
        <SettingAction
          title="Download your data"
          text="Export every transaction as a CSV file."
          button="Export"
          icon="download"
          onClick={onExport}
        />
        <SettingAction
          title="Reset sample data"
          text="Remove your changes and restore the starter transactions."
          button="Reset"
          icon="trash"
          danger
          onClick={onReset}
        />
      </article>
    </section>
  );
}
function SettingAction({ title, text, button, icon, danger = false, onClick }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center">
      <div>
        <strong
          className={`text-sm ${danger ? "text-red-500" : "text-slate-800"}`}
        >
          {title}
        </strong>
        <span className="mt-1 block text-xs text-slate-500">{text}</span>
      </div>
      <button
        className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${danger ? "border-red-200 text-red-500 hover:bg-red-50" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
        onClick={onClick}
      >
        <Icon name={icon} size={17} /> {button}
      </button>
    </div>
  );
}
