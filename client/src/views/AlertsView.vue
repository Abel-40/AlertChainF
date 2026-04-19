<template>
  <div class="space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Alerts workspace"
      title="Price alerts"
      description="Manage threshold triggers, watch active coverage, and spin up new alerts without leaving the dashboard flow."
    >
      <template #actions>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95"
          @click="showCreateModal = true"
        >
          <Plus class="h-4 w-4" />
          Create alert
        </button>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <MetricCard label="Total alerts" :value="alertsStore.alerts.length" hint="All saved price triggers" :icon="Bell" />
      <MetricCard label="Active alerts" :value="alertsStore.activeAlerts.length" hint="Running and waiting for conditions" :icon="BellRing" tone="success" />
      <MetricCard label="Paused alerts" :value="alertsStore.inactiveAlerts.length" hint="Saved but not currently monitoring" :icon="PauseCircle" tone="warning" />
    </div>

    <SectionCard title="Filter alerts" description="Switch between all, live, and paused rules.">
      <div class="flex flex-wrap gap-3">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="rounded-2xl px-4 py-2.5 text-sm font-semibold transition"
          :class="activeTab === tab.value ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-background/60 text-muted-foreground hover:text-foreground'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
          <span class="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[11px]">{{ tab.count }}</span>
        </button>
      </div>
    </SectionCard>

    <div v-if="alertsStore.isLoading" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="index in 6" :key="index" class="h-56 animate-pulse rounded-[1.75rem] bg-secondary/70" />
    </div>

    <EmptyState
      v-else-if="filteredAlerts.length === 0"
      title="No alerts yet"
      description="Create your first alert to start watching price thresholds automatically."
      action-label="Create alert"
      @action="showCreateModal = true"
    />

    <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <section
        v-for="alert in filteredAlerts"
        :key="alert.id"
        class="surface-panel rounded-[1.75rem] p-5"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{{ alert.symbol || 'Asset' }}</p>
            <h3 class="mt-2 text-xl font-semibold text-foreground">{{ alert.asset_name || 'Unknown asset' }}</h3>
          </div>
          <span
            class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            :class="alert.is_active ? 'bg-success/12 text-success' : 'bg-warning/12 text-warning'"
          >
            <span class="h-2 w-2 rounded-full" :class="alert.is_active ? 'bg-success' : 'bg-warning'" />
            {{ alert.is_active ? 'Active' : 'Paused' }}
          </span>
        </div>

        <div class="mt-5 rounded-[1.25rem] border border-border/60 bg-background/60 p-4">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Condition</p>
            <span :class="['text-xs font-semibold uppercase tracking-[0.18em]', alert.condition_type === 'ABOVE' ? 'text-success' : 'text-destructive']">
              {{ alert.condition_type }}
            </span>
          </div>
          <p class="mt-3 font-mono text-3xl font-semibold text-foreground">${{ formatPrice(alert.target_price) }}</p>
          <p class="mt-2 text-sm text-muted-foreground">
            {{ alert.condition_type === 'ABOVE' ? 'Trigger when market moves above target.' : 'Trigger when market falls below target.' }}
          </p>
        </div>

        <div class="mt-5 flex items-center justify-between text-xs text-muted-foreground">
          <span>Updated {{ formatTimeAgo(alert.updated_at) }}</span>
          <span v-if="alert.last_triggered_at">Triggered {{ formatTimeAgo(alert.last_triggered_at) }}</span>
        </div>

        <div class="mt-5 flex gap-3">
          <button
            type="button"
            class="inline-flex flex-1 items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition"
            :class="alert.is_active ? 'bg-warning/12 text-warning hover:bg-warning/18' : 'bg-success/12 text-success hover:bg-success/18'"
            @click="toggleAlert(alert)"
          >
            {{ alert.is_active ? 'Pause alert' : 'Resume alert' }}
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/15"
            @click="deleteAlert(alert.id)"
          >
            Remove
          </button>
        </div>
      </section>
    </div>

    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="showCreateModal = false" />
        <div class="surface-panel relative z-10 w-full max-w-2xl rounded-[2rem] p-5 sm:p-6">
          <div class="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">New rule</p>
              <h2 class="mt-2 text-2xl font-semibold text-foreground">Create price alert</h2>
            </div>
            <button type="button" class="rounded-2xl border border-border/70 bg-background/70 p-2 text-muted-foreground transition hover:text-foreground" @click="showCreateModal = false">
              <X class="h-5 w-5" />
            </button>
          </div>

          <form class="mt-5 space-y-5" @submit.prevent="handleCreateAlert">
            <div>
              <label class="label mb-2">Tracked asset</label>
              <select v-model="createForm.coingecko_id" class="input">
                <option value="">Choose a tracked asset</option>
                <option v-for="asset in assetsStore.trackedAssets" :key="asset.coingecko_id" :value="asset.coingecko_id">
                  {{ asset.name }} ({{ asset.symbol }})
                </option>
              </select>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="label mb-2">Target price</label>
                <input v-model.number="createForm.target_price" type="number" step="any" class="input" placeholder="0.00" />
              </div>
              <div>
                <label class="label mb-2">Condition</label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    class="rounded-2xl px-4 py-3 text-sm font-semibold transition"
                    :class="createForm.condition_type === 'ABOVE' ? 'bg-success text-success-foreground' : 'bg-background/65 text-muted-foreground'"
                    @click="createForm.condition_type = 'ABOVE'"
                  >
                    Above
                  </button>
                  <button
                    type="button"
                    class="rounded-2xl px-4 py-3 text-sm font-semibold transition"
                    :class="createForm.condition_type === 'BELOW' ? 'bg-destructive text-destructive-foreground' : 'bg-background/65 text-muted-foreground'"
                    @click="createForm.condition_type = 'BELOW'"
                  >
                    Below
                  </button>
                </div>
              </div>
            </div>

            <div v-if="selectedAsset" class="rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-sm text-muted-foreground">
              Current {{ selectedAsset.name }} price: <span class="font-mono font-semibold text-foreground">${{ formatPrice(selectedAsset.current_price) }}</span>
            </div>

            <button type="submit" class="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95" :disabled="isCreating">
              {{ isCreating ? 'Creating alert...' : 'Create alert' }}
            </button>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Bell, BellRing, PauseCircle, Plus, X } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import { useAlertsStore } from '@/stores/alerts'
