# 🌊 FlowBoard - Task Management Dashboard

FlowBoard is a modern, feature-rich task management application designed to help individuals and teams organize their workflow efficiently. With a beautiful UI, real-time updates, and intuitive task management features, FlowBoard makes productivity enjoyable.

## ✨ Features

- 🔐 **Authentication System** - Secure login and registration
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 🌓 **Dark/Light Mode** - Theme toggle for comfortable viewing
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🔔 **Notifications** - Real-time task reminders and alerts
- 🎯 **Priority Levels** - Categorize tasks by priority (High, Medium, Low)
- 🔍 **Search & Filter** - Find tasks quickly with advanced filtering
- 💾 **Local Storage** - Persist data across sessions

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS** | Styling and animations |
| **React Router** | Navigation and routing |
| **React Icons** | Icon library |
| **Framer Motion** | Animations |
| **Axios** | API requests |
| **JSON Server** | Mock backend (development) |

## 📁 Project Structure

flowboard/
├── src/
│ ├── api/ # API service layer
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable UI components
│ │ ├── ConfirmDialog.jsx
│ │ ├── EmptyState.jsx
│ │ ├── ErrorState.jsx
│ │ ├── Filters.jsx
│ │ ├── LoadingState.jsx
│ │ ├── PrivateRoute.jsx
│ │ ├── TaskCard.jsx
│ │ ├── TaskForm.jsx
│ │ └── ThemeToggle.jsx
│ ├── contexts/ # React Context providers
│ │ ├── AuthContext.jsx
│ │ └── TaskContext.jsx
│ ├── hooks/ # Custom React hooks
│ │ ├── useLocalStorage.js
│ │ └── useNotifications.js
│ ├── pages/ # Page components
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── utils/ # Helper functions
│ │ ├── dateHelpers.js
│ │ └── priorityColors.js
│ ├── App.jsx # Main app component
│ ├── index.css # Global styles + Tailwind
│ └── main.jsx # App entry point
├── public/ # Static assets
├── db.json # Mock database (JSON Server)
├── server.js # JSON Server configuration
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── tailwind.config.js # Tailwind CSS config
├── postcss.config.js # PostCSS config
└── README.md # Project documentation