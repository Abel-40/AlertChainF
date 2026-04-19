<template>
  <div class="min-h-screen app-shell-bg px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl space-y-6 animate-fade-in">
      <section class="surface-elevated rounded-[2rem] p-8 sm:p-10">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="max-w-3xl">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Onboarding</p>
            <h1 class="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Build your first watchlist</h1>
            <p class="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Choose between 1 and 10 assets to initialize Alert Chain. We&apos;ll keep the exact same add-assets flow and send you straight into the dashboard once you&apos;re ready.
            </p>
          </div>
          <div class="rounded-[1.5rem] border border-border/60 bg-background/70 p-5">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Selection</p>
            <p class="mt-2 font-mono text-4xl font-semibold text-foreground">{{ selectedCount }}<span class="text-lg text-muted-foreground">/10</span></p>
          </div>
        </div>
      </section>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <div class="space-y-6">
          <SectionCard title="Search and select" description="Pick assets from popular markets or search for something specific.">
            <div class="relative">
              <Search class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                v-model="searchQuery"
                type="text"
                class="input pl-12 text-base"
                placeholder="Search for cryptocurrencies..."
                @input="handleSearch"
              />
            </div>
          </SectionCard>

          <div v-if="assetsStore.isLoading" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div v-for="index in 9" :key="index" class="h-44 animate-pulse rounded-[1.75rem] bg-secondary/70" />
          </div>

          <EmptyState
            v-else-if="displayAssets.length === 0"
            :title="searchQuery ? 'No assets found' : 'Nothing left to add'"
            :description="searchQuery ? 'Try another asset name or symbol.' : 'You already track the popular assets list.'"
          />

          <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="asset in displayAssets"
              :key="asset.coingecko_id"
              class="surface-panel rounded-[1.75rem] p-5 transition hover:-translate-y-1"
              :class="isSelected(asset.coingecko_id) ? 'border-primary/60 shadow-lg shadow-primary/15' : ''"
              @click="toggleAsset(asset)"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-3 min-w-0">
                  <img :src="asset.image" :alt="asset.name" class="h-12 w-12 rounded-full border border-border/60 object-cover" />
                  <div class="min-w-0">
                    <h3 class="truncate text-lg font-semibold text-foreground">{{ asset.name }}</h3>
                    <p class="text-xs uppercase tracking-[0.16em] text-muted-foreground">{{ asset.symbol }}</p>
                  </div>
                </div>
                <div class="flex h-8 w-8 items-center justify-center rounded-full" :class="isSelected(asset.coingecko_id) ? 'bg-primary text-primary-foreground' : 'bg-background/70 text-muted-foreground'">
                  <Check v-if="isSelected(asset.coingecko_id)" class="h-4 w-4" />
                  <Plus v-else class="h-4 w-4" />
                </div>
              </div>

              <div class="mt-5 rounded-[1.25rem] border border-border/60 bg-background/60 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Market price</p>
                <p class="mt-2 font-mono text-2xl font-semibold text-foreground">
                  {{ asset.current_price !== undefined ? `$${formatPrice(asset.current_price)}` : 'Unavailable' }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <div class="space-y-6">
          <SectionCard title="Your queue" description="Only the selected assets will be added on continue.">
            <EmptyState
              v-if="selectedAssetDetails.length === 0"
              title="Nothing selected"
              description="Choose at least one asset to unlock the dashboard."
            />

            <div v-else class="space-y-3">
              <article
                v-for="asset in selectedAssetDetails"
                :key="asset.coingecko_id"
                class="flex items-center justify-between gap-3 rounded-[1.25rem] border border-border/60 bg-background/60 p-4"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <img :src="asset.image" :alt="asset.name" class="h-10 w-10 rounded-full border border-border/60 object-cover" />
                  <div class="min-w-0">
                    <p class="truncate font-semibold text-foreground">{{ asset.name }}</p>
                    <p class="text-xs uppercase tracking-[0.16em] text-muted-foreground">{{ asset.symbol }}</p>
                  </div>
                </div>
                <button type="button" class="text-sm font-semibold text-muted-foreground transition hover:text-destructive" @click.stop="toggleAsset(asset)">
                  Remove
                </button>
              </article>
            </div>

            <button
              type="button"
              class="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="selectedCount === 0"
              @click="handleContinue"
            >
              Continue to dashboard
            </button>
          </SectionCard>

          <SectionCard title="Already tracked" description="These are already part of your current watchlist.">
            <EmptyState
              v-if="assetsStore.trackedAssets.length === 0"
              title="Fresh account"
              description="No tracked assets yet, which is perfect for a clean start."
            />

            <div v-else class="space-y-3">
              <article
                v-for="asset in assetsStore.trackedAssets"
                :key="asset.id"
                class="flex items-center gap-3 rounded-[1.25rem] border border-border/60 bg-background/60 p-4"
              >
                <img :src="asset.image" :alt="asset.name" class="h-10 w-10 rounded-full border border-border/60 object-cover" />
                <div class="min-w-0">
                  <p class="truncate font-semibold text-foreground">{{ asset.name }}</p>
                  <p class="text-xs uppercase tracking-[0.16em] text-muted-foreground">{{ asset.symbol }}</p>
                </div>
              </article>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check, Plus, Search } from 'lucide-vue-next'
