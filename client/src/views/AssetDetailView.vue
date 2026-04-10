<template>
  <div v-if="asset" class="space-y-6 animate-fade-in">
    <!-- Back Button -->
    <button @click="$router.back()" class="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300">
      <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span class="font-medium">Back</span>
    </button>

    <!-- Asset Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
      <!-- Background Glow -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-6">
          <div class="flex items-center gap-5">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl blur-xl" />
              <img :src="asset.image" :alt="asset.name" class="relative w-16 h-16 rounded-2xl ring-4 ring-border/50 shadow-2xl" />
            </div>
            <div>
              <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{{ asset.name }}</h1>
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-sm font-semibold rounded-full uppercase tracking-wider">{{ asset.symbol }}</span>
                <span class="text-sm text-muted-foreground font-mono">{{ asset.coingecko_id }}</span>
              </div>
            </div>
          </div>
          
          <!-- Remove Asset Button -->
          <button
            @click="handleRemoveAsset"
            class="group/remove p-3 bg-destructive/10 border border-destructive/30 rounded-xl hover:bg-destructive hover:text-white transition-all duration-300"
            title="Remove from watchlist"
          >
            <svg class="w-5 h-5 group-hover/remove:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <!-- Price Display -->
        <div class="flex items-end gap-4">
          <div>
            <p class="text-5xl font-bold font-mono bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">${{ formatPrice(asset.current_price) }}</p>
            <p class="text-sm text-muted-foreground mt-2">Current Market Price</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Market Cap -->
      <div class="group bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <h3 class="text-muted-foreground text-sm font-medium mb-2">Asset ID</h3>
        <p class="text-xl font-bold font-mono truncate">{{ asset.id?.slice(0, 8) || 'N/A' }}</p>
      </div>

      <!-- 24h Volume -->
      <div class="group bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <h3 class="text-muted-foreground text-sm font-medium mb-2">Active Alerts</h3>
        <p class="text-3xl font-bold font-mono">{{ activeAlertsCount }}</p>
      </div>

      <!-- Circulating Supply -->
      <div class="group bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 class="text-muted-foreground text-sm font-medium mb-2">Alert Status</h3>
        <p class="text-xl font-bold text-emerald-500">Ready</p>
      </div>
    </div>

    <!-- Price History Chart -->
    <div class="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold">Price History</h2>
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-full text-sm font-semibold">
            <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Live Updates
          </span>
        </div>
      </div>
      
      <!-- Chart Area -->
      <div v-if="priceSnapshots.length > 0" class="relative h-80">
        <div class="absolute inset-0 flex items-end justify-between gap-2 px-4">
          <div
            v-for="(snapshot, index) in priceSnapshots.slice(0, 30).reverse()"
            :key="snapshot.id"
            class="flex-1 bg-gradient-to-t from-primary/60 to-accent/60 rounded-t-lg hover:from-primary hover:to-accent transition-all duration-300 cursor-pointer group/bar"
            :style="{ height: `${getBarHeight(snapshot.price_usd)}%` }"
          >
            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-xl opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              <p class="text-xs font-semibold">${{ formatPrice(snapshot.price_usd) }}</p>
              <p class="text-xs text-muted-foreground">{{ formatDate(snapshot.timestamp) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="h-80 bg-secondary/30 rounded-2xl flex items-center justify-center">
        <div class="text-center">
          <svg class="w-20 h-20 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <p class="text-muted-foreground font-medium">Price history being collected</p>
          <p class="text-sm text-muted-foreground mt-2">Chart will appear after price updates</p>
        </div>
      </div>
    </div>

    <!-- Create Alert Section -->
    <div class="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-bold">Create Price Alert</h2>
          <p class="text-sm text-muted-foreground">Get notified when price reaches your target</p>
        </div>
      </div>
      
      <form @submit.prevent="handleCreateAlert" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-foreground">Target Price ($)</label>
            <input
              v-model="alertForm.targetPrice"
              type="number"
              step="any"
              class="w-full px-6 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              placeholder="0.00"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-foreground">Condition</label>
            <select
              v-model="alertForm.conditionType"
              class="w-full px-6 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            >
              <option value="ABOVE">📈 Price goes ABOVE</option>
              <option value="BELOW">📉 Price goes BELOW</option>
            </select>
          </div>
        </div>
        <button type="submit" class="group/btn w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          <span class="flex items-center justify-center gap-3">
            <svg class="w-6 h-6 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Alert
          </span>
        </button>
      </form>
    </div>

    <!-- Active Alerts for this Asset -->
    <div class="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl overflow-hidden">
      <div class="p-8 border-b border-border/50">
        <h2 class="text-2xl font-bold">Active Alerts for {{ asset.name }}</h2>
        <p class="text-sm text-muted-foreground mt-1">Your configured price alerts</p>
      </div>
      <div class="p-8">
        <EmptyState
          title="No alerts for this asset"
          description="Create an alert above to get notified when price reaches your target"
          action-label="Create Your First Alert"
          @action="document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })"
        />
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="assetsStore.error" class="flex flex-col items-center justify-center h-96 space-y-6">
    <div class="text-center">
      <svg class="w-24 h-24 mx-auto mb-4 text-destructive/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h2 class="text-2xl font-bold mb-2">Asset Not in Database</h2>
      <p class="text-muted-foreground mb-2 max-w-md">{{ assetsStore.error }}</p>
      <p class="text-sm text-muted-foreground mb-6">You need to add this asset to your watchlist first before viewing details.</p>
      <div class="flex items-center justify-center gap-4">
        <button
          @click="handleAddAndReload"
          :disabled="isAdding"
          class="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isAdding ? 'Adding...' : 'Add to Watchlist' }}
        </button>
        <button
          @click="$router.push('/assets/search')"
          class="px-6 py-3 bg-secondary border border-border text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all duration-300"
        >
          Browse Assets
        </button>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center h-96 space-y-4">
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl animate-pulse" />
      <div class="relative animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
    </div>
    <p class="text-muted-foreground font-medium">Loading asset details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAssetsStore } from '@/stores/assets'
import { useAlertsStore } from '@/stores/alerts'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'

const route = useRoute()
const router = useRouter()
const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const { toast } = useToast()

const asset = ref(assetsStore.currentAsset)
const priceSnapshots = ref<any[]>([])
const activeAlertsCount = ref(0)
const isAdding = ref(false)

const alertForm = ref({
  targetPrice: null as number | null,
  conditionType: 'ABOVE'
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

function getBarHeight(price: number): number {
  if (priceSnapshots.value.length === 0) return 0
  const prices = priceSnapshots.value.map(s => s.price_usd)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const range = maxPrice - minPrice
  if (range === 0) return 50
  return ((price - minPrice) / range) * 80 + 10 // 10% to 90%
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function handleAddAndReload() {
  const coingeckoId = route.params.coingecko_id as string
  if (!coingeckoId) return
  
  isAdding.value = true
  console.log('➕ Adding asset to database:', coingeckoId)
  
  const success = await assetsStore.addAsset(coingeckoId)
  
  if (success) {
    toast({
      title: 'Asset Added!',
      description: 'Asset added to your watchlist. Loading details...',
      variant: 'success',
    })
    
    // Reload the asset details
    await assetsStore.fetchAssetWithPrice(coingeckoId)
    asset.value = assetsStore.currentAsset
    
    if (asset.value) {
      // Fetch price snapshots
      await assetsStore.fetchPriceSnapshots(coingeckoId, 1, 50)
      priceSnapshots.value = assetsStore.priceSnapshots
    }
  } else {
    toast({
      title: 'Error',
      description: 'Failed to add asset. Please try again.',
      variant: 'destructive',
    })
  }
  
  isAdding.value = false
}

async function handleRemoveAsset() {
  if (!asset.value) return
  
  const confirmed = confirm(`Remove ${asset.value.name} from your watchlist?`)
  if (!confirmed) return

  const success = await assetsStore.removeAsset(asset.value.coingecko_id)
  
  if (success) {
    toast({
      title: 'Asset Removed',
      description: `${asset.value.name} has been removed from your watchlist`,
      variant: 'success',
    })
    // Navigate back to dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  } else {
    toast({
      title: 'Error',
      description: 'Failed to remove asset. Please try again.',
      variant: 'destructive',
    })
  }
}

async function handleCreateAlert() {
  if (!alertForm.value.targetPrice || !asset.value) return

  const success = await alertsStore.createAlert({
    asset_id: asset.value.coingecko_id,
    target_price: alertForm.value.targetPrice,
    condition_type: alertForm.value.conditionType as 'ABOVE' | 'BELOW'
  })

  if (success) {
    toast({
      title: 'Alert Created!',
      description: `You'll be notified when price ${alertForm.value.conditionType === 'ABOVE' ? 'goes above' : 'drops below'} $${formatPrice(alertForm.value.targetPrice)}`,
      variant: 'success',
    })
    alertForm.value.targetPrice = null
    activeAlertsCount.value++
  } else {
    toast({
      title: 'Error',
      description: 'Failed to create alert. Please try again.',
      variant: 'destructive',
    })
  }
}

onMounted(async () => {
  const coingeckoId = route.params.coingecko_id as string
  
  console.log('🔍 AssetDetailView mounted, fetching:', coingeckoId)
  
  // Fetch asset details
  await assetsStore.fetchAssetWithPrice(coingeckoId)
  asset.value = assetsStore.currentAsset
  
  console.log('💎 Asset loaded:', asset.value)
  
  // Fetch price snapshots for chart
  await assetsStore.fetchPriceSnapshots(coingeckoId, 1, 50)
  priceSnapshots.value = assetsStore.priceSnapshots
  
  console.log('📊 Snapshots loaded:', priceSnapshots.value.length)
  
  // TODO: Fetch active alerts count from alerts store
  activeAlertsCount.value = 0
})

// Watch for route changes to reload asset when navigating between assets
watch(
  () => route.params.coingecko_id,
  async (newId) => {
    if (newId) {
      console.log('🔄 Route changed, reloading asset:', newId)
      await assetsStore.fetchAssetWithPrice(newId as string)
      asset.value = assetsStore.currentAsset
      
      await assetsStore.fetchPriceSnapshots(newId as string, 1, 50)
      priceSnapshots.value = assetsStore.priceSnapshots
    }
  }
)
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}
</style>
