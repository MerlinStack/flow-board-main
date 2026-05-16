import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTasks } from '../contexts/TaskContext'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import Filters from '../components/Filters'
import EmptyState from '../components/EmptyState'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import ThemeToggle from '../components/ThemeToggle'

export default function Dashboard() {
  const { logout } = useAuth()
  const { tasks, loading, error, createTask, updateTask, loadTasks } = useTasks()
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const handleCreateTask = async (data) => {
    const success = await createTask(data)
    if (success) {
      setShowTaskForm(false)
    }
  }

  const handleUpdateTask = async (data) => {
    const success = await updateTask(editingTask.id, data)
    if (success) {
      setEditingTask(null)
      setShowTaskForm(false)
    }
  }

  const handleEdit = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  if (loading && tasks.length === 0) {
    return <LoadingState />
  }

  if (error && tasks.length === 0) {
    return <ErrorState message={error} onRetry={loadTasks} />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FlowBoard</h1>
            <div className="flex gap-3">
              <ThemeToggle />
              <button
                onClick={() => {
                  setEditingTask(null)
                  setShowTaskForm(true)
                }}
                className="btn-primary"
              >
                + New Task
              </button>
              <button onClick={logout} className="btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Filters />
          </div>

          {/* Task List */}
          <div className="lg:col-span-3">
            {showTaskForm && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <TaskForm
                  onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                  initialData={editingTask}
                  onCancel={() => {
                    setShowTaskForm(false)
                    setEditingTask(null)
                  }}
                />
              </div>
            )}

            {tasks.length === 0 && !showTaskForm ? (
              <EmptyState
                message="No tasks found. Create your first task to get started!"
                action={{
                  label: '+ Create Task',
                  onClick: () => setShowTaskForm(true),
                }}
              />
            ) : (
              <div className="space-y-4">
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => handleEdit(task)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}