import EmptyState from '@/components/ui/empty-state.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import { useAssetsStore } from '@/stores/assets'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import type { AssetOutFromSearch } from '@/types'

const router = useRouter()
const assetsStore = useAssetsStore()
const authStore = useAuthStore()
const { toast } = useToast()

const searchQuery = ref('')
const selectedAssets = ref<Set<string>>(new Set())
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const filteredPopularAssets = computed(() => {
  const trackedIds = new Set(assetsStore.trackedAssets.map((asset) => asset.coingecko_id))
  return assetsStore.popularAssets.filter((asset) => !trackedIds.has(asset.coingecko_id))
})

const displayAssets = computed(() => (searchQuery.value.trim() ? assetsStore.searchResults : filteredPopularAssets.value))
const selectedCount = computed(() => selectedAssets.value.size)
const selectedAssetDetails = computed(() => displayAssets.value.filter((asset) => selectedAssets.value.has(asset.coingecko_id)))

function isSelected(coingeckoId: string) {
  return selectedAssets.value.has(coingeckoId)
}

function toggleAsset(asset: AssetOutFromSearch) {
  if (selectedAssets.value.has(asset.coingecko_id)) {
    selectedAssets.value.delete(asset.coingecko_id)
    return
  }

  if (selectedAssets.value.size >= 10) {
    toast({
      title: 'Selection limit reached',
      description: 'You can select up to 10 assets during onboarding.',
      variant: 'destructive',
    })
    return
  }

  selectedAssets.value.add(asset.coingecko_id)
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

async function handleContinue() {
  if (selectedCount.value === 0) {
    toast({
      title: 'Selection required',
      description: 'Pick at least one asset to continue.',
      variant: 'destructive',
    })
    return
  }

  const success = await assetsStore.addAssets(Array.from(selectedAssets.value))

  if (!success) {
    toast({
      title: 'Unable to add assets',
      description: assetsStore.error || 'Please try again.',
      variant: 'destructive',
    })
    return
  }

  if (authStore.user) {
    authStore.user = { ...authStore.user, assets_selected: true }
  }

  toast({
    title: 'Watchlist created',
    description: `Added ${selectedCount.value} asset${selectedCount.value > 1 ? 's' : ''} to your account.`,
    variant: 'success',
  })

  router.push('/dashboard')
}

onMounted(async () => {
  await assetsStore.fetchTrackedAssets()
  await assetsStore.fetchPopularAssets()
})
</script>
