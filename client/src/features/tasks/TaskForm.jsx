import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { minLen } from "../../utils/validators";

export default function TaskForm({
  initialValues = { title: "", description: "" },
  onSubmit,
  loading,
  error,
  submitText = "Save",
}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!minLen(form.title, 2)) e.title = "Title must be at least 2 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <Input
        label="Title"
        placeholder="e.g. Finish assignment"
        value={form.title}
        error={errors.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Description (optional)
        </label>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-slate-200"
          placeholder="Add more details..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <Button disabled={loading} className="w-full">
        {loading ? "Saving..." : submitText}
      </Button>
    </form>
  );
}
