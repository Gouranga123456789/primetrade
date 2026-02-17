import { useState } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { createTask } from "../../api/tasks.api";

export default function TaskList({ tasks, setTasks }) {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const onCreate = async (payload) => {
    setError("");
    setCreating(true);
    try {
      const data = await createTask(payload);
      setTasks((prev) => [data.task, ...prev]);
      setOpen(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create task.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">
          Tasks ({tasks.length})
        </p>

        <Button onClick={() => setOpen(true)}>+ New Task</Button>
      </div>

      {tasks.length === 0 ? (
        <div className="py-10 text-center text-sm text-slate-500">
          No tasks found. Create your first task.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {tasks.map((t) => (
            <TaskItem key={t._id} task={t} setTasks={setTasks} />
          ))}
        </div>
      )}

      <Modal open={open} title="Create Task" onClose={() => setOpen(false)}>
        <TaskForm
          onSubmit={onCreate}
          loading={creating}
          error={error}
          submitText="Create"
        />
      </Modal>
    </Card>
  );
}
