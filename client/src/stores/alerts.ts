import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AlertOut, CreateAlert } from '@/types'
import api from '@/services/api'

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<AlertOut[]>([])
  const currentAlert = ref<AlertOut | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const activeAlerts = computed(() => alerts.value.filter((a) => a.is_active))
  const inactiveAlerts = computed(() => alerts.value.filter((a) => !a.is_active))

  async function fetchAlerts() {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get('/alertchain/alert/')
      // Backend returns APIResponse<T> { status_code, message, data: T }
      alerts.value = response.data.data || response.data
      console.log('🔔 Alerts fetched:', alerts.value)
    } catch (err: any) {
      console.error('❌ Error fetching alerts:', err)
      error.value = err.response?.data?.detail || 'Failed to fetch alerts'
    } finally {
      isLoading.value = false
    }
  }

  async function createAlert(alertData: CreateAlert) {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.post('/alertchain/alert/create/', alertData)
      const newAlert = response.data.data || response.data
      alerts.value.push(newAlert)
      console.log('✅ Alert created:', newAlert)
      return true
    } catch (err: any) {
      console.error('❌ Error creating alert:', err)
      error.value = err.response?.data?.detail || 'Failed to create alert'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function toggleAlert(alertId: string) {
    try {
      const response = await api.patch(
        `/alertchain/alert/${alertId}/toggle`,
        {}
      )
      const updatedAlert = response.data.data || response.data
      const index = alerts.value.findIndex((a) => a.id === alertId)
      if (index !== -1) {
        alerts.value[index] = updatedAlert
      }
      console.log('🔄 Alert toggled:', updatedAlert)
      return true
    } catch (err: any) {
      console.error('❌ Error toggling alert:', err)
      error.value = err.response?.data?.detail || 'Failed to toggle alert'
      return false
    }
  }

  async function deleteAlert(alertId: string) {
    try {
      await api.delete(`/alertchain/alert/${alertId}`)
      alerts.value = alerts.value.filter((a) => a.id !== alertId)
      console.log('🗑️ Alert deleted:', alertId)
      return true
    } catch (err: any) {
      console.error('❌ Error deleting alert:', err)
      error.value = err.response?.data?.detail || 'Failed to delete alert'
      return false
    }
  }

  async function bulkDeleteAlerts(alertIds: string[]) {
    try {
      await api.delete('/alertchain/alert/bulk/', {
        data: { alert_ids: alertIds },
      })
      alerts.value = alerts.value.filter((a) => !alertIds.includes(a.id))
      return true
    } catch (err: any) {
      error.value = 'Failed to delete alerts'
      return false
    }
  }

  return {
    alerts,
    currentAlert,
    isLoading,
    error,
    activeAlerts,
    inactiveAlerts,
    fetchAlerts,
    createAlert,
    toggleAlert,
    deleteAlert,
    bulkDeleteAlerts,
  }
})
