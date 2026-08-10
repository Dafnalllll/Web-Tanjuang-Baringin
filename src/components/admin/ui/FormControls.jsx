/* ─── Form controls admin: Input, Textarea, Select ─── */

const baseFieldClass =
  "w-full rounded-lg border border-white/10 bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-amber-500/40 focus:bg-white/6 focus:shadow-sm focus:shadow-amber-500/5";

const labelClass =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-400";

const errorClass = "mt-1.5 text-[11px] font-medium text-red-400";

export function Field({ label, error, required, children }) {
  return (
    <div>
      {label && (
        <label className={labelClass}>
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      {children}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export function Input({ label, error, required, className = "", ...props }) {
  return (
    <Field label={label} error={error} required={required}>
      <input
        className={`${baseFieldClass} ${error ? "border-red-500/40" : ""} ${className}`}
        {...props}
      />
    </Field>
  );
}

export function Textarea({ label, error, required, rows = 4, className = "", ...props }) {
  return (
    <Field label={label} error={error} required={required}>
      <textarea
        rows={rows}
        className={`${baseFieldClass} resize-y ${error ? "border-red-500/40" : ""} ${className}`}
        {...props}
      />
    </Field>
  );
}

export function Select({ label, error, required, children, className = "", ...props }) {
  return (
    <Field label={label} error={error} required={required}>
      <select
        className={`${baseFieldClass} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22/%3E%3C/svg%3E')] bg-position-[right_0.85rem_center] bg-no-repeat pr-9 ${error ? "border-red-500/40" : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
    </Field>
  );
}

export function Toggle({ label, checked, onChange, description }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/4 px-3.5 py-3 transition-all hover:border-white/20"
    >
      <span className="text-left">
        <span className="block text-sm font-semibold text-white">{label}</span>
        {description && (
          <span className="mt-0.5 block text-[11px] text-slate-400">{description}</span>
        )}
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-amber-500/80" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
            checked ? "translate-x-5.5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
