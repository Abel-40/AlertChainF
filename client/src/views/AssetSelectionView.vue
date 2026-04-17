<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
    <!-- Animated Background Effects -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1.5s" />
      <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style="animation-delay: 3s" />
    </div>

    <div class="relative z-10 min-h-screen flex flex-col">
      <!-- Header Section -->
      <div class="pt-12 pb-8 px-4">
        <div class="max-w-7xl mx-auto text-center">
          <!-- Logo/Icon -->
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6 animate-float shadow-2xl shadow-primary/30">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          
          <!-- Title & Subtitle -->
          <h1 class="text-5xl md:text-6xl font-bold mb-4">
            <span class="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Build Your Crypto Watchlist
            </span>
          </h1>
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select 1-10 cryptocurrencies to track. Get real-time alerts when prices hit your targets.
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 px-4 pb-12">
        <div class="max-w-7xl mx-auto space-y-6">
          <!-- Already Tracked Assets Info Banner -->
          <div v-if="assetsStore.trackedAssets.length > 0" 
               class="group relative overflow-hidden bg-gradient-to-r from-primary/10 via-card/50 to-accent/10 backdrop-blur-xl border border-primary/30 rounded-3xl p-8 shadow-2xl">
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div class="relative z-10">
              <div class="flex items-start gap-6">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-xl">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Assets You're Already Tracking
                  </h3>
                  <p class="text-base text-muted-foreground mb-4">
                    You already have these assets in your watchlist. Add more by searching or selecting from popular assets below.
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <span 
                      v-for="asset in assetsStore.trackedAssets" 
                      :key="asset.coingecko_id"
                      class="px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40 text-primary font-bold rounded-full shadow-lg hover:scale-105 transition-transform cursor-default"
                    >
                      {{ asset.name }} ({{ asset.symbol.toUpperCase() }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Progress Indicator -->
          <div class="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span class="text-sm font-semibold text-foreground">Selected Assets</span>
                  <p class="text-xs text-muted-foreground">Choose 1-10 cryptocurrencies</p>
                </div>
              </div>
              <span :class="['text-2xl font-bold', selectedCount > 0 ? 'text-primary' : 'text-muted-foreground']">
                {{ selectedCount }}<span class="text-base text-muted-foreground">/10</span>
              </span>
            </div>
            <div class="w-full h-3 bg-secondary/50 rounded-full overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
                :style="{ width: `${(selectedCount / 10) * 100}%` }"
              />
            </div>
            <p v-if="selectedCount === 0" class="text-sm text-muted-foreground mt-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Select at least 1 asset to continue
            </p>
          </div>

          <!-- Search Bar -->
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg class="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search for cryptocurrencies..."
              class="w-full pl-16 pr-6 py-5 bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 shadow-xl"
            />
          </div>

          <!-- Loading State -->
          <div v-if="assetsStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="i in 6" :key="i" class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 animate-pulse">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-secondary" />
                <div class="flex-1">
                  <div class="h-5 bg-secondary rounded w-3/4 mb-2" />
                  <div class="h-4 bg-secondary rounded w-1/2" />
                </div>
              </div>
              <div class="h-10 bg-secondary rounded" />
            </div>
          </div>

          <!-- Assets Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="asset in displayAssets"
              :key="asset.coingecko_id"
              :class="[
                'group relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden',
                isSelected(asset.coingecko_id) 
                  ? 'border-primary shadow-2xl shadow-primary/30' 
                  : 'border-border/50 hover:border-primary/50 hover:shadow-primary/20'
              ]"
              @click="toggleAsset(asset)"
            >
              <!-- Selection Indicator -->
              <div v-if="isSelected(asset.coingecko_id)" class="absolute top-4 right-4">
                <div class="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-xl animate-scale-in">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <!-- Hover Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-4">
                  <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                    <img :src="asset.image" :alt="asset.name" class="relative w-12 h-12 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-base group-hover:text-primary transition-colors duration-200 truncate">{{ asset.name }}</h3>
                    <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{{ asset.symbol }}</p>
                  </div>
                </div>
                <div v-if="asset.current_price !== undefined" class="mt-4 pt-4 border-t border-border/50">
                  <p class="text-xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${{ formatPrice(asset.current_price) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!assetsStore.isLoading && displayAssets.length === 0" 
               class="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-16 text-center shadow-2xl">
            <div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">{{ searchQuery ? 'No assets found' : 'All popular assets already tracked' }}</h3>
            <p class="text-muted-foreground">{{ searchQuery ? 'Try a different search term' : 'You\'re tracking all popular assets! Search for specific coins to add more.' }}</p>
          </div>

          <!-- Continue Button -->
          <div class="flex justify-center pt-6">
            <button
              @click="handleContinue"
              :disabled="selectedCount === 0"
              class="group/btn relative px-16 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            >
              <span class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span class="relative flex items-center justify-center gap-3">
                Continue to Dashboard
                <svg class="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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

// Filter out already tracked assets from popular assets
const filteredPopularAssets = computed(() => {
  const trackedIds = new Set(assetsStore.trackedAssets.map(a => a.coingecko_id))
  return assetsStore.popularAssets.filter(asset => !trackedIds.has(asset.coingecko_id))
})

const displayAssets = computed(() => {
  if (searchQuery.value) {
    return assetsStore.searchResults
  }
  return filteredPopularAssets.value
})

const selectedCount = computed(() => selectedAssets.value.size)

function isSelected(coingeckoId: string) {
  return selectedAssets.value.has(coingeckoId)
}

function toggleAsset(asset: AssetOutFromSearch) {
  if (selectedAssets.value.has(asset.coingecko_id)) {
    selectedAssets.value.delete(asset.coingecko_id)
  } else {
    if (selectedAssets.value.size >= 10) {
      toast({
        title: 'Limit Reached',
        description: 'You can select maximum 10 assets',
        variant: 'destructive',
      })
      return
    }
    selectedAssets.value.add(asset.coingecko_id)
  }
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
    }
  }, 300)
}

async function handleContinue() {
  if (selectedCount.value === 0) {
    toast({
      title: 'Selection Required',
      description: 'Please select at least 1 asset to continue',
      variant: 'destructive',
    })
    return
  }

  // Add selected assets to backend
  const assetIds = Array.from(selectedAssets.value)
  const success = await assetsStore.addAssets(assetIds)

  if (success) {
    // Update user profile to mark assets as selected
    authStore.user = { ...authStore.user!, assets_selected: true }
    
    toast({
      title: 'Assets Added!',
      description: `Successfully added ${selectedCount.value} asset${selectedCount.value > 1 ? 's' : ''} to your portfolio`,
      variant: 'success',
    })
    
    router.push('/dashboard')
  } else {
    toast({
      title: 'Error',
      description: 'Failed to add assets. Please try again.',
      variant: 'destructive',
    })
  }
}

onMounted(async () => {
  // Fetch tracked assets first to filter them out
  await assetsStore.fetchTrackedAssets()
  console.log('📊 Already tracked assets:', assetsStore.trackedAssets.length)
  
  // Fetch popular assets (will be filtered automatically)
  await assetsStore.fetchPopularAssets()
  console.log('🔥 Popular assets (before filter):', assetsStore.popularAssets.length)
  console.log('🔥 Popular assets (after filter):', filteredPopularAssets.value.length)
})
</script>
