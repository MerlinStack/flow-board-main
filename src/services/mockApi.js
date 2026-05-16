// Mock API for frontend-only testing
const STORAGE_KEY = 'flowboard_tasks'
const USERS_KEY = 'flowboard_users'

// Initialize mock data
const initMockData = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUser = {
      id: '1',
      email: 'demo@example.com',
      password: 'demo123'
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultUser]))
  }
  
  if (!localStorage.getItem(STORAGE_KEY)) {
    // Add some sample tasks
    const sampleTasks = [
      {
        id: '1',
        title: 'Welcome to FlowBoard!',
        description: 'This is a sample task. Try creating, editing, and deleting tasks.',
        priority: 'high',
        status: 'pending',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Try filtering tasks',
        description: 'Use the filters in the sidebar to sort by status and priority',
        priority: 'medium',
        status: 'in-progress',
        dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Mark me as complete',
        description: 'Click the Complete button to change my status',
        priority: 'low',
        status: 'pending',
        dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleTasks))
  }
}

// Mock auth functions
export const mockAuthAPI = {
  register: async (email, password) => {
    initMockData()
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    
    if (users.find(u => u.email === email)) {
      throw { 
        response: { 
          data: { message: 'User already exists' },
          status: 400
        } 
      }
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password
    }
    
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    
    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }))
    const { password: _, ...userWithoutPassword } = newUser
    
    return { data: { token, user: userWithoutPassword } }
  },
  
  login: async (email, password) => {
    initMockData()
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw { 
        response: { 
          data: { message: 'Invalid email or password' },
          status: 401
        } 
      }
    }
    
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    const { password: _, ...userWithoutPassword } = user
    
    return { data: { token, user: userWithoutPassword } }
  }
}

// Mock tasks functions
export const mockTasksAPI = {
  getAll: async () => {
    initMockData()
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return { data: { tasks } } // Return in expected format
  },
  
  create: async (taskData) => {
    initMockData()
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return { data: { task: newTask } }
  },
  
  update: async (id, taskData) => {
    initMockData()
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const index = tasks.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData, updatedAt: new Date().toISOString() }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
      return { data: { task: tasks[index] } }
    }
    throw { 
      response: { 
        data: { message: 'Task not found' },
        status: 404
      } 
    }
  },
  
  delete: async (id) => {
    initMockData()
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const filtered = tasks.filter(t => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return { data: { success: true } }
  }
}