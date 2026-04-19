<template>
  <div v-if="asset" class="space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Asset command center"
      :title="asset.name"
      :description="`${asset.symbol.toUpperCase()} - Track price action, create alerts, and inspect watchlist health from a single workspace.`"
    >
      <template #actions>
        <button type="button" class="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary" @click="router.back()">
          Back
        </button>
        <RouterLink :to="`/assets/${asset.coingecko_id}/more`" class="inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95">
          More details
        </RouterLink>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <MetricCard label="Current price" :value="`$${formatPrice(asset.current_price)}`" hint="Latest tracked market price" :icon="BadgeDollarSign" />
      <MetricCard label="Asset ID" :value="asset.id.slice(0, 8)" hint="Database identifier" :icon="Fingerprint" tone="success" />
      <MetricCard label="Active alerts" :value="assetAlerts.length" hint="Rules tied to this asset" :icon="BellRing" tone="warning" />
      <MetricCard label="Chart range" :value="selectedTimeRange.label" hint="Current chart window" :icon="LineChart" />
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_380px]">
      <div class="space-y-6">
        <SectionCard title="Market overview" description="A clean read on price action and tracking context.">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-center gap-4">
              <img :src="asset.image" :alt="asset.name" class="h-16 w-16 rounded-full border border-border/60 bg-background/60 object-cover" />
              <div>
                <h2 class="text-2xl font-semibold text-foreground">{{ asset.name }}</h2>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{{ asset.symbol }} - {{ asset.coingecko_id }}</p>
              </div>
            </div>
            <div class="rounded-[1.5rem] border border-border/60 bg-background/70 px-5 py-4 text-right">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Current price</p>
              <p class="mt-2 font-mono text-4xl font-semibold text-foreground">${{ formatPrice(asset.current_price) }}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard :title="`Price history - ${chartTimeRangeLabel}`" description="The chart uses the same historical and snapshot APIs already in place.">
          <div class="mb-5 flex flex-wrap gap-2">
            <button
              v-for="range in timeRanges"
              :key="range.label"
              type="button"
              class="rounded-2xl px-4 py-2.5 text-sm font-semibold transition"
              :class="selectedTimeRange.label === range.label ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-background/60 text-muted-foreground hover:text-foreground'"
              @click="selectTimeRange(range)"
            >
              {{ range.label }}
            </button>
          </div>

          <div v-if="isChartLoading" class="flex h-[320px] items-center justify-center rounded-[1.75rem] bg-background/60">
            <div class="text-center">
              <div class="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-primary/25 border-t-primary" />
              <p class="mt-4 text-sm font-semibold text-foreground">{{ chartLoadingMessage }}</p>
            </div>
          </div>
          <div v-else-if="chartData.length === 0" class="rounded-[1.75rem] bg-background/60">
            <EmptyState title="No chart data" description="Try another range to load a different slice of market history." />
          </div>
          <div v-else class="rounded-[1.75rem] border border-border/60 bg-background/60 p-4" style="height: 320px;">
            <PriceChart :snapshots="chartData" :time-range="selectedTimeRange" />
          </div>
        </SectionCard>
      </div>

      <div class="space-y-6">
        <SectionCard title="Create alert" description="Spin up a threshold rule for this asset without leaving the page.">
          <form class="space-y-4" @submit.prevent="handleCreateAlert">
            <div>
              <label class="label mb-2">Target price</label>
              <input v-model.number="alertForm.targetPrice" type="number" step="any" class="input" placeholder="0.00" />
            </div>
            <div>
              <label class="label mb-2">Condition</label>
              <div class="grid grid-cols-2 gap-3">
                <button type="button" class="rounded-2xl px-4 py-3 text-sm font-semibold transition" :class="alertForm.conditionType === 'ABOVE' ? 'bg-success text-success-foreground' : 'bg-background/65 text-muted-foreground'" @click="alertForm.conditionType = 'ABOVE'">Above</button>
                <button type="button" class="rounded-2xl px-4 py-3 text-sm font-semibold transition" :class="alertForm.conditionType === 'BELOW' ? 'bg-destructive text-destructive-foreground' : 'bg-background/65 text-muted-foreground'" @click="alertForm.conditionType = 'BELOW'">Below</button>
              </div>
            </div>
            <button type="submit" class="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95">Create alert</button>
          </form>
        </SectionCard>

        <SectionCard title="Active alerts" description="Rules currently attached to this asset.">
          <EmptyState v-if="assetAlerts.length === 0" title="No alerts yet" description="Create the first threshold rule for this asset above." />
          <div v-else class="space-y-3">
            <article v-for="alert in assetAlerts" :key="alert.id" class="rounded-[1.25rem] border border-border/60 bg-background/60 p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{{ alert.condition_type }}</p>
                  <p class="mt-2 font-mono text-xl font-semibold text-foreground">${{ formatPrice(alert.target_price) }}</p>
                </div>
                <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold" :class="alert.is_active ? 'bg-success/12 text-success' : 'bg-warning/12 text-warning'">
                  {{ alert.is_active ? 'Active' : 'Paused' }}
                </span>
              </div>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Watchlist actions" description="Manage the current tracked asset.">
          <button type="button" class="inline-flex w-full items-center justify-center rounded-2xl bg-destructive/10 px-5 py-3.5 text-sm font-semibold text-destructive transition hover:bg-destructive/15" @click="handleRemoveAsset">
            Remove from watchlist
          </button>
        </SectionCard>
      </div>
    </div>
  </div>

  <div v-else-if="assetsStore.error" class="rounded-[2rem] bg-background/70">
    <EmptyState title="Asset unavailable" :description="assetsStore.error" action-label="Add to watchlist" @action="handleAddAndReload" />
  </div>

  <div v-else class="flex min-h-[50vh] items-center justify-center">
    <div class="text-center">
      <div class="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-primary/25 border-t-primary" />
      <p class="mt-4 text-sm font-semibold text-foreground">Loading asset details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { BadgeDollarSign, BellRing, Fingerprint, LineChart } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import PriceChart from '@/components/PriceChart.vue'
