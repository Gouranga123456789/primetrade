import { useEffect, useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Card from "../components/ui/Card";
import Spinner from "../components/Spinner";
import ProfileCard from "../features/profile/ProfileCard";
import TaskList from "../features/tasks/TaskList";
import { getProfile } from "../api/profile.api";
import { getTasks } from "../api/tasks.api";
import Button from "../components/ui/Button";
import { Search, X } from "lucide-react";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  // Raw tasks from DB
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  // UI state
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(""); // applied query
  const [status, setStatus] = useState("all"); // all | open | done

  const filteredTasks = useMemo(() => {
    let list = [...tasks];

    if (status !== "all") {
      list = list.filter((t) =>
        status === "done" ? t.completed : !t.completed
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [tasks, query, status]);

  const load = async () => {
    setLoading(true);
    try {
      const [p, t] = await Promise.all([getProfile(), getTasks()]);
      setProfile(p.user);
      setTasks(t.tasks || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSearch = () => {
    setQuery(searchInput);
  };

  const onClear = () => {
    setSearchInput("");
    setQuery("");
    setStatus("all");
  };

  if (loading) {
    return (
      <AppLayout>
        <Spinner />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProfileCard profile={profile} onProfileUpdated={setProfile} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Header / Controls */}
          <Card>
            {/* Title */}
            <div>
              <h2 className="text-base font-bold text-white">Your Tasks</h2>
              <p className="mt-1 text-sm text-slate-300">
                Create, edit, search and filter tasks.
              </p>
            </div>

            {/* Controls */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Search Input */}
              <input
                className="w-full rounded-xl border border-slate-200 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 lg:col-span-2"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
              />

              {/* Filter */}
              <select
                className="w-full cursor-pointer rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-violet-400/40"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="done">Completed</option>
              </select>

              {/* Search Button */}
              <Button
                variant="secondary"
                onClick={onSearch}
                className="w-full justify-center gap-2"
              >
                <Search size={16} />
                Search
              </Button>

              {/* Clear Button */}
              <Button
                variant="secondary"
                onClick={onClear}
                className="w-full justify-center gap-2 sm:col-span-2 lg:col-span-1"
                title="Clear filters"
              >
                <X size={16} />
                Clear
              </Button>
            </div>
          </Card>
          {/* Task List */}
          <TaskList tasks={filteredTasks} setTasks={setTasks} />
        </div>
      </div>
    </AppLayout>
  );
}
