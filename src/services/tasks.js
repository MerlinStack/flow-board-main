import api from './api'
import { mockTasksAPI } from './mockApi'

// Change this to false when your real backend is ready
const USE_MOCK_API = true

// Main tasksAPI export
export const tasksAPI = USE_MOCK_API ? mockTasksAPI : {
  getAll: async () => {
    const response = await api.get('/tasks')
    return response
  },
  create: async (taskData) => {
    const response = await api.post('/tasks', taskData)
    return response
  },
  update: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData)
    return response
  },
  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`)
    return response
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/tasks/${id}/status`, { status })
    return response
  }
}

// Alias for compatibility with different imports
export const taskService = tasksAPI

// Default export for convenience
export default tasksAPI