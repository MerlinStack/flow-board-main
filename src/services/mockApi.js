// Mock API for frontend-only testing
const STORAGE_KEY = 'flowboard_tasks'
const USERS_KEY = 'flowboard_users'

// Initialize mock data - NO DUMMY TASKS!
const initMockData = () => {
  // Initialize default user if none exists
  if (!localStorage.getItem(USERS_KEY)) {
    const defaultUser = {
      id: '1',
      name: 'Demo User',
      email: 'demo@flowboard.com',
      password: 'Demo@1234'  // Strong password example
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultUser]))
  }
  
  // Initialize empty tasks array - NO SAMPLE TASKS!
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
  }
}

// Helper to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper to validate password strength
const isStrongPassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
};

// Mock auth functions
export const mockAuthAPI = {
  register: async (name, email, password) => {
    initMockData()
    
    // Validate email format
    if (!isValidEmail(email)) {
      throw { 
        response: { 
          data: { message: 'Please enter a valid email address' },
          status: 400
        } 
      }
    }
    
    // Validate password strength
    if (!isStrongPassword(password)) {
      throw { 
        response: { 
          data: { message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character' },
          status: 400
        } 
      }
    }
    
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      throw { 
        response: { 
          data: { message: 'User already exists' },
          status: 400
        } 
      }
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    }
    
    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    
    // Generate token
    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email, name: newUser.name }))
    const { password: _, ...userWithoutPassword } = newUser
    
    return { data: { token, user: userWithoutPassword } }
  },
  
  login: async (email, password) => {
    initMockData()
    
    // Validate email format
    if (!isValidEmail(email)) {
      throw { 
        response: { 
          data: { message: 'Please enter a valid email address' },
          status: 400
        } 
      }
    }
    
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
    
    // Generate token
    const token = btoa(JSON.stringify({ id: user.id, email: user.email, name: user.name }))
    const { password: _, ...userWithoutPassword } = user
    
    return { data: { token, user: userWithoutPassword } }
  },
  
  logout: async () => {
    return { data: { success: true } }
  }
}

// Mock tasks functions
export const mockTasksAPI = {
  getAll: async () => {
    initMockData()
    const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return { data: { tasks } }
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