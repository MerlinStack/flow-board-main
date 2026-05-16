import client from "./api.js";
import * as mockApi from "./mockApi.js";

const isDev = import.meta.env.DEV;

export async function listTasks(params = {}) {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.listTasks(token, params);
  }

  const res = await client.get("/tasks", { params });
  return res.data;
}

export async function getTask(id) {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.getTask(token, id);
  }

  const res = await client.get(`/tasks/${id}`);
  return res.data;
}

export async function createTask(data) {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.createTask(token, data);
  }

  const res = await client.post("/tasks", data);
  return res.data;
}

export async function updateTask(id, data) {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.updateTask(token, id, data);
  }

  const res = await client.put(`/tasks/${id}`, data);
  return res.data;
}

export async function updateTaskStatus(id, status) {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.updateTaskStatus(token, id, status);
  }

  // Try PATCH /status first, fall back to PUT
  try {
    const res = await client.patch(`/tasks/${id}/status`, { status });
    return res.data;
  } catch {
    const res = await client.put(`/tasks/${id}`, { status });
    return res.data;
  }
}

export async function deleteTask(id) {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.deleteTask(token, id);
  }

  const res = await client.delete(`/tasks/${id}`);
  return res.data;
}