import { useAssetsStore } from '@/stores/assets'
import { useToast } from '@/composables/useToast'
import type { AlertOut } from '@/types'

const alertsStore = useAlertsStore()
const assetsStore = useAssetsStore()
const { toast } = useToast()

const activeTab = ref<'all' | 'active' | 'inactive'>('all')
const showCreateModal = ref(false)
const isCreating = ref(false)
const createForm = ref({
  coingecko_id: '',
  target_price: null as number | null,
  condition_type: 'ABOVE' as 'ABOVE' | 'BELOW',
})

const tabs = computed(() => [
  { label: 'All', value: 'all' as const, count: alertsStore.alerts.length },
  { label: 'Active', value: 'active' as const, count: alertsStore.activeAlerts.length },
  { label: 'Paused', value: 'inactive' as const, count: alertsStore.inactiveAlerts.length },
])

const filteredAlerts = computed(() => {
  if (activeTab.value === 'active') return alertsStore.activeAlerts
  if (activeTab.value === 'inactive') return alertsStore.inactiveAlerts
  return alertsStore.alerts
})

const selectedAsset = computed(() => {
  return assetsStore.trackedAssets.find((asset) => asset.coingecko_id === createForm.value.coingecko_id) || null
})

function formatPrice(price: number) {
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 0.01) return price.toFixed(4)
  return price.toFixed(6)
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

async function toggleAlert(alert: AlertOut) {
  const success = await alertsStore.toggleAlert(alert.id)
  if (!success) {
    toast({ title: 'Unable to update alert', description: alertsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({
    title: 'Alert updated',
    description: `${alert.asset_name || 'Alert'} is now ${alert.is_active ? 'paused' : 'active'}.`,
    variant: 'success',
  })
}

async function deleteAlert(alertId: string) {
  const success = await alertsStore.deleteAlert(alertId)
  if (!success) {
    toast({ title: 'Unable to remove alert', description: alertsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Alert removed', description: 'The alert rule has been deleted.', variant: 'success' })
}

async function handleCreateAlert() {
  if (!createForm.value.coingecko_id || !createForm.value.target_price) {
    toast({ title: 'Missing details', description: 'Choose an asset and target price first.', variant: 'destructive' })
    return
  }

  isCreating.value = true
  const success = await alertsStore.createAlert({
    asset_id: createForm.value.coingecko_id,
    target_price: createForm.value.target_price,
    condition_type: createForm.value.condition_type,
  })

  if (!success) {
    toast({ title: 'Unable to create alert', description: alertsStore.error || 'Please try again.', variant: 'destructive' })
    isCreating.value = false
    return
  }

  toast({ title: 'Alert created', description: 'Your new threshold is now being monitored.', variant: 'success' })
  createForm.value = { coingecko_id: '', target_price: null, condition_type: 'ABOVE' }
  showCreateModal.value = false
  isCreating.value = false
  await alertsStore.fetchAlerts()
}

onMounted(async () => {
  await Promise.all([alertsStore.fetchAlerts(), assetsStore.fetchTrackedAssets()])
})
</script>
