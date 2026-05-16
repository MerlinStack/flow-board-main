import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Filters from '../components/Filters';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import ThemeToggle from '../components/ThemeToggle';
import { Plus, LogOut, LayoutGrid, List, BarChart3, TrendingUp, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { tasks, loading, error, createTask, updateTask, loadTasks } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [greeting, setGreeting] = useState('');

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

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

  // Calculate completion rate
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  // Get upcoming tasks (due within 3 days)
  const upcomingTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  }).length;

  // Get overdue tasks
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today;
  }).length;

  if (loading && tasks.length === 0) {
    return <LoadingState />;
  }

  if (error && tasks.length === 0) {
    return <ErrorState message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                <div className="text-xl">📋</div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  FlowBoard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {greeting}, {user?.name || 'User'}! 👋
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 items-center">
              {/* View Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mr-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="List view"
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-600 shadow-sm text-primary-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
              
              <ThemeToggle />
              <button
                onClick={() => {
                  setEditingTask(null);
                  setShowTaskForm(true);
                }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">New Task</span>
              </button>
              <button
                onClick={logout}
                className="btn-secondary flex items-center gap-2 px-3 sm:px-4 py-2"
                title="Logout"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section - Only show if tasks exist */}
      {tasks.length > 0 && (
        <div className="bg-white/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Welcome Message */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {greeting}, {user?.name?.split(' ')[0] || 'there'}! 
                <span className="text-primary-500"> ✨</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                You have {stats.pending + stats.inProgress} active tasks. Let's make progress today!
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Pending</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.inProgress}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">In Progress</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Completed</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{completionRate}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Complete</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{upcomingTasks}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Upcoming</div>
              </div>
            </div>

            {/* Alerts for overdue/upcoming */}
            {overdueTasks > 0 && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle size={18} className="text-red-500" />
                <span className="text-sm text-red-700 dark:text-red-300">
                  You have {overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}! Please update them.
                </span>
              </div>
            )}
            {upcomingTasks > 0 && overdueTasks === 0 && (
              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-center gap-2">
                <Calendar size={18} className="text-blue-500" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  You have {upcomingTasks} task{upcomingTasks > 1 ? 's' : ''} due soon!
                </span>
              </div>
            )}
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-slide-up border border-gray-200 dark:border-gray-700">
                <h2 className={`
                  flex justify-center text-xl font-semibold mb-4 
                  text-gray-900 dark:text-white
                  transition-all duration-300
                  hover:scale-105
                  hover:[text-shadow:0_0_20px_rgba(59,130,246,0.5),0_0_30px_rgba(59,130,246,0.3)]
                  dark:hover:[text-shadow:0_0_25px_rgba(59,130,246,0.7),0_0_35px_rgba(59,130,246,0.5)]
                `}>
                  {editingTask ? '✏️ Edit Task' : '➕ Create New Task'}
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
                message="✨ Your task board is empty! Create your first task to get started."
                action={{
                  label: '➕ Create Your First Task',
                  onClick: () => setShowTaskForm(true),
                }}
              />
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
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