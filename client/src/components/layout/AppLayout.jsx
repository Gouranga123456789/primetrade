import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
