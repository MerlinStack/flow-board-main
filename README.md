# 🌊 FlowBoard - High-Tier Task Management Dashboard

FlowBoard is a modern, production-grade task management engine built on top of a React/Vite ecosystem. Engineered with a design-first, minimalist dark-mode philosophy, it isolates core data orchestration layers into custom React contexts while utilizing strict asynchronous API interceptors for session authentication.

This document serves as the absolute technical source of truth for the workspace architecture.

---

## ✨ System Features

- 🔐 **Secure Session Auth** - Token-based authentication using Axios interceptors to inject Bearer tokens dynamically.
- 🎨 **Premium Minimalist UI** - High-tier glassmorphic styling conventions with strict layout alignment.
- 🌓 **Native Dark Mode** - Built using Tailwind's declarative utilities (`dark:bg-gray-800`) for fluid, native theme switching.
- 🔍 **Granular Query Filtering** - Global context-driven client search managing real-time filtering updates by title and status.
- 🧱 **Modular Architecture** - Complete isolation of presentation layouts from network services via functional context layers (`AuthContext`, `TaskContext`).

---

## 🛠️ Tech Stack & Allocation

| Layer Module | Technology Spectrum | Functional Mandate |
| **Frontend Core** | React 18.x / Vite v5.4.21 | Compiles performance-optimized visual layouts with Hot Module Replacement (HMR). |
| **Style Engine** | Tailwind CSS / PostCSS | Handles unified dark-theme variables using declarative layout matrices. |
| **Network Proxy** | Axios Instance Architecture | Executes asynchronous operations using structural runtime request/response loops. |
| **Routing Engine** | React Router DOM | Enforces application route isolation via functional navigation middleware. |

---

## 📋 Universal Workflow Architecture

The management board is engineered around fixed functional pipelines. To maximize development efficiency and minimize context switching, the following Work-in-Progress (WIP) limits are enforced across the core workflow stages:

1. **Architecture Core & Backlog**
   - **WIP Limit:** `Unlimited`
   - **Mandate:** Blueprint schemas, functional requirements, and contextual bounds before execution.
2. **Context & Engineering Configuration**
   - **WIP Limit:** `3 Tasks Max`
   - **Mandate:** Explicit construction of global state structures, component abstractions, and data schemas.
3. **Real-Time Execution Loops**
   - **WIP Limit:** `2 Tasks Per Module`
   - **Mandate:** Active implementation of dynamic state transitions, responsive components, and asynchronous side-effects.

---

## 📁 Authenticated Project Structure

The layout below represents the exact physical topology of the verified workspace. All code implementations must map cleanly into these designated boundaries:

```text
flowboard/
├── src/
│   ├── components/       # Reusable UI presentation components
│   │   ├── ConfirmDialog.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   ├── Filters.jsx   # Context-bound client search filter
│   │   ├── LoadingState.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── ThemeToggle.jsx
│   ├── contexts/         # React Context global state layers
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── hooks/            # Modular consumption hooks
│   ├── pages/            # High-level route views
│   │   ├── Dashboard.jsx # Visual Kanban Workspace Dashboard
│   │   ├── Login.jsx
│   │   └── Register.jsx  # System registration interface
│   ├── services/         # Modular HTTP Network Gateway
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── axios.js      # Interceptor layer & Base URL definition
│   │   ├── mockApi.js    # Local verification network stub
│   │   └── tasks.js
│   ├── utils/            # Shared utility algorithms
│   ├── App.jsx           # Master application container and router layout
│   ├── index.css         # Core Tailwind directives & global component styles
│   └── main.jsx          # Absolute client bootstrap entry point
├── public/               # Global static asset tracking
├── index.html            # Core Single Page Application HTML template wrapper
├── package.json          # Manifest metadata containing package rules and scripts
├── tailwind.config.js    # Custom style theme and breakdown limits
└── README.md             # Project documentation source
