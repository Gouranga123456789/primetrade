import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-white/10 bg-black/30 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div>
          <p className="text-sm font-semibold text-slate-100">Dashboard</p>
          <p className="text-xs text-slate-300">
            Logged in as {user?.name || "User"}
          </p>
        </div>

        <Button variant="secondary" onClick={logout} className="gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </header>
  );
}
