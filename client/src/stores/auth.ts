import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { UserOut, APIResponse, TokenResponse } from '@/types'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserOut | null>(null)
  const token = ref<string>(localStorage.getItem('auth_token') || '')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)
  const userFullName = computed(() => user.value?.full_name || '')
  const userEmail = computed(() => user.value?.email || '')

  async function login(username: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const response = await api.post<any, { data: TokenResponse }>(
        '/alertchain/auth/login/',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      token.value = response.data.access_token
      localStorage.setItem('auth_token', token.value)

      // Fetch user data
      await fetchMe()
      return true
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(email: string, full_name: string, password: string) {
    isLoading.value = true
    error.value = null
    try {
      console.log('🔵 Attempting registration with:', { email, full_name })
      console.log('🔵 API Base URL:', import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000')
      
      const response = await api.post<APIResponse<UserOut>>('/alertchain/auth/register_user/', {
        email,
        full_name,
        password,
      })
      
      console.log('✅ Registration response:', response)
      return true
    } catch (err: any) {
      console.error('❌ Registration error:', err)
      console.error('❌ Error response:', err.response)
      console.error('❌ Error data:', err.response?.data)
      error.value = err.response?.data?.detail || err.message || 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function fetchMe() {
    try {
      const response = await api.get<APIResponse<UserOut>>('/alertchain/auth/me/')
      user.value = response.data.data
      return true
    } catch (err: any) {
      // Don't set error here to avoid showing error on every page load
      user.value = null
      return false
    }
  }

  async function logout() {
    try {
      await api.post('/alertchain/auth/logout/')
    } catch (err) {
      // Continue logout even if API call fails
    } finally {
      user.value = null
      token.value = ''
      localStorage.removeItem('auth_token')
    }
  }

  async function forgotPassword(email: string) {
    isLoading.value = true
    error.value = null
    try {
      await api.post<APIResponse<null>>('/alertchain/auth/forgot-password', {
        email,
      })
      return true
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to send reset email'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function resetPassword(new_password: string, token_str: string) {
    isLoading.value = true
    error.value = null
    try {
      await api.post<APIResponse<null>>('/alertchain/auth/reset-password', {
        new_password,
        token: token_str,
      })
      return true
    } catch (err: any) {
      error.value = err.response?.data?.detail || 'Failed to reset password'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userFullName,
    userEmail,
    login,
    register,
    logout,
    fetchMe,
    forgotPassword,
    resetPassword,
  }
})
