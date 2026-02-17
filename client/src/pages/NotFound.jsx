import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900">404</h1>
        <p className="mt-2 text-sm text-slate-600">Page not found.</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
