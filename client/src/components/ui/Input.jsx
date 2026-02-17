export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-slate-200">{label}</label>
      )}

      <input
        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-red-500/40 bg-slate-950 text-slate-100 focus:ring-red-400/30"
            : "border-slate-800 bg-slate-950 text-slate-100 focus:ring-violet-400/30"
        } ${className}`}
        {...props}
      />

      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
