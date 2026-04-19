<template>
  <div class="space-y-4 animate-fade-in">
    <PageHeader
      eyebrow="Alerts module"
      title="Your market command center"
      description="Track watchlist health, recent trigger activity, and the assets that need attention first."
    >
      <template #actions>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95"
          @click="showAddAssetModal = true"
        >
          <Plus class="h-4 w-4" />
          Add asset
        </button>
      </template>
    </PageHeader>

    <div class="grid gap-3 md:grid-cols-3">
      <MetricCard label="Tracked assets" :value="assetsStore.trackedAssets.length" hint="Assets on your active watchlist" :icon="WalletCards" />
      <MetricCard label="Active alerts" :value="alertsStore.activeAlerts.length" hint="Thresholds currently monitoring" :icon="BellRing" tone="success" />
      <MetricCard label="Unread notifications" :value="notificationsStore.unreadCount" hint="Triggered events waiting on you" :icon="Activity" tone="warning" />
    </div>

    <div class="grid gap-4 xl:grid-cols-[1.35fr_0.7fr]">
      <SectionCard title="Tracked assets" description="Recent watchlist entries with live price context.">
        <template #header>
          <RouterLink to="/assets/search" class="text-sm font-semibold text-primary transition hover:opacity-80">Manage assets</RouterLink>
        </template>

        <div v-if="assetsStore.isLoading" class="space-y-3">
          <div v-for="index in 4" :key="index" class="h-20 animate-pulse rounded-2xl bg-secondary/70" />
        </div>

        <EmptyState
          v-else-if="assetsStore.trackedAssets.length === 0"
          title="No assets tracked yet"
          description="Add a few assets to turn the dashboard into a live monitoring workspace."
          action-label="Add asset"
          @action="showAddAssetModal = true"
        />

        <div v-else class="space-y-3">
          <RouterLink
            v-for="asset in assetsStore.trackedAssets.slice(0, 6)"
            :key="asset.id"
            :to="`/assets/${asset.coingecko_id}`"
            class="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/55 px-4 py-3 transition hover:border-primary/35 hover:bg-background/80"
          >
            <div class="flex min-w-0 items-center gap-3">
              <img :src="asset.image" :alt="asset.name" class="h-10 w-10 rounded-xl bg-card object-cover" />
              <div class="min-w-0">
                <p class="truncate font-semibold text-foreground">{{ asset.name }}</p>
                <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">{{ asset.symbol }}</p>
              </div>
            </div>
            <div class="text-right">
                <p class="font-mono text-sm font-semibold text-foreground">${{ formatPrice(asset.current_price) }}</p>
                <p class="text-[11px] text-muted-foreground">Current price</p>
            </div>
          </RouterLink>
        </div>
      </SectionCard>

      <div class="space-y-6">
        <SectionCard title="Alert posture" description="Quick read on signal readiness.">
          <div class="space-y-3">
            <div class="flex items-center justify-between rounded-xl bg-background/60 px-4 py-2.5">
              <span class="text-sm font-medium text-foreground">Active alerts</span>
              <span class="text-sm font-semibold text-success">{{ alertsStore.activeAlerts.length }}</span>
            </div>
            <div class="flex items-center justify-between rounded-xl bg-background/60 px-4 py-2.5">
              <span class="text-sm font-medium text-foreground">Paused alerts</span>
              <span class="text-sm font-semibold text-muted-foreground">{{ alertsStore.inactiveAlerts.length }}</span>
            </div>
            <div class="flex items-center justify-between rounded-xl bg-background/60 px-4 py-2.5">
              <span class="text-sm font-medium text-foreground">Unread notifications</span>
              <span class="text-sm font-semibold text-primary">{{ notificationsStore.unreadCount }}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Recent notifications" description="Latest alert delivery activity.">
          <template #header>
            <RouterLink to="/notifications" class="text-sm font-semibold text-primary transition hover:opacity-80">Open inbox</RouterLink>
          </template>

          <EmptyState
            v-if="notificationsStore.notifications.length === 0"
            title="No notifications yet"
            description="Triggered alerts will appear here once the market reaches your conditions."
          />

          <div v-else class="space-y-3">
            <RouterLink
              v-for="notification in notificationsStore.notifications.slice(0, 4)"
              :key="notification.id"
              :to="`/notifications/${notification.id}`"
              class="flex gap-3 rounded-xl border border-border/60 bg-background/55 px-4 py-2.5 transition hover:border-primary/35"
            >
              <div class="mt-1 h-2.5 w-2.5 rounded-full" :class="notification.is_read ? 'bg-muted-foreground/40' : 'bg-primary'" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-foreground">{{ notification.message }}</p>
                <p class="mt-1 text-xs text-muted-foreground">{{ formatRelativeDate(notification.created_at) }}</p>
              </div>
            </RouterLink>
          </div>
        </SectionCard>
      </div>
    </div>

    <SectionCard title="Search and add assets" description="Find new symbols quickly and push them straight into your watchlist.">
      <div class="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
        <div class="relative">
          <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or symbol"
            class="input pl-11"
            @input="handleSearch"
          />
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl border border-border/70 bg-background/65 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background"
          @click="showAddAssetModal = true"
        >
          Open picker
        </button>
      </div>

      <div class="mt-5">
        <div v-if="assetsStore.isLoading && searchQuery.trim()" class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="index in 3" :key="index" class="h-24 animate-pulse rounded-2xl bg-secondary/70" />
        </div>

        <div v-else-if="assetsStore.searchResults.length > 0" class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="coin in assetsStore.searchResults.slice(0, 6)"
            :key="coin.coingecko_id"
            class="rounded-xl border border-border/60 bg-background/55 p-4"
          >
            <div class="flex items-center gap-3">
              <img :src="coin.image" :alt="coin.name" class="h-11 w-11 rounded-2xl object-cover" />
              <div class="min-w-0 flex-1">
                <p class="truncate font-semibold text-foreground">{{ coin.name }}</p>
                <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">{{ coin.symbol }}</p>
              </div>
            </div>
            <button
              type="button"
              class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
              @click="addAsset(coin)"
            >
              Add to watchlist
            </button>
          </div>
        </div>

        <EmptyState
          v-else
          title="Search results will appear here"
          description="Type at least two characters to search the asset catalog."
        />
      </div>
    </SectionCard>

    <Teleport to="body">
      <div v-if="showAddAssetModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" @click="showAddAssetModal = false" />
        <div class="surface-panel relative z-10 w-full max-w-2xl rounded-[2rem] p-5 sm:p-6">
          <div class="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Quick add</p>
              <h2 class="mt-2 text-2xl font-semibold text-foreground">Add a tracked asset</h2>
            </div>
            <button type="button" class="rounded-2xl border border-border/70 bg-background/70 p-2 text-muted-foreground transition hover:text-foreground" @click="showAddAssetModal = false">
              <X class="h-5 w-5" />
            </button>
          </div>

          <div class="mt-5 relative">
            <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input v-model="searchQuery" type="text" placeholder="Search crypto assets" class="input pl-11" @input="handleSearch" />
          </div>

          <div class="mt-5 max-h-[22rem] space-y-3 overflow-y-auto pr-1">
            <div v-if="assetsStore.isLoading" class="space-y-3">
              <div v-for="index in 4" :key="index" class="h-20 animate-pulse rounded-2xl bg-secondary/70" />
            </div>
            <div
              v-else-if="assetsStore.searchResults.length > 0"
              v-for="coin in assetsStore.searchResults"
              :key="coin.coingecko_id"
              class="flex items-center justify-between gap-4 rounded-[1.25rem] border border-border/60 bg-background/55 px-4 py-3"
            >
              <div class="flex min-w-0 items-center gap-3">
                <img :src="coin.image" :alt="coin.name" class="h-11 w-11 rounded-2xl object-cover" />
                <div class="min-w-0">
                  <p class="truncate font-semibold text-foreground">{{ coin.name }}</p>
                  <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">{{ coin.symbol }}</p>
                </div>
              </div>
              <button type="button" class="rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95" @click="addAsset(coin)">
                Add
              </button>
            </div>
            <EmptyState
              v-else
              title="No assets found"
              description="Try a different search term or symbol."
            />
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Activity, BellRing, Plus, Search, WalletCards, X } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import { useAlertsStore } from '@/stores/alerts'
import { useAssetsStore } from '@/stores/assets'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'

const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const showAddAssetModal = ref(false)
const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout> | null = null

function formatPrice(price: number) {
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 0.01) return price.toFixed(4)
  return price.toFixed(6)
}

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim().length < 2) {
      assetsStore.searchResults = []
      return
    }
    await assetsStore.searchAssets(searchQuery.value)
  }, 300)
}

async function addAsset(coin: { coingecko_id: string; name: string }) {
  const success = await assetsStore.addAsset(coin.coingecko_id)
  if (!success) {
    toast({ title: 'Unable to add asset', description: assetsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Asset added', description: `${coin.name} is now in your tracked list.`, variant: 'success' })
  await assetsStore.fetchTrackedAssets()
  showAddAssetModal.value = false
  searchQuery.value = ''
}

onMounted(async () => {
  await Promise.all([
    assetsStore.fetchTrackedAssets(),
    alertsStore.fetchAlerts(),
    notificationsStore.fetchNotifications(),
    notificationsStore.fetchUnreadCount(),
  ])
})
</script>
