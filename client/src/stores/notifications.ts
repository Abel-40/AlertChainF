import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { NotificationOut } from '@/types'
import api from '@/services/api'

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<NotificationOut[]>([])
  const unreadCount = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const unreadNotifications = computed(() =>
    notifications.value.filter((n) => !n.is_read)
  )

  async function fetchNotifications() {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get('/alertchain/notifications/')
      // Backend returns APIResponse<T> { status_code, message, data: T }
      notifications.value = response.data.data || response.data
      console.log('📬 Notifications fetched:', notifications.value)
    } catch (err: any) {
      console.error('❌ Error fetching notifications:', err)
      error.value = err.response?.data?.detail || 'Failed to fetch notifications'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUnreadCount() {
    try {
      const response = await api.get('/alertchain/notifications/unread-count')
      unreadCount.value = response.data.data?.unread_count || response.data.unread_count || 0
      console.log('🔔 Unread count:', unreadCount.value)
    } catch (err: any) {
      console.error('❌ Error fetching unread count:', err)
      error.value = 'Failed to fetch unread count'
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      await api.patch(`/alertchain/notifications/${notificationId}/read`, {})
      const notification = notifications.value.find((n) => n.id === notificationId)
      if (notification) {
        notification.is_read = true
      }
      await fetchUnreadCount()
      return true
    } catch (err: any) {
      error.value = 'Failed to mark notification as read'
      return false
    }
  }

  async function markAllAsRead() {
    try {
      await api.patch('/alertchain/notifications/read-all', {})
      notifications.value.forEach((n) => {
        n.is_read = true
      })
      unreadCount.value = 0
      return true
    } catch (err: any) {
      error.value = 'Failed to mark all notifications as read'
      return false
    }
  }

  async function bulkMarkAsRead(notificationIds: string[]) {
    try {
      await api.patch('/alertchain/notifications/bulk/read', {
        notification_ids: notificationIds,
      })
      notifications.value.forEach((n) => {
        if (notificationIds.includes(n.id)) {
          n.is_read = true
        }
      })
      await fetchUnreadCount()
      return true
    } catch (err: any) {
      error.value = 'Failed to mark notifications as read'
      return false
    }
  }

  async function deleteNotification(notificationId: string) {
    try {
      await api.delete(`/alertchain/notifications/${notificationId}`)
      notifications.value = notifications.value.filter(
        (n) => n.id !== notificationId
      )
      await fetchUnreadCount()
      return true
    } catch (err: any) {
      error.value = 'Failed to delete notification'
      return false
    }
  }

  async function bulkDeleteNotifications(notificationIds: string[]) {
    try {
      await api.delete('/alertchain/notifications/bulk/', {
        data: { notification_ids: notificationIds },
      })
      notifications.value = notifications.value.filter(
        (n) => !notificationIds.includes(n.id)
      )
      await fetchUnreadCount()
      return true
    } catch (err: any) {
      error.value = 'Failed to delete notifications'
      return false
    }
  }

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    unreadNotifications,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    bulkMarkAsRead,
    deleteNotification,
    bulkDeleteNotifications,
  }
})
