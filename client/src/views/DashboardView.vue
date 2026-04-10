<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold mb-2">
          Welcome back, <span class="gradient-text">{{ authStore.user?.full_name || 'User' }}</span>
        </h1>
        <p class="text-muted-foreground">Here's your crypto portfolio overview</p>
      </div>
      <RouterLink to="/assets/search" class="btn btn-primary flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Asset
      </RouterLink>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Portfolio Value -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span class="badge badge-success">+2.5%</span>
        </div>
        <h3 class="text-muted-foreground text-sm mb-1">Total Tracked Assets</h3>
        <p class="text-3xl font-bold font-mono">{{ assetsStore.trackedAssets.length }}</p>
      </div>

      <!-- 24h Change -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span class="badge badge-success">Live</span>
        </div>
        <h3 class="text-muted-foreground text-sm mb-1">Active Alerts</h3>
        <p class="text-3xl font-bold font-mono">{{ activeAlertsCount }}</p>
      </div>

      <!-- Active Alerts -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-xl">
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
            </svg>
          </div>
          <span v-if="notificationsStore.unreadCount > 0" class="badge badge-danger">{{ notificationsStore.unreadCount }}</span>
        </div>
        <h3 class="text-muted-foreground text-sm mb-1">Unread Notifications</h3>
        <p class="text-3xl font-bold font-mono">{{ notificationsStore.unreadCount }}</p>
      </div>
    </div>

    <!-- Tracked Assets Section -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
      <div class="p-6 border-b border-border">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Your Tracked Assets</h2>
          <RouterLink to="/assets/search" class="text-sm text-primary hover:underline">
            View All →
          </RouterLink>
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
        @action="$router.push('/assets/search')"
      />

      <!-- Assets List -->
      <div v-else class="divide-y divide-border/50">
        <div
          v-for="asset in assetsStore.trackedAssets.slice(0, 5)"
          :key="asset.id"
          class="group relative p-5 hover:bg-secondary/20 transition-all duration-300 cursor-pointer overflow-hidden"
          @click="$router.push(`/assets/${asset.coingecko_id}`)"
        >
          <!-- Hover Glow -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <img :src="asset.image" :alt="asset.name" class="relative w-12 h-12 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300" />
                </div>
                <div>
                  <h3 class="font-bold text-base group-hover:text-primary transition-colors duration-200">{{ asset.name }}</h3>
                  <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">{{ asset.symbol }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">${{ formatPrice(asset.current_price) }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">Current Price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Alerts & Notifications Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Alerts -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
        <div class="p-6 border-b border-border">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Recent Alerts</h2>
            <RouterLink to="/alerts" class="text-sm text-primary hover:underline">
              View All →
            </RouterLink>
          </div>
        </div>
        <div class="p-6">
          <EmptyState
            title="No alerts yet"
            description="Create price alerts to get notified"
            action-label="Create Alert"
            @action="$router.push('/alerts')"
          />
        </div>
      </div>

      <!-- Recent Notifications -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
        <div class="p-6 border-b border-border">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">Recent Notifications</h2>
            <RouterLink to="/notifications" class="text-sm text-primary hover:underline">
              View All →
            </RouterLink>
          </div>
        </div>
        <div class="p-6">
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAssetsStore } from '@/stores/assets'
import { useNotificationsStore } from '@/stores/notifications'
import EmptyState from '@/components/ui/empty-state.vue'

const authStore = useAuthStore()
const assetsStore = useAssetsStore()
const notificationsStore = useNotificationsStore()

const activeAlertsCount = ref(0)

function formatPrice(price: number) {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

onMounted(async () => {
  // Fetch tracked assets
  await assetsStore.fetchTrackedAssets()
  
  // Fetch unread notifications count
  await notificationsStore.fetchUnreadCount()
})
</script>
