<template>
  <div class="space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Asset discovery"
      title="Discover assets"
      description="Search new markets, review current watchlist coverage, and add symbols without leaving the monitoring flow."
    >
      <template #actions>
        <RouterLink
          to="/dashboard"
          class="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
        >
          Back to dashboard
        </RouterLink>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-3">
      <MetricCard label="Tracked assets" :value="assetsStore.trackedAssets.length" hint="Currently monitored markets" :icon="BadgeDollarSign" />
      <MetricCard label="Search results" :value="searchQuery ? assetsStore.searchResults.length : assetsStore.popularAssets.length" hint="Live discovery results" :icon="Search" tone="success" />
      <MetricCard label="Coverage posture" :value="watchlistHealth" hint="Watchlist readiness score" :icon="Radar" tone="warning" />
    </div>

    <SectionCard title="Search the market" description="Type a coin name and we will query the existing asset API without changing any backend contract.">
      <div class="relative">
        <Search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          v-model="searchQuery"
          type="text"
          class="input pl-12 text-base"
          placeholder="Search Bitcoin, Ethereum, Solana..."
          @input="handleSearch"
        />
      </div>
      <p class="mt-3 text-sm text-muted-foreground">
        {{ searchQuery ? 'Showing matching assets from search.' : 'Showing popular assets to help you expand the watchlist quickly.' }}
      </p>
    </SectionCard>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
      <SectionCard
        :title="searchQuery ? 'Search results' : 'Popular assets'"
        :description="searchQuery ? 'Tap an asset card to inspect details or add it immediately.' : 'Popular names pulled from the current API for quick onboarding.'"
      >
        <div v-if="assetsStore.isLoading" class="grid gap-4 md:grid-cols-2">
          <div v-for="index in 6" :key="index" class="h-44 animate-pulse rounded-[1.75rem] bg-secondary/70" />
        </div>

        <EmptyState
          v-else-if="displayAssets.length === 0"
          :title="searchQuery ? 'No assets found' : 'No assets available'"
          :description="searchQuery ? 'Try another asset name or ticker symbol.' : 'Popular assets will appear here when available.'"
        />

        <div v-else class="grid gap-4 md:grid-cols-2">
          <article
            v-for="asset in displayAssets"
            :key="asset.coingecko_id"
            class="surface-panel rounded-[1.75rem] p-5 transition hover:-translate-y-1 hover:border-primary/40"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4 min-w-0">
                <img :src="asset.image" :alt="asset.name" class="h-12 w-12 rounded-full border border-border/60 bg-background/60 object-cover" />
                <div class="min-w-0">
                  <h3 class="truncate text-lg font-semibold text-foreground">{{ asset.name }}</h3>
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{{ asset.symbol || asset.coingecko_id }}</p>
                </div>
              </div>
              <span
                class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                :class="isAssetTracked(asset.coingecko_id) ? 'bg-success/12 text-success' : 'bg-primary/12 text-primary'"
              >
                {{ isAssetTracked(asset.coingecko_id) ? 'Tracked' : 'Discover' }}
              </span>
            </div>

            <div class="mt-5 rounded-[1.25rem] border border-border/60 bg-background/60 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Current price</p>
              <p class="mt-2 font-mono text-2xl font-semibold text-foreground">
                {{ asset.current_price !== undefined ? `$${formatPrice(asset.current_price)}` : 'Unavailable' }}
              </p>
            </div>

            <div class="mt-5 flex gap-3">
              <button
                type="button"
                class="inline-flex flex-1 items-center justify-center rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
                @click="router.push(`/assets/${asset.coingecko_id}`)"
              >
                View details
              </button>
              <button
                v-if="!isAssetTracked(asset.coingecko_id)"
                type="button"
                class="inline-flex flex-1 items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95"
                @click="handleAddAsset(asset.coingecko_id)"
              >
                Add asset
              </button>
              <button
                v-else
                type="button"
                class="inline-flex flex-1 items-center justify-center rounded-2xl bg-success/12 px-4 py-3 text-sm font-semibold text-success"
                @click="router.push(`/assets/${asset.coingecko_id}`)"
              >
                Open
              </button>
            </div>
          </article>
        </div>
      </SectionCard>

      <div class="space-y-6">
        <SectionCard title="Watchlist coverage" description="A quick view of what is already being monitored.">
          <EmptyState
            v-if="assetsStore.trackedAssets.length === 0"
            title="No tracked assets"
            description="Add an asset from search results to start monitoring."
          />

          <div v-else class="space-y-3">
            <article
              v-for="asset in assetsStore.trackedAssets"
              :key="asset.id"
              class="flex items-center justify-between gap-3 rounded-[1.25rem] border border-border/60 bg-background/60 p-4"
            >
              <div class="flex items-center gap-3 min-w-0">
                <img :src="asset.image" :alt="asset.name" class="h-10 w-10 rounded-full border border-border/60 object-cover" />
                <div class="min-w-0">
                  <p class="truncate font-semibold text-foreground">{{ asset.name }}</p>
                  <p class="text-xs uppercase tracking-[0.16em] text-muted-foreground">{{ asset.symbol }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-mono text-sm font-semibold text-foreground">${{ formatPrice(asset.current_price) }}</p>
                <p class="text-xs text-muted-foreground">Live</p>
              </div>
            </article>
          </div>
        </SectionCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { BadgeDollarSign, Radar, Search } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import { useAssetsStore } from '@/stores/assets'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const assetsStore = useAssetsStore()
const { toast } = useToast()

const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const displayAssets = computed(() => (searchQuery.value.trim() ? assetsStore.searchResults : assetsStore.popularAssets))
const watchlistHealth = computed(() => {
  const score = Math.min(100, assetsStore.trackedAssets.length * 12)
  return `${score}%`
})

function isAssetTracked(coingeckoId: string) {
  return assetsStore.trackedAssets.some((asset) => asset.coingecko_id === coingeckoId)
}

function formatPrice(price: number) {
  if (price >= 1) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (price >= 0.01) return price.toFixed(4)
  return price.toFixed(6)
}

function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)

  searchTimeout = setTimeout(async () => {
    const query = searchQuery.value.trim()
    if (!query) {
      assetsStore.searchResults = []
      return
    }

    await assetsStore.searchAssets(query)
  }, 300)
}

async function handleAddAsset(assetId: string) {
  const success = await assetsStore.addAsset(assetId)

  if (!success) {
    toast({
      title: 'Unable to add asset',
      description: assetsStore.error || 'Please try again.',
      variant: 'destructive',
    })
    return
  }

  toast({
    title: 'Asset added',
    description: 'The asset is now part of your tracked watchlist.',
    variant: 'success',
  })
}

onMounted(async () => {
  await Promise.all([assetsStore.fetchTrackedAssets(), assetsStore.fetchPopularAssets()])
})
</script>
