/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

app.use(express.json());
app.use(cors());

// In-memory storage (replace with database in production)
const users = [
  {
    id: 1,
    email: "demo@flowboard.com",
    password: "password123", // Should be hashed in production
  },
];

const tasks = [
  {
    id: 1,
    userId: 1,
    title: "Finish API layer",
    description: "Complete the REST API implementation",
    priority: "high",
    status: "pending",
    dueDate: "2026-05-20",
  },
  {
    id: 2,
    userId: 1,
    title: "Design dashboard UI",
    description: "Create mockups and finalize design",
    priority: "medium",
    status: "completed",
    dueDate: "2026-05-18",
  },
];

let nextTaskId = 3;

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const user = {
    id: users.length + 1,
    email,
    password,
  };
  users.push(user);

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({ token, user: { id: user.id, email: user.email } });
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, user: { id: user.id, email: user.email } });
});

app.get("/auth/me", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ id: user.id, email: user.email });
});

// Task Routes
app.get("/tasks", authenticateToken, (req, res) => {
  const { status } = req.query;
  let userTasks = tasks.filter((t) => t.userId === req.user.id);

  if (status) {
    userTasks = userTasks.filter((t) => t.status === status);
  }

  res.json(userTasks);
});

app.get("/tasks/:id", authenticateToken, (req, res) => {
  const task = tasks.find(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id,
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

app.post("/tasks", authenticateToken, (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = {
    id: nextTaskId++,
    userId: req.user.id,
    title,
    description: description || "",
    priority: priority || "medium",
    status: "pending",
    dueDate: dueDate || "",
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/tasks/:id", authenticateToken, (req, res) => {
  const task = tasks.find(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id,
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);
  res.json(task);
});

app.patch("/tasks/:id/status", authenticateToken, (req, res) => {
  const { status } = req.body;
  const task = tasks.find(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id,
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  res.json(task);
});

app.delete("/tasks/:id", authenticateToken, (req, res) => {
  const index = tasks.findIndex(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.id,
  );

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 FlowBoard API running on http://localhost:${PORT}`);
  console.log(`Test credentials: demo@flowboard.com / password123`);
});
