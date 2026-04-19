import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const authStore = useAuthStore()
    const { toast } = useToast()

    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      authStore.logout()
      window.location.href = '/login'
      toast({
        title: 'Session Expired',
        description: 'Please login again.',
        variant: 'destructive',
      })
    } else if (error.response?.status === 403) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to perform this action.',
        variant: 'destructive',
      })
    } else if (error.response?.status === 429) {
      // Rate limit exceeded
      toast({
        title: 'Too Many Requests',
        description: 'Please wait a moment and try again.',
        variant: 'destructive',
      })
    } else if (error.response?.status === 500) {
      toast({
        title: 'Server Error',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      })
    }

    return Promise.reject(error)
  }
)

export default api
