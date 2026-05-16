import client from "./api.js";
import * as mockApi from "./mockApi.js";

const isDev = import.meta.env.DEV;

export async function register(data) {
  if (isDev) {
    return mockApi.register(data);
  }

  const res = await client.post("/auth/register", data);
  return res.data;
}

export async function login(data) {
  if (isDev) {
    return mockApi.login(data);
  }

  const res = await client.post("/auth/login", data);
  return res.data;
}

export async function getMe() {
  if (isDev) {
    const token = localStorage.getItem("fb_token");
    return mockApi.getMe(token);
  }

  const res = await client.get("/auth/me");
  return res.data;
}
