import { useState } from "react";
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import TaskForm from "./TaskForm";
import { deleteTask, updateTask } from "../../api/tasks.api";
import { formatDate } from "../../utils/format";

export default function TaskItem({ task, setTasks }) {
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const toggleComplete = async () => {
    setErr("");
    try {
      const data = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? data.task : t)));
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to update task.");
    }
  };

  const onUpdate = async (payload) => {
    setErr("");
    setSaving(true);
    try {
      const data = await updateTask(task._id, payload);
      setTasks((prev) => prev.map((t) => (t._id === task._id ? data.task : t)));
      setEditOpen(false);
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to update task.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!confirm("Delete this task?")) return;

    setErr("");
    try {
      await deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to delete task.");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur">
      {err && (
        <div className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* Top row: toggle + actions */}
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={toggleComplete}
          className="mt-1 rounded-lg p-1 hover:bg-slate-100"
          title="Toggle complete"
        >
          {task.completed ? (
            <CheckCircle2 size={20} className="text-green-600" />
          ) : (
            <Circle size={20} className="text-slate-500" />
          )}
        </button>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setEditOpen(true)}>
            <Pencil size={16} />
          </Button>

          <Button variant="ghost" onClick={onDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-2 text-sm font-semibold text-white break-words">
        {task.title}
      </h3>

      {/* Status */}
      <div className="mt-2">
        <Badge tone={task.completed ? "green" : "yellow"}>
          {task.completed ? "Completed" : "Open"}
        </Badge>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-3 text-sm text-slate-600 break-words">
          {task.description}
        </p>
      )}

      {/* Date */}
      <p className="mt-3 text-xs text-slate-400">
        Updated: {formatDate(task.updatedAt)}
      </p>

      <Modal open={editOpen} title="Edit Task" onClose={() => setEditOpen(false)}>
        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description || "",
          }}
          onSubmit={onUpdate}
          loading={saving}
          error={err}
          submitText="Update"
        />
      </Modal>
    </div>
  );
}
