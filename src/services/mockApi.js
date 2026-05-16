const STORAGE_KEY = "flowboard_mock_data";

function readStore() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStore(store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function createDefaultStore() {
  const now = new Date().toISOString();
  return {
    users: [
      {
        id: "user-1",
        name: "Demo User",
        email: "demo@example.com",
        password: "demo123",
      },
    ],
    tasks: {
      "demo@example.com": [
        {
          id: "task-1",
          title: "Welcome to FlowBoard",
          description:
            "This is a sample task created for your local demo environment.",
          status: "pending",
          priority: "high",
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
  };
}

function getStore() {
  const stored = readStore();
  const data = stored || createDefaultStore();
  if (!stored) writeStore(data);
  return data;
}

function findUserByEmail(email) {
  const store = getStore();
  return store.users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}

function getSessionUser(token) {
  if (!token || typeof token !== "string") return null;
  const prefix = "mock-token:";
  if (!token.startsWith(prefix)) return null;
  const email = token.slice(prefix.length);
  return findUserByEmail(email);
}

function saveUser(user) {
  const store = getStore();
  store.users = store.users.filter(
    (item) => item.email.toLowerCase() !== user.email.toLowerCase(),
  );
  store.users.push(user);
  writeStore(store);
}

function getTasksForUser(email) {
  const store = getStore();
  return store.tasks[email] || [];
}

function saveTasksForUser(email, tasks) {
  const store = getStore();
  store.tasks[email] = tasks;
  writeStore(store);
}

function createToken(user) {
  return `mock-token:${user.email}`;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

function createTaskId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function login(data) {
  const user = findUserByEmail(data.email);
  if (!user || user.password !== data.password) {
    const error = new Error("Invalid email or password");
    error.response = {
      status: 401,
      data: { message: "Invalid email or password" },
    };
    throw error;
  }

  return {
    user: sanitizeUser(user),
    token: createToken(user),
  };
}

export async function register(data) {
  if (findUserByEmail(data.email)) {
    const error = new Error("Email already exists");
    error.response = { status: 409, data: { message: "Email already exists" } };
    throw error;
  }

  const user = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: data.name,
    email: data.email,
    password: data.password,
  };
  saveUser(user);
  saveTasksForUser(user.email, []);

  return {
    user: sanitizeUser(user),
    token: createToken(user),
  };
}

export async function getMe(token) {
  const user = getSessionUser(token);
  if (!user) {
    const error = new Error("Not authenticated");
    error.response = { status: 401, data: { message: "Not authenticated" } };
    throw error;
  }
  return sanitizeUser(user);
}

export async function listTasks(token, params = {}) {
  const user = getSessionUser(token);
  if (!user) {
    const error = new Error("Not authenticated");
    error.response = { status: 401, data: { message: "Not authenticated" } };
    throw error;
  }

  let tasks = getTasksForUser(user.email);
  if (params.status)
    tasks = tasks.filter((task) => task.status === params.status);
  if (params.priority)
    tasks = tasks.filter((task) => task.priority === params.priority);
  if (params.search) {
    const query = params.search.toLowerCase();
    tasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description || "").toLowerCase().includes(query),
    );
  }

  return { tasks };
}

export async function getTask(token, id) {
  const user = getSessionUser(token);
  if (!user) {
    const error = new Error("Not authenticated");
    error.response = { status: 401, data: { message: "Not authenticated" } };
    throw error;
  }

  const task = getTasksForUser(user.email).find((item) => item.id === id);
  if (!task) {
    const error = new Error("Not found");
    error.response = { status: 404, data: { message: "Task not found" } };
    throw error;
  }

  return { task };
}

export async function createTask(token, data) {
  const user = getSessionUser(token);
  if (!user) {
    const error = new Error("Not authenticated");
    error.response = { status: 401, data: { message: "Not authenticated" } };
    throw error;
  }

  const tasks = getTasksForUser(user.email);
  const now = new Date().toISOString();
  const task = {
    id: createTaskId(),
    title: data.title,
    description: data.description || "",
    status: data.status || "pending",
    priority: data.priority || "medium",
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now,
  };
  saveTasksForUser(user.email, [task, ...tasks]);
  return { task };
}

export async function updateTask(token, id, data) {
  const user = getSessionUser(token);
  if (!user) {
    const error = new Error("Not authenticated");
    error.response = { status: 401, data: { message: "Not authenticated" } };
    throw error;
  }

  const tasks = getTasksForUser(user.email);
  const taskIndex = tasks.findIndex((item) => item.id === id);
  if (taskIndex === -1) {
    const error = new Error("Task not found");
    error.response = { status: 404, data: { message: "Task not found" } };
    throw error;
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  tasks[taskIndex] = updatedTask;
  saveTasksForUser(user.email, tasks);
  return { task: updatedTask };
}

export async function deleteTask(token, id) {
  const user = getSessionUser(token);
  if (!user) {
    const error = new Error("Not authenticated");
    error.response = { status: 401, data: { message: "Not authenticated" } };
    throw error;
  }

  const tasks = getTasksForUser(user.email);
  const next = tasks.filter((item) => item.id !== id);
  if (next.length === tasks.length) {
    const error = new Error("Task not found");
    error.response = { status: 404, data: { message: "Task not found" } };
    throw error;
  }

  saveTasksForUser(user.email, next);
  return { success: true };
}

export async function updateTaskStatus(token, id, status) {
  return updateTask(token, id, { status });
}
