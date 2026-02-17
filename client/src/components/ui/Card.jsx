export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-slate-300/60 bg-slate-950/70 p-5 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
