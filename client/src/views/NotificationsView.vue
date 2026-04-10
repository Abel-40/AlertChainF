<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">Notifications</h1>
        <p class="text-muted-foreground">{{ notificationsStore.unreadCount }} unread notifications</p>
      </div>
      <div class="flex gap-3">
        <button
          v-if="notificationsStore.unreadCount > 0"
          @click="markAllAsRead"
          class="btn btn-outline flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Mark All Read
        </button>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
      <!-- Loading -->
      <div v-if="notificationsStore.isLoading" class="p-6">
        <div class="space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-start gap-4 animate-pulse">
            <div class="w-10 h-10 rounded-full bg-secondary" />
            <div class="flex-1">
              <div class="h-5 bg-secondary rounded w-3/4 mb-2" />
              <div class="h-4 bg-secondary rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else-if="notificationsStore.notifications.length === 0"
        title="No notifications"
        description="Your notifications will appear here when alerts are triggered"
      />

      <!-- Notifications -->
      <div v-else class="divide-y divide-border">
        <div
          v-for="notification in notificationsStore.notifications"
          :key="notification.id"
          :class="[
            'p-6 transition-all duration-200',
            !notification.is_read ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-secondary/30'
          ]"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-4 flex-1">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                !notification.is_read ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
              ]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
              <div class="flex-1">
                <p :class="['font-medium', !notification.is_read ? 'text-foreground' : 'text-muted-foreground']">
                  {{ notification.message }}
                </p>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ formatDate(notification.created_at) }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="!notification.is_read" class="badge badge-primary">Unread</span>
              <button
                v-if="!notification.is_read"
                @click="markAsRead(notification.id)"
                class="p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Mark as read"
              >
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                @click="deleteNotification(notification.id)"
                class="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                title="Delete"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'

const notificationsStore = useNotificationsStore()
const { toast } = useToast()

function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  if (hours < 168) return `${Math.floor(hours / 24)}d ago`
  return date.toLocaleDateString()
}

async function markAsRead(notificationId: string) {
  const success = await notificationsStore.markAsRead(notificationId)
  if (success) {
    toast({ title: 'Success', description: 'Notification marked as read', variant: 'success' })
  }
}

async function markAllAsRead() {
  const success = await notificationsStore.markAllAsRead()
  if (success) {
    toast({ title: 'Success', description: 'All notifications marked as read', variant: 'success' })
  }
}

async function deleteNotification(notificationId: string) {
  if (!confirm('Delete this notification?')) return
  const success = await notificationsStore.deleteNotification(notificationId)
  if (success) {
    toast({ title: 'Deleted', description: 'Notification deleted', variant: 'success' })
  }
}

onMounted(async () => {
  await notificationsStore.fetchNotifications()
})
</script>
