import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { isValidEmail, minLen } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};

    if (!isValidEmail(form.email)) e.email = "Enter a valid email address.";
    if (!minLen(form.password, 6)) e.password = "Password must be 6+ characters.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">
              Login to access your dashboard.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              error={errors.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              error={errors.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button disabled={loading} className="w-full">
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link className="font-medium text-slate-300 underline" to="/register">
              Register
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
