<template>
  <div class="max-w-4xl mx-auto space-y-6 animate-fade-in">
    <!-- Back Button at Top -->
    <div>
      <button
        @click="router.push('/notifications')"
        class="group/back p-2.5 sm:p-3 bg-card/80 backdrop-blur-xl border-2 border-border/50 rounded-xl hover:bg-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
        title="Back to Notifications"
      >
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover/back:text-primary group-hover/back:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
    
    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-6">
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 animate-pulse">
        <div class="h-8 bg-secondary rounded w-3/4 mb-4" />
        <div class="h-4 bg-secondary rounded w-1/2 mb-8" />
        <div class="space-y-3">
          <div class="h-4 bg-secondary rounded w-full" />
          <div class="h-4 bg-secondary rounded w-5/6" />
          <div class="h-4 bg-secondary rounded w-2/3" />
        </div>
      </div>
    </div>

    <!-- Notification Detail -->
    <div v-else-if="notification" class="space-y-6">
      <!-- Header Card -->
      <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl">
        <!-- Background Effects -->
        <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div class="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div class="relative z-10 p-6 sm:p-8 lg:p-10">
          <!-- Status Badge & Actions -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <!-- Status Icon -->
              <div :class="[
                'w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl',
                notification.status === 'FAILED' ? 'bg-gradient-to-br from-destructive to-destructive/80 shadow-destructive/30' :
                notification.status === 'SENT' ? 'bg-gradient-to-br from-primary to-accent shadow-primary/30' :
                'bg-gradient-to-br from-secondary to-secondary/80 shadow-secondary/30'
              ]">
                <svg v-if="notification.status === 'FAILED'" class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <svg v-else-if="notification.status === 'SENT'" class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
                <svg v-else class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div>
                <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Notification Details
                </h1>
                <p class="text-xs sm:text-sm text-muted-foreground mt-1">
                  {{ formatDate(notification.created_at) }}
                </p>
              </div>
            </div>

            <!-- Three Dot Menu -->
            <div class="relative" ref="menuRef">
              <button 
                @click.stop="toggleMenu"
                class="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <svg class="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div 
                v-if="showMenu"
                class="absolute right-0 mt-2 w-48 bg-card border-2 border-border shadow-2xl animate-scale-in rounded-xl overflow-hidden z-50"
              >
                <button
                  v-if="!notification.is_read"
                  @click="handleMarkAsRead"
                  class="w-full px-4 py-3 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3"
                >
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Read
                </button>
                <button
                  @click="handleDelete"
                  class="w-full px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-3"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Read/Unread Badge -->
          <div class="flex items-center gap-2 mb-6">
            <span 
              v-if="notification.is_read"
              class="px-3 py-1 text-xs font-semibold rounded-full bg-secondary text-muted-foreground border border-border/30"
            >
              Read
            </span>
            <span 
              v-else
              class="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30 animate-pulse"
            >
              Unread
            </span>
            
            <span 
              :class="[
                'px-3 py-1 text-xs font-semibold rounded-full border',
                notification.status === 'FAILED' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                notification.status === 'SENT' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' :
                'bg-secondary text-muted-foreground border-border/30'
              ]"
            >
              {{ notification.status }}
            </span>
          </div>

          <!-- Message -->
          <div class="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 sm:p-8 mb-6">
            <h2 class="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Message</h2>
            <p class="text-base sm:text-lg lg:text-xl font-medium text-foreground leading-relaxed">
              {{ notification.message }}
            </p>
          </div>

          <!-- Metadata Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Created At -->
            <div class="bg-secondary/20 backdrop-blur-sm border border-border/50 rounded-xl p-5">
              <div class="flex items-center gap-3 mb-2">
                <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Created</h3>
              </div>
              <p class="text-base font-semibold text-foreground">
                {{ formatFullDate(notification.created_at) }}
              </p>
            </div>

            <!-- Alert Rule ID -->
            <div class="bg-secondary/20 backdrop-blur-sm border border-border/50 rounded-xl p-5">
              <div class="flex items-center gap-3 mb-2">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Alert Rule ID</h3>
              </div>
              <p class="text-sm font-mono font-semibold text-foreground truncate">
                {{ notification.alert_rule_id }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found -->
    <EmptyState
      v-else
      title="Notification Not Found"
      description="The notification you're looking for doesn't exist or has been deleted"
      action-label="Back to Notifications"
      @action="router.push('/notifications')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'
import type { NotificationOut } from '@/types'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const notification = ref<NotificationOut | null>(null)
const isLoading = ref(false)
const showMenu = ref(false)
const menuRef = ref<HTMLElement | null>(null)

async function fetchNotification() {
  const notificationId = route.params.id as string
  if (!notificationId) {
    router.push('/notifications')
    return
  }

  isLoading.value = true
  try {
    const response = await api.get(`/alertchain/notifications/${notificationId}`)
    notification.value = response.data.data || response.data
    
    // Auto-mark as read if unread
    if (notification.value && !notification.value.is_read) {
      await notificationsStore.markAsRead(notification.value.id)
      notification.value.is_read = true
    }
  } catch (err: any) {
    console.error('❌ Error fetching notification:', err)
    toast({
      title: 'Error',
      description: 'Failed to load notification details',
      variant: 'destructive',
    })
  } finally {
    isLoading.value = false
  }
}

function toggleMenu() {
  showMenu.value = !showMenu.value
}

async function handleMarkAsRead() {
  if (!notification.value || notification.value.is_read) return
  
  const success = await notificationsStore.markAsRead(notification.value.id)
  if (success) {
    notification.value.is_read = true
    toast({
      title: 'Success',
      description: 'Notification marked as read',
      variant: 'success',
    })
  }
  showMenu.value = false
}

async function handleDelete() {
  if (!notification.value) return
  
  if (!confirm('Are you sure you want to delete this notification?')) return
  
  const success = await notificationsStore.deleteNotification(notification.value.id)
  if (success) {
    toast({
      title: 'Deleted',
      description: 'Notification deleted successfully',
      variant: 'success',
    })
    router.push('/notifications')
  }
  showMenu.value = false
}

function formatDate(dateString: string | null): string {
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

function formatFullDate(dateString: string | null): string {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function handleClickOutside(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as HTMLElement)) {
    showMenu.value = false
  }
}

onMounted(() => {
  fetchNotification()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
