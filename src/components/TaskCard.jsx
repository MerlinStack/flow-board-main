import { taskService } from "../services/tasks";

export default function TaskCard({ task, onRefresh }) {
  const priorityColors = {
    high: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const handleToggleStatus = async () => {
    try {
      const nextStatus = task.status === "completed" ? "pending" : "completed";
      await taskService.updateTaskStatus(task.id, nextStatus);
      onRefresh();
    } catch {
      alert("Failed to update task status");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete task "${task.title}"?`)) return;
    try {
      await taskService.deleteTask(task.id);
      onRefresh();
    } catch {
      alert("Failed to delete task");
    }
  };

  return (
    <div
      className={`p-5 bg-slate-800/60 rounded-xl border border-slate-700/50 backdrop-blur-sm transition-all hover:border-slate-600 ${task.status === "completed" ? "opacity-60" : ""}`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3
          className={`font-semibold text-slate-100 text-base leading-snug ${task.status === "completed" ? "line-through text-slate-500" : ""}`}
        >
          {task.title}
        </h3>
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${priorityColors[task.priority] || priorityColors.low}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-slate-400 text-sm mb-4 line-clamp-2 h-10">
        {task.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between border-t border-slate-700/50 pt-3 text-xs text-slate-400">
        <span>Due: {task.dueDate || "No date"}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleStatus}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${task.status === "completed" ? "bg-slate-700 hover:bg-slate-600 text-slate-300" : "bg-[#1F6FEB] hover:bg-blue-600 text-white"}`}
          >
            {task.status === "completed" ? "Reopen" : "Complete"}
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
