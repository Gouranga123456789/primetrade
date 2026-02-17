export default function Badge({ children, tone = "default" }) {
  const styles = {
    default: "bg-white/10 text-slate-200 border border-white/10",
    green: "bg-emerald-500/15 text-emerald-200 border border-emerald-500/25",
    yellow: "bg-amber-500/15 text-amber-200 border border-amber-500/25",
    red: "bg-rose-500/15 text-rose-200 border border-rose-500/25",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
