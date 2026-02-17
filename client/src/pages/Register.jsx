import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { isValidEmail, minLen } from "../utils/validators";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, logout, loading } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};

    if (!minLen(form.name, 2)) e.name = "Name must be at least 2 characters.";
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
      await register(form);

      // IMPORTANT: don't keep them logged in after registering
      logout();

      navigate("/login");
    } catch (err) {
      setServerError(err?.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-white">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Register to access your dashboard.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Your name"
              value={form.name}
              error={errors.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

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
              placeholder="Minimum 6 characters"
              value={form.password}
              error={errors.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <Button disabled={loading} className="w-full">
              {loading ? "Creating..." : "Register"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link className="font-medium text-slate-300 underline" to="/login">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
