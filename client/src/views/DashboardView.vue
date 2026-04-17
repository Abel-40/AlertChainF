<template>
  <div class="space-y-6 md:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
      <!-- Background Glow -->
      <div class="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div>
          <h1 class="text-2xl md:text-4xl font-bold mb-2">
            Welcome back, <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{{ authStore.user?.full_name || 'User' }}</span>
          </h1>
          <p class="text-sm md:text-lg text-muted-foreground">Here's your crypto portfolio overview</p>
        </div>
        <button 
          @click="showAddAssetModal = true"
          class="group px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 text-sm md:text-base"
        >
          <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="hidden sm:inline">Add Asset</span>
          <span class="sm:hidden">Add</span>
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <!-- Total Tracked Assets -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-4 md:p-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-1">
        <div class="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="px-2 py-0.5 md:px-3 md:py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] md:text-xs font-bold rounded-full">Total</span>
          </div>
          <h3 class="text-muted-foreground text-xs md:text-sm font-semibold mb-1 md:mb-2 uppercase tracking-wider">Tracked Assets</h3>
          <p class="text-3xl md:text-4xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{{ assetsStore.trackedAssets.length }}</p>
        </div>
      </div>

      <!-- Active Alerts -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-4 md:p-6 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-1">
        <div class="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
              </svg>
            </div>
            <span class="px-2 py-0.5 md:px-3 md:py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] md:text-xs font-bold rounded-full">Live</span>
          </div>
          <h3 class="text-muted-foreground text-xs md:text-sm font-semibold mb-1 md:mb-2 uppercase tracking-wider">Active Alerts</h3>
          <p class="text-3xl md:text-4xl font-bold font-mono text-emerald-500">{{ activeAlertsCount }}</p>
        </div>
      </div>

      <!-- Unread Notifications -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl border border-border/50 rounded-2xl p-4 md:p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1">
        <div class="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-500" />
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <div class="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <span v-if="notificationsStore.unreadCount > 0" class="px-2 py-0.5 md:px-3 md:py-1 bg-destructive/10 border border-destructive/30 text-destructive text-[10px] md:text-xs font-bold rounded-full">{{ notificationsStore.unreadCount }}</span>
          </div>
          <h3 class="text-muted-foreground text-xs md:text-sm font-semibold mb-1 md:mb-2 uppercase tracking-wider">Unread Notifications</h3>
          <p class="text-3xl md:text-4xl font-bold font-mono text-purple-500">{{ notificationsStore.unreadCount }}</p>
        </div>
      </div>
    </div>

    <!-- Tracked Assets Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl">
      <!-- Background Glow -->
      <div class="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div class="relative z-10">
        <div class="p-4 md:p-6 border-b border-border/50">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Tracked Assets</h2>
              <p class="text-xs md:text-sm text-muted-foreground mt-1">Monitor your favorite cryptocurrencies</p>
            </div>
            <button 
              @click="showAddAssetModal = true"
              class="px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 border border-primary/30 text-primary rounded-xl hover:bg-primary/20 transition-all duration-300 font-semibold text-xs md:text-sm"
            >
              + Add
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="assetsStore.isLoading" class="p-6">
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
          v-else-if="assetsStore.trackedAssets.length === 0"
          title="No assets tracked yet"
          description="Start tracking your favorite cryptocurrencies"
          action-label="Add Assets"
          @action="showAddAssetModal = true"
        />

        <!-- Assets List -->
        <div v-else class="divide-y divide-border/50">
          <div
            v-for="asset in assetsStore.trackedAssets.slice(0, 5)"
            :key="asset.id"
            class="group relative p-4 md:p-5 hover:bg-secondary/20 transition-all duration-300 cursor-pointer overflow-hidden"
            @click="$router.push(`/assets/${asset.coingecko_id}`)"
          >
            <!-- Hover Glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div class="relative z-10">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                  <div class="relative flex-shrink-0">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                    <img :src="asset.image" :alt="asset.name" class="relative w-10 h-10 md:w-12 md:h-12 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="font-bold text-sm md:text-base group-hover:text-primary transition-colors duration-200 truncate">{{ asset.name }}</h3>
                    <p class="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ asset.symbol }}</p>
                  </div>
                </div>
                <div class="text-right flex-shrink-0 ml-2">
                  <p class="text-base md:text-xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${{ formatPrice(asset.current_price) }}</p>
                  <p class="text-[10px] md:text-xs text-muted-foreground mt-0.5 hidden sm:block">Current Price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Alerts & Notifications Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <!-- Recent Alerts -->
      <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl">
        <div class="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div class="relative z-10">
          <div class="p-4 md:p-6 border-b border-border/50">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Recent Alerts</h2>
                <p class="text-xs md:text-sm text-muted-foreground mt-1">Your price monitoring alerts</p>
              </div>
              <RouterLink to="/alerts" class="text-xs md:text-sm text-primary hover:underline font-semibold">
                View All →
              </RouterLink>
            </div>
          </div>
          <div class="p-4 md:p-6">
            <EmptyState
              title="No alerts yet"
              description="Create price alerts to get notified"
              action-label="Create Alert"
              @action="$router.push('/alerts')"
            />
          </div>
        </div>
      </div>

      <!-- Recent Notifications -->
      <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl md:rounded-3xl shadow-2xl">
        <div class="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div class="relative z-10">
          <div class="p-4 md:p-6 border-b border-border/50">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Recent Notifications</h2>
                <p class="text-xs md:text-sm text-muted-foreground mt-1">System updates and alerts</p>
              </div>
              <RouterLink to="/notifications" class="text-xs md:text-sm text-primary hover:underline font-semibold">
                View All →
              </RouterLink>
            </div>
          </div>
          <div class="p-4 md:p-6">
            <EmptyState
              title="No notifications"
              description="Your notifications will appear here"
              action-label="View Notifications"
              @action="$router.push('/notifications')"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Add Asset Modal -->
    <Teleport to="body">
      <div v-if="showAddAssetModal" class="fixed inset-0 z-[9999] flex items-center justify-center p-3 md:p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showAddAssetModal = false" />
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl bg-card border-2 border-border rounded-2xl md:rounded-3xl shadow-2xl animate-fade-in overflow-hidden max-h-[90vh] flex flex-col" style="z-index: 10000;">
          <!-- Modal Header -->
          <div class="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 p-4 md:p-6 border-b border-border">
            <div class="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div class="relative z-10 flex items-center justify-between">
              <div>
                <h2 class="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Add New Asset</h2>
                <p class="text-xs md:text-sm text-muted-foreground mt-1">Search and add cryptocurrencies to track</p>
              </div>
              <button 
                @click="showAddAssetModal = false"
                class="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Search Bar -->
          <div class="p-4 md:p-6 border-b border-border">
            <div class="relative">
              <svg class="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search by name or symbol..."
                class="w-full pl-10 md:pl-12 pr-4 py-3 md:py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            </div>
          </div>

          <!-- Search Results -->
          <div class="p-4 md:p-6 max-h-80 md:max-h-96 overflow-y-auto">
          <!-- Loading State -->
          <div v-if="assetsStore.isLoading" class="flex items-center justify-center py-12">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl animate-pulse" />
              <div class="relative animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
          </div>

          <!-- Results -->
          <div v-else-if="assetsStore.searchResults.length > 0" class="space-y-2 md:space-y-3">
            <div
              v-for="coin in assetsStore.searchResults"
              :key="coin.coingecko_id"
              class="group flex items-center justify-between p-3 md:p-4 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
              @click="addAsset(coin)"
            >
              <div class="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                <img :src="coin.image" :alt="coin.name" class="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0" />
                <div class="min-w-0">
                  <h3 class="font-bold text-sm md:text-base truncate">{{ coin.name }}</h3>
                  <p class="text-xs md:text-sm text-muted-foreground uppercase">{{ coin.symbol }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3 flex-shrink-0 ml-2">
                <button class="px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-semibold text-xs md:text-sm">
                  Add
                </button>
              </div>
            </div>
          </div>

          <!-- No Results -->
          <div v-else-if="searchQuery.length > 0" class="text-center py-12">
            <svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-muted-foreground font-medium">No assets found</p>
            <p class="text-sm text-muted-foreground/70 mt-1">Try a different search term</p>
          </div>

          <!-- Initial State -->
          <div v-else class="text-center py-12">
            <svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p class="text-muted-foreground font-medium">Search for cryptocurrencies</p>
            <p class="text-sm text-muted-foreground/70 mt-1">Enter a name or symbol to get started</p>
          </div>
        </div>
      </div>
    </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAssetsStore } from '@/stores/assets'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'

