import { mockAuthAPI } from './mockApi'

// Change this to false when your real backend is ready
const USE_MOCK_API = true

export const authAPI = USE_MOCK_API ? mockAuthAPI : {
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password })
    return response.data
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
}