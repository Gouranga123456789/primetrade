export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed";

  const styles = {
    primary:
      "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-400/40",
    secondary:
      "bg-slate-900 text-slate-100 border border-slate-800 hover:bg-slate-800 focus:ring-violet-400/30",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400/30",
    ghost:
      "bg-transparent text-slate-200 hover:bg-white/10 focus:ring-violet-400/30",
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
