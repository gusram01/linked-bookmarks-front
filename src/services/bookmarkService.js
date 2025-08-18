import axios from 'axios'
import { useAuth } from '@clerk/vue'

const API_BASE_URL = import.meta.env.VITE_WEB_API_BASE_URL || 'http://localhost:8000'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth interceptor
api.interceptors.request.use(async (config) => {
  const { getToken } = useAuth()
  const token = await getToken()
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
)

const getErrorMessage = (error) => {
  if (!error.response) {
    return 'Unable to connect to API server'
  }
  
  switch (error.response.status) {
    case 400:
      return 'Invalid request data'
    case 401:
      return 'Authentication required'
    case 403:
      return 'You don\'t have permission to perform this action'
    case 404:
      return 'Resource not found'
    case 409:
      return 'Bookmark already exists'
    default:
      return 'An unexpected error occurred'
  }
}

export const bookmarkService = {
  async getAll() {
    const response = await api.get('/api/links')
    return response.data.data || []
  },

  async getById(id) {
    const response = await api.get(`/api/links/${id}`)
    return response.data.data
  },

  async create(bookmarkData) {
    const response = await api.post('/api/links', bookmarkData)
    return response.data.data
  },

  async update(id, bookmarkData) {
    const response = await api.put(`/api/links/${id}`, bookmarkData)
    return response.data.data
  },

  async delete(id) {
    await api.delete(`/api/links/${id}`)
  }
}