import { useAssetsStore } from '@/stores/assets'
import { useAlertsStore } from '@/stores/alerts'
import { useToast } from '@/composables/useToast'
import type { HistoricalPricePoint, PriceSnapshotOut } from '@/types'

const route = useRoute()
const router = useRouter()
const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const { toast } = useToast()

const asset = ref(assetsStore.currentAsset)
const chartData = ref<HistoricalPricePoint[]>([])
const isChartLoading = ref(false)
const chartLoadingMessage = ref('Loading price data...')
const isAdding = ref(false)

const selectedTimeRange = ref({ label: '5m', value: 0 })
const timeRanges = [
  { label: '5m', value: 0 },
  { label: '1D', value: 1 },
  { label: '7D', value: 7 },
  { label: '30D', value: 30 },
  { label: '1Y', value: 365 },
]

const alertForm = ref({
  targetPrice: null as number | null,
  conditionType: 'ABOVE' as 'ABOVE' | 'BELOW',
})

const assetAlerts = computed(() => alertsStore.alerts.filter((alert) => alert.asset_id === asset.value?.coingecko_id))
const chartTimeRangeLabel = computed(() => (selectedTimeRange.value.value === 0 ? 'Last 5 minutes' : `Last ${selectedTimeRange.value.label}`))

function formatPrice(price: number) {
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 0.01) return price.toFixed(4)
  return price.toFixed(6)
}

async function selectTimeRange(range: { label: string; value: number }) {
  selectedTimeRange.value = range
  const coingeckoId = route.params.coingecko_id as string
  if (!coingeckoId || !asset.value) return

  isChartLoading.value = true

  try {
    if (range.value === 0) {
      chartLoadingMessage.value = 'Loading recent snapshots...'
      await assetsStore.fetchPriceSnapshots(coingeckoId, 1, 50)
      chartData.value = assetsStore.priceSnapshots.map((snapshot: PriceSnapshotOut) => ({
        timestamp: snapshot.timestamp,
        price_usd: snapshot.price_usd,
      }))
    } else {
      chartLoadingMessage.value = `Loading ${range.label} history...`
      await assetsStore.fetchHistoricalPrices(coingeckoId, range.value)
      chartData.value = assetsStore.historicalPrices
    }
  } finally {
    isChartLoading.value = false
  }
}

async function handleAddAndReload() {
  const coingeckoId = route.params.coingecko_id as string
  if (!coingeckoId) return

  isAdding.value = true
  const success = await assetsStore.addAsset(coingeckoId)
  isAdding.value = false

  if (!success) {
    toast({ title: 'Unable to add asset', description: assetsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Asset added', description: 'The asset was added to your watchlist.', variant: 'success' })
  await loadAsset()
}

async function handleRemoveAsset() {
  if (!asset.value) return
  if (!confirm(`Remove ${asset.value.name} from your watchlist?`)) return

  const success = await assetsStore.removeAsset(asset.value.coingecko_id)
  if (!success) {
    toast({ title: 'Unable to remove asset', description: assetsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Asset removed', description: `${asset.value.name} was removed from your watchlist.`, variant: 'success' })
  router.push('/dashboard')
}

async function handleCreateAlert() {
  if (!asset.value || !alertForm.value.targetPrice) return

  const success = await alertsStore.createAlert({
    asset_id: asset.value.coingecko_id,
    target_price: alertForm.value.targetPrice,
    condition_type: alertForm.value.conditionType,
  })

  if (!success) {
    toast({ title: 'Unable to create alert', description: alertsStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Alert created', description: 'Your threshold rule is now active.', variant: 'success' })
  alertForm.value.targetPrice = null
}

async function loadAsset() {
  const coingeckoId = route.params.coingecko_id as string
  await Promise.all([assetsStore.fetchAssetWithPrice(coingeckoId), alertsStore.fetchAlerts()])
  asset.value = assetsStore.currentAsset

  if (asset.value) {
    void assetsStore.fetchCoinDetails(coingeckoId)
    await selectTimeRange(selectedTimeRange.value)
  }
}

onMounted(loadAsset)
watch(() => route.params.coingecko_id, async () => {
  await loadAsset()
})
</script>
