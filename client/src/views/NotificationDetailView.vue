<template>
  <div class="mx-auto max-w-4xl space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Notification detail"
      title="Notification event"
      description="Inspect the message, alert reference, and delivery status for a single event."
    >
      <template #actions>
        <button type="button" class="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary" @click="router.push('/notifications')">
          Back to inbox
        </button>
      </template>
    </PageHeader>

    <div v-if="isLoading" class="space-y-3">
      <div v-for="index in 3" :key="index" class="h-32 animate-pulse rounded-[1.75rem] bg-secondary/70" />
    </div>

    <template v-else-if="notification">
      <div class="grid gap-4 md:grid-cols-3">
        <MetricCard label="Status" :value="notification.status" hint="Delivery state" :icon="BellRing" />
        <MetricCard label="Read state" :value="notification.is_read ? 'Read' : 'Unread'" hint="Review state" :icon="MailOpen" tone="warning" />
        <MetricCard label="Created" :value="formatDate(notification.created_at)" hint="Relative time" :icon="Clock3" tone="success" />
      </div>

      <SectionCard title="Message" description="The exact alert copy returned by the current API.">
        <div class="rounded-[1.5rem] border border-border/60 bg-background/60 p-6">
          <p class="text-lg leading-8 text-foreground">{{ notification.message }}</p>
        </div>
      </SectionCard>

      <SectionCard title="Metadata" description="Useful delivery context for debugging or audit review.">
        <div class="grid gap-4 md:grid-cols-2">
          <article class="rounded-[1.5rem] border border-border/60 bg-background/60 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Created at</p>
            <p class="mt-3 text-base font-semibold text-foreground">{{ formatFullDate(notification.created_at) }}</p>
          </article>
          <article class="rounded-[1.5rem] border border-border/60 bg-background/60 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Alert rule ID</p>
            <p class="mt-3 break-all font-mono text-sm font-semibold text-foreground">{{ notification.alert_rule_id }}</p>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Actions" description="Common triage operations for this event.">
        <div class="flex flex-wrap gap-3">
          <button v-if="!notification.is_read" type="button" class="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95" @click="handleMarkAsRead">
            Mark as read
          </button>
          <button type="button" class="rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/15" @click="handleDelete">
            Delete notification
          </button>
        </div>
      </SectionCard>
    </template>

    <EmptyState v-else title="Notification not found" description="The item may have been deleted or is no longer available." action-label="Back to notifications" @action="router.push('/notifications')" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BellRing, Clock3, MailOpen } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import type { NotificationOut } from '@/types'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const notification = ref<NotificationOut | null>(null)
const isLoading = ref(false)

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

    if (notification.value && !notification.value.is_read) {
      await notificationsStore.markAsRead(notification.value.id)
      notification.value.is_read = true
    }
  } catch {
    notification.value = null
    toast({ title: 'Unable to load notification', description: 'Please try again.', variant: 'destructive' })
  } finally {
    isLoading.value = false
  }
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

function formatFullDate(dateString: string | null) {
  if (!dateString) return 'Unknown date'
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

async function handleMarkAsRead() {
  if (!notification.value || notification.value.is_read) return
  const success = await notificationsStore.markAsRead(notification.value.id)
  if (!success) {
    toast({ title: 'Unable to update notification', description: notificationsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  notification.value.is_read = true
  toast({ title: 'Notification updated', description: 'Marked as read.', variant: 'success' })
}

async function handleDelete() {
  if (!notification.value) return
  if (!confirm('Delete this notification?')) return

  const success = await notificationsStore.deleteNotification(notification.value.id)
  if (!success) {
    toast({ title: 'Unable to delete notification', description: notificationsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Notification deleted', description: 'The notification has been removed.', variant: 'success' })
  router.push('/notifications')
}

onMounted(fetchNotification)
</script>
