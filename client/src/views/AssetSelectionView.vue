<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-4xl animate-fade-in">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold gradient-text mb-3">Select Your Crypto Assets</h1>
        <p class="text-muted-foreground text-lg">Choose 1-10 cryptocurrencies to track in your portfolio</p>
      </div>

      <!-- Progress -->
      <div class="glass-card p-6 mb-6">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium">Selected Assets</span>
          <span :class="['text-sm font-bold', selectedCount > 0 ? 'text-primary' : 'text-muted-foreground']">
            {{ selectedCount }}/10
          </span>
        </div>
        <div class="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            :style="{ width: `${(selectedCount / 10) * 100}%` }"
          />
        </div>
        <p v-if="selectedCount === 0" class="text-sm text-muted-foreground mt-2">
          Select at least 1 asset to continue
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-6">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search for cryptocurrencies..."
            class="input pl-12 text-lg"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="assetsStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i" class="glass-card p-6 animate-pulse">
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

      <!-- Assets Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div
          v-for="asset in displayAssets"
          :key="asset.coingecko_id"
          :class="[
            'group relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer overflow-hidden',
            isSelected(asset.coingecko_id) ? 'border-primary shadow-xl shadow-primary/20' : 'border-border/50 hover:border-primary/50 hover:shadow-primary/10'
          ]"
          @click="toggleAsset(asset)"
        >
          <!-- Selection Indicator -->
          <div v-if="isSelected(asset.coingecko_id)" class="absolute top-3 right-3">
            <div class="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg animate-scale-in">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <!-- Hover Glow Effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-3">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                <img :src="asset.image" :alt="asset.name" class="relative w-11 h-11 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-sm group-hover:text-primary transition-colors duration-200 truncate">{{ asset.name }}</h3>
                <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{{ asset.symbol }}</p>
              </div>
            </div>
            <div v-if="asset.current_price !== undefined" class="mt-3 pt-3 border-t border-border/50">
              <p class="text-lg font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${{ formatPrice(asset.current_price) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!assetsStore.isLoading && displayAssets.length === 0" class="glass-card">
        <EmptyState
          title="No assets found"
          :description="searchQuery ? 'Try a different search term' : 'Loading assets...'"
        />
      </div>

      <!-- Continue Button -->
      <div class="flex justify-center mt-8">
        <button
          @click="handleContinue"
          :disabled="selectedCount === 0"
          class="btn btn-primary px-12 py-3 text-lg"
        >
          Continue to Dashboard
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
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
import EmptyState from '@/components/ui/empty-state.vue'
import type { AssetOutFromSearch } from '@/types'

const router = useRouter()
const assetsStore = useAssetsStore()
const authStore = useAuthStore()
const { toast } = useToast()

const searchQuery = ref('')
const selectedAssets = ref<Set<string>>(new Set())

const displayAssets = computed(() => {
  if (searchQuery.value) {
    return assetsStore.searchResults
  }
  return assetsStore.popularAssets
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
  // Fetch popular assets on mount
  await assetsStore.fetchPopularAssets()
})
</script>
