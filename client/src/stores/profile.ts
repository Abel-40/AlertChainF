import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UserProfile, UserProfileUpdate, APIResponse } from '@/types'
import api from '@/services/api'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProfile() {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get<APIResponse<UserProfile>>('/alertchain/profile/')
      profile.value = response.data.data
      return true
    } catch (err: any) {
      console.error('❌ Error fetching profile:', err)
      error.value = err.response?.data?.detail || 'Failed to fetch profile'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(profileData: UserProfileUpdate) {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.patch<APIResponse<UserProfile>>('/alertchain/profile/', profileData)
      profile.value = response.data.data
      return true
    } catch (err: any) {
      console.error('❌ Error updating profile:', err)
      error.value = err.response?.data?.detail || 'Failed to update profile'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  }
})
