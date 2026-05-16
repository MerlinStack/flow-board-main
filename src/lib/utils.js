export function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isOverdue(dueDate, status) {
  if (!dueDate || status === "completed") return false;
  return new Date(dueDate) < new Date();
}

export const PRIORITY_STYLES = {
  high: { color: "#f87171", bg: "rgba(248,113,113,.13)" },
  medium: { color: "#fbbf24", bg: "rgba(251,191,36,.13)" },
  low: { color: "#34d399", bg: "rgba(52,211,153,.13)" },
};

export const STATUS_STYLES = {
  pending: { color: "#a78bfa", bg: "rgba(167,139,250,.13)" },
  "in-progress": { color: "#38bdf8", bg: "rgba(56,189,248,.13)" },
  completed: { color: "#34d399", bg: "rgba(52,211,153,.13)" },
};
