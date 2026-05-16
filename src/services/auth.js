import { api } from "./api";

export const authService = {
  register: async (userData) => {
    return await api("/auth/register", {
      method: "POST",
      body: userData,
      auth: false,
    });
  },

  login: async (credentials) => {
    return await api("/auth/login", {
      method: "POST",
      body: credentials,
      auth: false,
    });
  },

  getMe: async () => {
    return await api("/auth/me", { method: "GET" });
  },
};
