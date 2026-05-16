import axios from "axios";

// In development, Vite proxies /api/* to the backend so we avoid CORS.
// In production, use VITE_API_BASE_URL to point at the remote API.
const BASE = import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : "/api";

if (import.meta.env.PROD && !BASE) {
  console.error(
    "[FlowBoard] VITE_API_BASE_URL is not set.\n" +
      "Create a .env.production file in the project root with:\n" +
      "VITE_API_BASE_URL=https://radstask-manager-api.onrender.com/api",
  );
}

const client = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach Bearer token to every request
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("fb_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401 → clear token and go to login
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("fb_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default client;

export function handleApiError(err, toast) {
  const status = err.response?.status;
  const message =
    err.response?.data?.message || err.message || "Something went wrong";

  if (status === 403) return toast("You don't have access to this.", "error");
  if (status === 404) return toast("Resource not found.", "error");
  if (status === 409) return toast(message, "error");
  if (status === 422) return toast(message, "error");
  if (status >= 500)
    return toast("Something went wrong on our end. Try again.", "error");

  toast(message, "error");
}
