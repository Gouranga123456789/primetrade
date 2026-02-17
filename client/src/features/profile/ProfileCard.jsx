import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { updateProfile } from "../../api/profile.api";
import { isValidEmail, minLen } from "../../utils/validators";

export default function ProfileCard({ profile, onProfileUpdated }) {
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // If profile updates from parent, refresh form (only if not editing)
  useEffect(() => {
    if (!editMode) {
      setForm({
        name: profile?.name || "",
        email: profile?.email || "",
      });
    }
  }, [profile, editMode]);

  const validate = () => {
    const e = {};
    if (!minLen(form.name, 2)) e.name = "Name must be at least 2 characters.";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onCancel = () => {
    setEditMode(false);
    setErrors({});
    setMsg("");
    setForm({
      name: profile?.name || "",
      email: profile?.email || "",
    });
  };

  const onSave = async () => {
    setMsg("");
    if (!validate()) return;

    setSaving(true);
    try {
      const data = await updateProfile(form);
      onProfileUpdated(data.user);
      setMsg("Profile updated successfully.");
      setEditMode(false);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="h-fit">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-white">Profile</h2>
          <p className="mt-1 text-sm text-slate-300">
            View and update your account details.
          </p>
        </div>

        {!editMode ? (
          <Button variant="secondary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        ) : (
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <Input
          label="Full Name"
          value={form.name}
          error={errors.name}
          disabled={!editMode}
          className={!editMode ? "bg-slate-50" : ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          error={errors.email}
          disabled={!editMode}
          className={!editMode ? "bg-slate-50" : ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {editMode && (
          <Button disabled={saving} onClick={onSave} className="w-full">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        )}

        {msg && (
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
            {msg}
          </div>
        )}
      </div>
    </Card>
  );
}
