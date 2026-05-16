import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ThemeToggle from '../components/ThemeToggle';
import { Plus, LogOut } from 'lucide-react';

export default function Dashboard() {
  const { logout } = useAuth();
  const { tasks, loading, error, createTask, updateTask, loadTasks } =
    useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateTask = async (data) => {
    const success = await createTask(data);
    if (success) {
      setShowTaskForm(false);
    }
  };

  const handleUpdateTask = async (data) => {
    const success = await updateTask(editingTask.id, data);
    if (success) {
      setEditingTask(null);
      setShowTaskForm(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Calculate task statistics
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  if (loading && tasks.length === 0) {
    return <LoadingState />;
  }

  if (error && tasks.length === 0) {
    return <ErrorState message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="card shadow-elevation-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/50">
                <div className="text-lg">📋</div>
              </div>
              <div>
                <h1 className="text-h3 font-bold text-gray-900 dark:text-white">
                  FlowBoard
                </h1>
                <p className="text-caption text-gray-500 dark:text-gray-400">
                  Manage your tasks efficiently
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">
              <ThemeToggle />
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">New Task</span>
              </button>
              <button
                onClick={logout}
                className="btn-secondary flex items-center gap-2"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      {tasks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="card p-4 text-center hover:shadow-elevation-4">
                <div className="text-h4 font-bold text-primary-600">
                  {stats.total}
                </div>
                <div className="text-caption text-gray-600 dark:text-gray-400 mt-1">
                  Total Tasks
                </div>
              </div>
              <div className="card p-4 text-center hover:shadow-elevation-4">
                <div className="text-h4 font-bold text-warning-600">
                  {stats.pending}
                </div>
                <div className="text-caption text-gray-600 dark:text-gray-400 mt-1">
                  Pending
                </div>
              </div>
              <div className="card p-4 text-center hover:shadow-elevation-4">
                <div className="text-h4 font-bold text-info-600">
                  {stats.inProgress}
                </div>
                <div className="text-caption text-gray-600 dark:text-gray-400 mt-1">
                  In Progress
                </div>
              </div>
              <div className="card p-4 text-center hover:shadow-elevation-4">
                <div className="text-h4 font-bold text-success-600">
                  {stats.completed}
                </div>
                <div className="text-caption text-gray-600 dark:text-gray-400 mt-1">
                  Completed
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* Sidebar */}
    <div className="lg:col-span-1">
      <div className="sticky top-24">
        <Filters />
      </div>
    </div>

    {/* Task List */}
    <div className="lg:col-span-3">
      {showTaskForm && (
        <div className="card shadow-elevation-4 p-6 mb-6 animate-slide-up">
          <h2 className={`
            flex justify-center text-h4 font-semibold mb-4 
            text-gray-900 dark:text-white
            transition-all duration-300
            hover:scale-105
            hover:[text-shadow:0_0_20px_rgba(59,130,246,0.5),0_0_30px_rgba(59,130,246,0.3)]
            dark:hover:[text-shadow:0_0_25px_rgba(59,130,246,0.7),0_0_35px_rgba(59,130,246,0.5)]
          `}>
            {editingTask ? '✏️ Edit Task' : '➕ Create Task'}
          </h2>
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            initialData={editingTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}

      {tasks.length === 0 && !showTaskForm ? (
        <EmptyState
          message="No tasks found. Create your first task to get started!"
          action={{
            label: '✨ Create Task',
            onClick: () => setShowTaskForm(true),
          }}
        />
      ) : (
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              style={{ '--delay': `${index * 50}ms` }}
              className="animate-slide-up"
            >
              <TaskCard task={task} onEdit={() => handleEdit(task)} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</main>
    </div>
  );
}
