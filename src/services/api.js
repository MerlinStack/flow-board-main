import "axios";

const BASE = import.meta.env.VITE_API_BASE_URL;

export async function api(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

export function handleApiError(err, toast) {
  if (err.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }
  toast(err.message || "Something went wrong");
}
