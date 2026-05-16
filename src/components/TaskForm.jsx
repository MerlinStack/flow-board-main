import { useState } from "react";
import { taskService } from "../services/tasks";

export default function TaskForm({ onSuccess, onClose }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");

    setSubmitting(true);
    try {
      await taskService.createTask(form);
      onSuccess(); // Triggers reload on dashboard
      onClose(); // Closes form/modal
    } catch (err) {
      alert(err.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md w-full bg-slate-800 p-6 rounded-xl border border-slate-700"
    >
      <h2 className="text-lg font-bold text-slate-100">Create New Task</h2>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          TASK TITLE
        </label>
        <input
          type="text"
          placeholder="e.g., Finish API layer"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#1F6FEB]"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1">
          DESCRIPTION
        </label>
        <textarea
          rows="3"
          placeholder="Provide task details..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#1F6FEB]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            PRIORITY
          </label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#1F6FEB]"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">
            DUE DATE
          </label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#1F6FEB]"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-transparent text-slate-400 hover:text-slate-200 text-sm font-medium rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-[#1F6FEB] hover:bg-blue-600 disabled:bg-blue-800 text-white text-sm font-medium rounded-lg transition"
        >
          {submitting ? "Creating..." : "Save Task"}
        </button>
      </div>
    </form>
  );
}
