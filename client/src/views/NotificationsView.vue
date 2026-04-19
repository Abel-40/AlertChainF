<template>
  <div class="space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Notification center"
      title="Notifications"
      description="Review triggered alerts, clean up noise, and triage unread events with bulk actions."
    >
      <template #actions>
        <button v-if="notificationsStore.unreadCount > 0" type="button" class="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95" @click="markAllAsRead">
          Mark all read
        </button>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <MetricCard label="Total notifications" :value="notificationsStore.notifications.length" hint="All alert messages" :icon="BellRing" />
      <MetricCard label="Unread" :value="notificationsStore.unreadCount" hint="Needs review" :icon="MailOpen" tone="warning" />
      <MetricCard label="Selected" :value="selectedNotifications.length" hint="Bulk actions ready" :icon="CheckCheck" tone="success" />
    </div>

    <SectionCard title="Queue controls" description="Select individual rows or operate on the whole list.">
      <div class="flex flex-wrap items-center gap-3">
        <button type="button" class="rounded-2xl px-4 py-2.5 text-sm font-semibold transition" :class="isAllSelected ? 'bg-primary text-primary-foreground' : 'bg-background/60 text-muted-foreground hover:text-foreground'" @click="toggleSelectAll">
          {{ isAllSelected ? 'Clear selection' : 'Select all' }}
        </button>
        <button v-if="selectedNotifications.length > 0" type="button" class="rounded-2xl bg-destructive/10 px-4 py-2.5 text-sm font-semibold text-destructive transition hover:bg-destructive/15" @click="bulkDeleteSelected">
          Delete selected
        </button>
      </div>
    </SectionCard>

    <SectionCard title="Inbox" description="Everything your alert engine has generated so far.">
      <div v-if="notificationsStore.isLoading" class="space-y-3">
        <div v-for="index in 6" :key="index" class="h-24 animate-pulse rounded-[1.5rem] bg-secondary/70" />
      </div>

      <EmptyState v-else-if="notificationsStore.notifications.length === 0" title="No notifications yet" description="Triggered alerts and delivery updates will appear here." />

      <div v-else class="space-y-3">
        <article
          v-for="notification in notificationsStore.notifications"
          :key="notification.id"
          class="rounded-[1.5rem] border p-4 transition"
          :class="selectedNotifications.includes(notification.id) ? 'border-primary/60 bg-primary/6' : 'border-border/60 bg-background/60 hover:border-primary/30'"
        >
          <div class="flex items-start gap-4">
            <button type="button" class="mt-1 flex h-5 w-5 items-center justify-center rounded-full border transition" :class="selectedNotifications.includes(notification.id) ? 'border-primary bg-primary text-primary-foreground' : 'border-border/70 bg-background/70 text-transparent'" @click="toggleNotification(notification.id)">
              <Check class="h-3 w-3" />
            </button>

            <button type="button" class="flex-1 text-left" @click="viewNotification(notification.id)">
              <div class="flex items-center justify-between gap-4">
                <div class="flex min-w-0 items-start gap-3">
                  <div class="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl" :class="notification.status === 'FAILED' ? 'bg-destructive/12 text-destructive' : !notification.is_read ? 'bg-primary text-primary-foreground' : 'bg-secondary/70 text-muted-foreground'">
                    <BellRing class="h-5 w-5" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold leading-6 text-foreground">{{ notification.message }}</p>
                    <div class="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{{ formatDate(notification.created_at) }}</span>
                      <span class="inline-flex rounded-full px-2.5 py-1 font-semibold" :class="statusClass(notification.status)">{{ notification.status }}</span>
                      <span v-if="!notification.is_read" class="inline-flex rounded-full bg-primary/12 px-2.5 py-1 font-semibold text-primary">Unread</span>
                    </div>
                  </div>
                </div>
                <div class="flex shrink-0 gap-2">
                  <button v-if="!notification.is_read" type="button" class="rounded-2xl border border-border/70 bg-background/75 px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/40 hover:text-primary" @click.stop="markAsRead(notification.id)">
                    Read
                  </button>
                  <button type="button" class="rounded-2xl bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-destructive/15" @click.stop="deleteNotification(notification.id)">
                    Delete
                  </button>
                </div>
              </div>
            </button>
          </div>
        </article>
      </div>
    </SectionCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { BellRing, Check, CheckCheck, MailOpen } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const selectedNotifications = ref<string[]>([])

const isAllSelected = computed(() => notificationsStore.notifications.length > 0 && selectedNotifications.value.length === notificationsStore.notifications.length)

function toggleNotification(id: string) {
  const index = selectedNotifications.value.indexOf(id)
  if (index >= 0) {
    selectedNotifications.value.splice(index, 1)
  } else {
    selectedNotifications.value.push(id)
  }
}

function toggleSelectAll() {
  selectedNotifications.value = isAllSelected.value ? [] : notificationsStore.notifications.map((notification) => notification.id)
}

function statusClass(status: string) {
  if (status === 'FAILED') return 'bg-destructive/12 text-destructive'
  if (status === 'SENT') return 'bg-success/12 text-success'
  return 'bg-secondary/70 text-muted-foreground'
}

function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  if (hours < 168) return `${Math.floor(hours / 24)}d ago`
  return date.toLocaleDateString()
}

async function markAsRead(notificationId: string) {
  const success = await notificationsStore.markAsRead(notificationId)
  if (!success) {
    toast({ title: 'Unable to update notification', description: notificationsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Notification updated', description: 'Marked as read.', variant: 'success' })
}

async function markAllAsRead() {
  const success = await notificationsStore.markAllAsRead()
  if (!success) {
    toast({ title: 'Unable to update notifications', description: notificationsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'All notifications updated', description: 'Everything is marked as read.', variant: 'success' })
}

async function deleteNotification(notificationId: string) {
  if (!confirm('Delete this notification?')) return
  const success = await notificationsStore.deleteNotification(notificationId)

  if (!success) {
    toast({ title: 'Unable to delete notification', description: notificationsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  selectedNotifications.value = selectedNotifications.value.filter((id) => id !== notificationId)
  toast({ title: 'Notification deleted', description: 'The notification has been removed.', variant: 'success' })
}

async function bulkDeleteSelected() {
  if (selectedNotifications.value.length === 0) return
  if (!confirm(`Delete ${selectedNotifications.value.length} selected notification(s)?`)) return

  const success = await notificationsStore.bulkDeleteNotifications(selectedNotifications.value)
  if (!success) {
    toast({ title: 'Unable to delete notifications', description: notificationsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Notifications deleted', description: 'Selected notifications were removed.', variant: 'success' })
  selectedNotifications.value = []
}

function viewNotification(notificationId: string) {
  router.push(`/notifications/${notificationId}`)
}

onMounted(async () => {
  await Promise.all([notificationsStore.fetchNotifications(), notificationsStore.fetchUnreadCount()])
})
</script>