const authStore = useAuthStore()
const assetsStore = useAssetsStore()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const activeAlertsCount = ref(0)
const showAddAssetModal = ref(false)
const searchQuery = ref('')
let searchTimeout: NodeJS.Timeout | null = null

function formatPrice(price: number) {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

function handleSearch() {
  if (searchTimeout) clearTimeout(searchTimeout)
  
  searchTimeout = setTimeout(async () => {
    if (searchQuery.value.trim().length < 2) {
      return
    }
    
    await assetsStore.searchAssets(searchQuery.value)
  }, 500)
}

async function addAsset(coin: any) {
  const success = await assetsStore.addAsset(coin.coingecko_id)
  
  if (success) {
    toast({
      title: 'Asset Added!',
      description: `${coin.name} has been added to your watchlist`,
      variant: 'success',
    })
    
    // Refresh tracked assets
    await assetsStore.fetchTrackedAssets()
    
    // Clear search
    searchQuery.value = ''
    
    // Close modal after a short delay
    setTimeout(() => {
      showAddAssetModal.value = false
    }, 500)
  } else {
    toast({
      title: 'Error',
      description: 'Failed to add asset. Please try again.',
      variant: 'destructive',
    })
  }
}

onMounted(async () => {
  // Fetch tracked assets
  await assetsStore.fetchTrackedAssets()
  
  // Fetch unread notifications count
  await notificationsStore.fetchUnreadCount()
})
</script>
