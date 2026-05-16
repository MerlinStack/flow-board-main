import { useState } from 'react'
import { format } from 'date-fns'
import { useTasks } from '../contexts/TaskContext'
import ConfirmDialog from './ConfirmDialog'

const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  completed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

export default function TaskCard({ task, onEdit }) {
  const { updateTask, deleteTask } = useTasks()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const isCompleted = task.status === 'completed'

  const handleStatusChange = async (newStatus) => {
    await updateTask(task.id, { ...task, status: newStatus })
  }

  const handleDelete = async () => {
    await deleteTask(task.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow ${isCompleted ? 'opacity-75' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-lg text-gray-900 dark:text-white ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
            {task.title}
          </h3>
          <div className="flex gap-2">
            {!isCompleted && (
              <button
                onClick={onEdit}
                className="text-gray-500 hover:text-primary-500 dark:text-gray-400"
                title="Edit task"
              >
                ✏️
              </button>
            )}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </div>
        
        {task.description && (
          <p className={`text-gray-600 dark:text-gray-300 text-sm mb-3 ${isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
            {task.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
        
        {task.dueDate && (
          <div className={`text-xs mb-3 ${isCompleted ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        )}
        
        <div className="flex gap-2">
          {!isCompleted ? (
            <>
              {task.status === 'pending' && (
                <button
                  onClick={() => handleStatusChange('in-progress')}
                  className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Start
                </button>
              )}
              {task.status === 'in-progress' && (
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="text-sm px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => handleStatusChange('pending')}
                className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </>
          ) : (
            <button
              onClick={() => handleStatusChange('pending')}
              className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Reopen Task
            </button>
          )}
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      />
    </>
  )
}