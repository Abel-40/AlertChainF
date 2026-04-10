<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">Price Alerts</h1>
        <p class="text-muted-foreground">Manage your cryptocurrency price alerts</p>
      </div>
      <button class="btn btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Create Alert
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-xl">
      <div class="flex gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 rounded-xl font-medium transition-all duration-200',
            activeTab === tab.value
              ? 'bg-primary text-white shadow-lg shadow-primary/30'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <!-- Alerts List -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
      <!-- Loading -->
      <div v-if="alertsStore.isLoading" class="p-6">
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center gap-4 animate-pulse">
            <div class="w-12 h-12 rounded-full bg-secondary" />
            <div class="flex-1">
              <div class="h-5 bg-secondary rounded w-1/3 mb-2" />
              <div class="h-4 bg-secondary rounded w-1/4" />
            </div>
            <div class="h-8 bg-secondary rounded w-24" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else-if="filteredAlerts.length === 0"
        title="No alerts found"
        description="Create your first price alert to get started"
        action-label="Create Alert"
        @action="createAlert"
      />

      <!-- Alerts -->
      <div v-else class="divide-y divide-border">
        <div
          v-for="alert in filteredAlerts"
          :key="alert.id"
          class="p-6 hover:bg-secondary/30 transition-all duration-200"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                {{ alert.symbol?.[0] || alert.asset_name?.[0] || 'A' }}
              </div>
              <div>
                <h3 class="font-semibold text-lg">{{ alert.asset_name || 'Unknown Asset' }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <span :class="['badge', alert.condition_type === 'ABOVE' ? 'badge-success' : 'badge-danger']">
                    {{ alert.condition_type === 'ABOVE' ? '↑ Above' : '↓ Below' }}
                  </span>
                  <span class="text-sm text-muted-foreground">Target: ${{ formatPrice(alert.target_price) }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span :class="['badge', alert.is_active ? 'badge-success' : 'badge-muted']">
                {{ alert.is_active ? 'Active' : 'Inactive' }}
              </span>
              <button
                @click="toggleAlert(alert)"
                class="p-2 rounded-lg hover:bg-secondary transition-colors"
                :title="alert.is_active ? 'Disable' : 'Enable'"
              >
                <svg v-if="alert.is_active" class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
              <button
                @click="deleteAlert(alert.id)"
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
import { ref, computed, onMounted } from 'vue'
import { useAlertsStore } from '@/stores/alerts'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'
import type { AlertOut } from '@/types'

const alertsStore = useAlertsStore()
const { toast } = useToast()

const activeTab = ref<'all' | 'active' | 'inactive'>('all')

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' }
]

const filteredAlerts = computed(() => {
  const alerts = alertsStore.alerts
  if (activeTab.value === 'active') return alerts.filter(a => a.is_active)
  if (activeTab.value === 'inactive') return alerts.filter(a => !a.is_active)
  return alerts
})

function formatPrice(price: number) {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

async function toggleAlert(alert: AlertOut) {
  const success = await alertsStore.toggleAlert(alert.id)
  if (success) {
    toast({
      title: 'Alert Updated',
      description: `Alert ${alert.is_active ? 'disabled' : 'enabled'} successfully`,
      variant: 'success',
    })
  }
}

async function deleteAlert(alertId: string) {
  if (!confirm('Are you sure you want to delete this alert?')) return
  
  const success = await alertsStore.deleteAlert(alertId)
  if (success) {
    toast({
      title: 'Alert Deleted',
      description: 'The alert has been removed',
      variant: 'success',
    })
  }
}

function createAlert() {
  toast({
    title: 'Coming Soon',
    description: 'Alert creation from asset detail page',
    variant: 'success',
  })
}

onMounted(async () => {
  await alertsStore.fetchAlerts()
})
</script>
