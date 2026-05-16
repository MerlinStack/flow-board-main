import { api } from "./api";

export const taskService = {
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const queryString = params ? `?${params}` : "";
    return await api(`/tasks${queryString}`, { method: "GET" });
  },

  getTaskById: async (id) => {
    return await api(`/tasks/${id}`, { method: "GET" });
  },

  createTask: async (taskData) => {
    return await api("/tasks", { method: "POST", body: taskData });
  },

  updateTask: async (id, taskData) => {
    return await api(`/tasks/${id}`, { method: "PUT", body: taskData });
  },

  updateTaskStatus: async (id, status) => {
    return await api(`/tasks/${id}/status`, {
      method: "PATCH",
      body: { status },
    });
  },

  deleteTask: async (id) => {
    return await api(`/tasks/${id}`, { method: "DELETE" });
  },
};
