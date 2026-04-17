<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold mb-2">Search Cryptocurrencies</h1>
      <p class="text-muted-foreground">Find and add assets to your tracking list</p>
    </div>

    <!-- Search Bar -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl">
      <div class="relative">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search by name (e.g., Bitcoin, Ethereum)..."
          class="w-full px-6 py-4 pl-14 bg-secondary/50 border border-border rounded-xl text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
        />
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery" class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
      <div class="p-6 border-b border-border">
        <h2 class="text-xl font-bold">Search Results</h2>
        <p class="text-sm text-muted-foreground mt-1">{{ assetsStore.searchResults.length }} assets found</p>
      </div>

      <!-- Loading -->
      <div v-if="assetsStore.isLoading" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="bg-secondary/50 rounded-xl p-6 animate-pulse">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-secondary" />
              <div class="flex-1">
                <div class="h-5 bg-secondary rounded w-3/4 mb-2" />
                <div class="h-4 bg-secondary rounded w-1/2" />
              </div>
            </div>
            <div class="h-8 bg-secondary rounded" />
          </div>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-else-if="assetsStore.searchResults.length > 0" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="asset in assetsStore.searchResults"
            :key="asset.coingecko_id"
            class="group relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            @click="$router.push(`/assets/${asset.coingecko_id}`)"
          >
            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div class="relative z-10">
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div class="relative flex-shrink-0">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    <img :src="asset.image" :alt="asset.name" class="relative w-11 h-11 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="font-bold text-base group-hover:text-primary transition-colors duration-200 truncate">{{ asset.name }}</h3>
                    <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ asset.symbol || asset.coingecko_id }}</p>
                  </div>
                </div>
                <!-- Already Tracked Badge -->
                <span v-if="isAssetTracked(asset.coingecko_id)" class="px-2 py-1 bg-primary/20 border border-primary/40 text-primary text-xs font-semibold rounded-full">
                  ✓ Tracking
                </span>
              </div>
              
              <!-- Action Button -->
              <button
                v-if="!isAssetTracked(asset.coingecko_id)"
                @click.stop="handleAddAsset(asset.coingecko_id)"
                class="w-full px-3 py-2.5 bg-gradient-to-r from-primary/15 to-accent/15 border border-primary/30 text-primary text-sm font-semibold rounded-lg hover:from-primary hover:to-accent hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add to Watchlist
                </span>
              </button>
              <button
                v-else
                @click.stop="$router.push(`/assets/${asset.coingecko_id}`)"
                class="w-full px-3 py-2.5 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <EmptyState
        v-else
        title="No assets found"
        description="Try searching with a different name"
      />
    </div>

    <!-- Your Tracked Assets -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
      <div class="p-6 border-b border-border">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold">Your Tracked Assets</h2>
            <p class="text-sm text-muted-foreground mt-1">Assets you're currently monitoring</p>
          </div>
          <span class="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary text-sm font-semibold rounded-full">
            {{ assetsStore.trackedAssets.length }} asset{{ assetsStore.trackedAssets.length !== 1 ? 's' : '' }}
          </span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="assetsStore.isLoading" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="bg-secondary/50 rounded-xl p-6 animate-pulse">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-secondary" />
              <div class="flex-1">
                <div class="h-5 bg-secondary rounded w-3/4 mb-2" />
                <div class="h-4 bg-secondary rounded w-1/2" />
              </div>
            </div>
            <div class="h-8 bg-secondary rounded" />
          </div>
        </div>
      </div>

      <!-- Tracked Assets Grid -->
      <div v-else-if="assetsStore.trackedAssets.length > 0" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="asset in assetsStore.trackedAssets"
            :key="asset.id"
            class="group relative bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            @click="$router.push(`/assets/${asset.coingecko_id}`)"
          >
            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div class="relative z-10">
              <!-- Asset Header -->
              <div class="flex items-center gap-3 mb-3">
                <div class="relative flex-shrink-0">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <img :src="asset.image" :alt="asset.name" class="relative w-11 h-11 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-bold text-sm group-hover:text-primary transition-colors duration-200 truncate">{{ asset.name }}</h3>
                  <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{{ asset.symbol }}</p>
                </div>
              </div>
              
              <!-- Price Display -->
              <div v-if="asset.current_price !== undefined" class="mb-3 pb-3 border-b border-border/50">
                <p class="text-lg font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${{ formatPrice(asset.current_price) }}</p>
              </div>
              
              <!-- View Details Button -->
              <button
                class="w-full px-3 py-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-primary text-sm font-semibold rounded-lg hover:from-primary hover:to-accent hover:text-white transition-all duration-300 shadow-md hover:shadow-lg group-hover:scale-105"
              >
                <span class="flex items-center justify-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else
        title="No assets tracked yet"
        description="Search for cryptocurrencies above to start tracking"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAssetsStore } from '@/stores/assets'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'

const assetsStore = useAssetsStore()
const { toast } = useToast()
const searchQuery = ref('')

function isAssetTracked(coingeckoId: string): boolean {
  return assetsStore.trackedAssets.some(asset => asset.coingecko_id === coingeckoId)
}

function formatPrice(price: number) {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

let searchTimeout: any
function handleSearch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (searchQuery.value.trim()) {
      assetsStore.searchAssets(searchQuery.value)
    } else {
      assetsStore.searchResults = []
    }
  }, 300)
}

async function handleAddAsset(assetId: string) {
  console.log('➕ Adding asset:', assetId)
  const success = await assetsStore.addAsset(assetId)
  
  if (success) {
    console.log('✅ Asset added successfully, refreshing tracked assets...')
    // Refresh tracked assets list
    await assetsStore.fetchTrackedAssets()
    
    toast({
      title: 'Asset Added!',
      description: 'The asset has been added to your tracking list',
      variant: 'success',
    })
  } else {
    console.error('❌ Failed to add asset')
    toast({
      title: 'Error',
      description: 'Failed to add asset. Please try again.',
      variant: 'destructive',
    })
  }
}

onMounted(async () => {
  console.log('🔍 AssetSearchView mounted, fetching tracked assets...')
  await assetsStore.fetchTrackedAssets()
  console.log('✅ Tracked assets loaded:', assetsStore.trackedAssets.length)
})
</script>
