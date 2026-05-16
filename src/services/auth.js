import { api } from "./api";

export const authService = {
  // POST /auth/register
  register: async (userData) => {
    return await api("/auth/register", {
      method: "POST",
      body: userData,
      auth: false,
    });
  },

  // POST /auth/login
  login: async (credentials) => {
    return await api("/auth/login", {
      method: "POST",
      body: credentials,
      auth: false,
    });
  },

  // GET /auth/me
  getMe: async () => {
    return await api("/auth/me", { method: "GET" });
  },
};
