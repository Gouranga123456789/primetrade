import { LayoutDashboard, ListTodo, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r border-white/10 bg-black/25 p-5 backdrop-blur md:block sticky top-0">
      <div className="mb-6">
        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
          PrimeTrade Task
        </h1>
        <p className="text-xs text-slate-300">Auth + Dashboard + CRUD</p>
      </div>

      <nav className="space-y-2 text-sm">
        <div className="flex cursor-pointer items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-slate-100">
          <LayoutDashboard size={16} />
          Dashboard
        </div>

        <div className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">
          <ListTodo size={16} />
          Tasks
        </div>

        <div className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-white/5">
          <User size={16} />
          Profile
        </div>
      </nav>

      <div className="mt-10 rounded-2xl bg-white/5 p-4 text-xs text-slate-300">
        <p className="font-medium text-slate-100">Why task management?</p>
        <p className="mt-1">
          Task management keeps priorities clear, progress visible, and work on track.
        </p>
      </div>
    </aside>
  );
}
