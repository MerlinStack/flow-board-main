# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## What

Created the centralized API service layer including the core fetch wrapper, global authentication routing, and complete task management endpoints.

## Why

This provides the entire frontend team with structured, reusable, and secure methods to interact with the backend API without writing direct fetch requests in UI componen1ts.

## How to test

1. Pull this branch `git fetch && git switch feat/api-services`
2. Ensure you have your `.env` file set up with `VITE_API_BASE_URL`
3. Inspect `src/services/` to verify `api.js`, `auth.js`, and `task.js` files are intact and properly exported.

## Screenshots / Loom

N/A (Backend Service Layer Only)

## Checklist

- [x] Works on mobile (375px) and desktop
- [x] No hardcoded API URLs (uses env var)
- [x] No commented-out code

### Installation

1. **Clone and navigate to the project:**

```bash
cd flow-board-main
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file** (if not already present):

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```
VITE_API_BASE_URL=http://localhost:5000
```

### Running the Application

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Start the backend server:**

```bash
npm run server
```

The server will run on `http://localhost:5000`

**Terminal 2 - Start the frontend (Vite dev server):**

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

#### Option 2: Run Both Together

```bash
npm run dev:full
```

This runs both the backend and frontend concurrently (requires `concurrently` to be installed).

### Demo Credentials

- **Email:** `demo@flowboard.com`
- **Password:** `password123`

Or create a new account during registration.

## 📖 How to Use

### 1. **Login/Register**

- Go to `/login`
- Enter your email and password
- Click "Sign In" or toggle to "Create Account"

### 2. **View Tasks**

- After login, you'll see the Dashboard
- All your tasks are displayed in a grid

### 3. **Create a Task**

- Click the "+ New Task" button
- Fill in the task details:
  - **Title** (required)
  - **Description** (optional)
  - **Priority** (Low, Medium, High)
  - **Due Date** (optional)
- Click "Save Task"

### 4. **Manage Tasks**

- **Mark Complete:** Click the "Complete" button to mark as done
- **Reopen:** Click "Reopen" to mark as pending again
- **Delete:** Click the trash icon to remove a task

### 5. **Filter Tasks**

- Use the tabs: "All", "Pending", "Completed"
- View filtered tasks based on status

### 6. **Toggle Theme**

- Click the theme toggle icon (sun/moon) in the header
- Switch between light and dark modes

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start Vite dev server (frontend only)
npm run server          # Start Express backend server
npm run dev:full        # Run backend and frontend together

# Production
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Check code quality

# Utilities
npm run lint            # Check code quality
```

## 🔐 Authentication Flow

1. User submits login/register credentials
2. Backend validates and creates JWT token
3. Token is stored in `localStorage`
4. All API requests include token in `Authorization: Bearer <token>` header
5. Backend validates token on each request
6. If token expires (7 days), user is logged out automatically

## 📡 API Endpoints

### Authentication

- `POST /auth/register` - Create new account
- `POST /auth/login` - Login with credentials
- `GET /auth/me` - Get current user info (requires auth)

### Tasks

- `GET /tasks` - Get all tasks (with optional status filter)
- `GET /tasks/:id` - Get single task
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task details
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete task

## 🎨 Tech Stack

**Frontend:**

- React 19
- Vite (build tool)
- React Router DOM (routing)
- Tailwind CSS (styling)
- Axios/Fetch (HTTP client)

**Backend:**

- Node.js
- Express (server)
- JWT (authentication)
- CORS (cross-origin support)

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

On the backend (server.js), you can also set:

```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
```

## 🔄 Data Storage

Currently, the backend uses **in-memory storage** (arrays). This means:

- Data is lost when the server restarts
- Not suitable for production

For production, replace with a real database like:

- PostgreSQL
- MongoDB
- MySQL

## 🐛 Troubleshooting

### "Cannot connect to API"

- Ensure backend server is running: `npm run server`
- Check `.env.local` has correct `VITE_API_BASE_URL`
- Verify the port is not blocked

### "Token is undefined"

- Login again to refresh the token
- Check browser's `localStorage` for 'token' key
- Clear browser cache and try again

### "Tasks not loading"

- Make sure you're logged in (token in localStorage)
- Check network tab in browser DevTools
- Verify backend is responding: `curl http://localhost:5000/health`

## 🚀 Deployment

### Backend (Express)

Host on platforms like:

- Heroku
- Railway
- Render
- AWS EC2

### Frontend (React/Vite)

Build and deploy to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Remember to update `.env` with production API URL!

## 📝 License

MIT License - Feel free to use this project for learning and development.

---

**Happy task managing! 🎉**
