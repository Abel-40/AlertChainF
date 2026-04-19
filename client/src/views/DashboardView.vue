<template>
  <div class="space-y-6 md:space-y-8 animate-fade-in">
    <!-- Welcome Header -->
    <div class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card/80 to-accent/10 backdrop-blur-2xl border-2 border-primary/20 rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/10">
      <!-- Animated Background Effects -->
      <div class="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" style="animation-duration: 4s" />
      <div class="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 bg-gradient-to-tr from-accent/25 via-primary/15 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 animate-pulse" style="animation-duration: 5s" />
      <div class="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style="animation-duration: 6s" />
      
      <div class="relative z-10 p-5 sm:p-6 md:p-8 lg:p-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          <div class="flex-1">
            <!-- Greeting Icon -->
            <div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60 rounded-xl sm:rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse" style="animation-duration: 3s" />
                <div class="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl ring-2 ring-white/20">
                  <svg class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-sm md:text-base text-primary font-semibold mb-1">Good to see you back</p>
                <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold truncate">
                  <span class="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">{{ authStore.user?.full_name || 'User' }}</span>
                </h1>
              </div>
            </div>
            
            <!-- Subtitle with Stats -->
            <div class="flex flex-wrap items-center gap-2 sm:gap-3 ml-[60px] sm:ml-[72px] md:ml-[80px]">
              <div class="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span class="text-[10px] sm:text-xs font-semibold text-emerald-500">{{ activeAlertsCount }} Active</span>
              </div>
              <div class="flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500 animate-pulse" />
                <span class="text-[10px] sm:text-xs font-semibold text-purple-500">{{ notificationsStore.unreadCount }} New</span>
              </div>
            </div>
          </div>
          
          <!-- Add Asset Button -->
          <button 
            @click="showAddAssetModal = true"
            class="group relative w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] text-white font-bold rounded-xl md:rounded-2xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-500 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 text-sm md:text-base"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
            <div class="relative flex items-center gap-2 sm:gap-3">
              <div class="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-[10px] sm:text-xs font-medium opacity-80">Quick Action</p>
                <p class="text-sm sm:text-base md:text-lg font-bold -mt-0.5">Add Asset</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
      <!-- Total Tracked Assets -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-card/80 to-blue-600/5 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl md:rounded-3xl p-5 md:p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-2">
        <!-- Animated Background -->
        <div class="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-700" />
        <div class="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-blue-400/15 to-transparent rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-700" />
        
        <div class="relative z-10">
          <!-- Icon & Badge -->
          <div class="flex items-start justify-between mb-4 md:mb-5">
            <div class="relative group/icon">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl md:rounded-2xl blur-lg group-hover/icon:blur-xl transition-all duration-500 animate-pulse" style="animation-duration: 3s" />
              <div class="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-transform duration-500">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div class="px-2.5 py-1 md:px-3 md:py-1.5 bg-blue-500/15 border-2 border-blue-500/40 rounded-full">
              <span class="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-wider">Total</span>
            </div>
          </div>
          
          <!-- Content -->
          <div class="space-y-2 md:space-y-3">
            <h3 class="text-xs md:text-sm font-bold text-blue-300 uppercase tracking-wider">Tracked Assets</h3>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl md:text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent animate-gradient-x">{{ assetsStore.trackedAssets.length }}</p>
            </div>
          </div>
          
          <!-- Bottom Accent -->
          <div class="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-blue-500/20">
            <div class="flex items-center gap-2 text-[10px] md:text-xs text-blue-300/70">
              <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>Portfolio size</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Alerts -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-card/80 to-emerald-600/5 backdrop-blur-xl border-2 border-emerald-500/30 rounded-2xl md:rounded-3xl p-5 md:p-6 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-2">
        <!-- Animated Background -->
        <div class="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-700" />
        <div class="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-700" />
        
        <div class="relative z-10">
          <!-- Icon & Badge -->
          <div class="flex items-start justify-between mb-4 md:mb-5">
            <div class="relative group/icon">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl md:rounded-2xl blur-lg group-hover/icon:blur-xl transition-all duration-500 animate-pulse" style="animation-duration: 3s" />
              <div class="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-transform duration-500">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 bg-emerald-500/15 border-2 border-emerald-500/40 rounded-full">
              <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span class="text-[10px] md:text-xs font-bold text-emerald-400 uppercase tracking-wider">Live</span>
            </div>
          </div>
          
          <!-- Content -->
          <div class="space-y-2 md:space-y-3">
            <h3 class="text-xs md:text-sm font-bold text-emerald-300 uppercase tracking-wider">Active Alerts</h3>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl md:text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">{{ activeAlertsCount }}</p>
            </div>
          </div>
          
          <!-- Bottom Accent -->
          <div class="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-emerald-500/20">
            <div class="flex items-center gap-2 text-[10px] md:text-xs text-emerald-300/70">
              <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Monitoring prices</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Unread Notifications -->
      <div class="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-card/80 to-purple-600/5 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl md:rounded-3xl p-5 md:p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
        <!-- Animated Background -->
        <div class="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl group-hover:w-40 group-hover:h-40 transition-all duration-700" />
        <div class="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-tr from-purple-400/15 to-transparent rounded-full blur-2xl group-hover:w-32 group-hover:h-32 transition-all duration-700" />
        
        <div class="relative z-10">
          <!-- Icon & Badge -->
          <div class="flex items-start justify-between mb-4 md:mb-5">
            <div class="relative group/icon">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl md:rounded-2xl blur-lg group-hover/icon:blur-xl transition-all duration-500 animate-pulse" style="animation-duration: 3s" />
              <div class="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-transform duration-500">
                <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
            </div>
            <div v-if="notificationsStore.unreadCount > 0" class="px-2.5 py-1 md:px-3 md:py-1.5 bg-destructive/15 border-2 border-destructive/40 rounded-full animate-pulse">
              <span class="text-[10px] md:text-xs font-bold text-destructive">{{ notificationsStore.unreadCount > 99 ? '99+' : notificationsStore.unreadCount }}</span>
            </div>
          </div>
          
          <!-- Content -->
          <div class="space-y-2 md:space-y-3">
            <h3 class="text-xs md:text-sm font-bold text-purple-300 uppercase tracking-wider">Unread Notifications</h3>
            <div class="flex items-baseline gap-2">
              <p class="text-3xl md:text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent animate-gradient-x">{{ notificationsStore.unreadCount }}</p>
            </div>
          </div>
          
          <!-- Bottom Accent -->
          <div class="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-purple-500/20">
            <div class="flex items-center gap-2 text-[10px] md:text-xs text-purple-300/70">
              <div class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Awaiting attention</span>
            </div>
          </div>
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
          
          <!-- Loading State -->
          <div v-if="alertsStore.isLoading" class="p-4 md:p-6">
            <div class="space-y-3">
              <div v-for="i in 3" :key="i" class="animate-pulse flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <div class="w-10 h-10 rounded-lg bg-secondary" />
                <div class="flex-1">
                  <div class="h-4 bg-secondary rounded w-3/4 mb-2" />
                  <div class="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Alerts List -->
          <div v-else-if="alertsStore.alerts.length > 0" class="p-4 md:p-6 space-y-3 max-h-80 overflow-y-auto">
            <div
              v-for="alert in alertsStore.alerts.slice(0, 5)"
              :key="alert.id"
              class="group p-3 rounded-xl border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              <div class="flex items-start gap-3">
                <!-- Alert Icon -->
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  alert.is_active 
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30' 
                    : 'bg-gradient-to-br from-secondary to-secondary/80'
                ]">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                  </svg>
                </div>
                
                <!-- Alert Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-sm truncate">{{ alert.asset_name }}</h3>
                    <span :class="[
                      'px-2 py-0.5 text-[10px] font-bold rounded-full',
                      alert.is_active 
                        ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' 
                        : 'bg-secondary text-muted-foreground border border-border/50'
                    ]">
                      {{ alert.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                  <p class="text-xs text-muted-foreground truncate">
                    {{ alert.condition_type }} at ${{ formatPrice(alert.target_price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="p-4 md:p-6">
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
          
          <!-- Loading State -->
          <div v-if="notificationsStore.isLoading" class="p-4 md:p-6">
            <div class="space-y-3">
              <div v-for="i in 3" :key="i" class="animate-pulse flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                <div class="w-10 h-10 rounded-lg bg-secondary" />
                <div class="flex-1">
                  <div class="h-4 bg-secondary rounded w-3/4 mb-2" />
                  <div class="h-3 bg-secondary rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Notifications List -->
          <div v-else-if="notificationsStore.notifications.length > 0" class="p-4 md:p-6 space-y-3 max-h-80 overflow-y-auto">
            <div
              v-for="notification in notificationsStore.notifications.slice(0, 5)"
              :key="notification.id"
              @click="$router.push(`/notifications/${notification.id}`)"
              class="group p-3 rounded-xl border-2 border-border/50 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer"
            >
              <div class="flex items-start gap-3">
                <!-- Notification Icon -->
                <div :class="[
                  'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                  notification.status === 'FAILED'
                    ? 'bg-gradient-to-br from-destructive to-destructive/80 shadow-lg shadow-destructive/30'
                    : notification.status === 'SENT'
                    ? 'bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30'
                    : 'bg-gradient-to-br from-secondary to-secondary/80'
                ]">
                  <svg v-if="notification.status === 'FAILED'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <svg v-else-if="notification.status === 'SENT'" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <!-- Notification Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h3 class="font-bold text-sm truncate">{{ notification.message || 'Notification' }}</h3>
                    <span v-if="!notification.is_read" class="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  </div>
                  <p class="text-xs text-muted-foreground truncate">
                    {{ formatDate(notification.created_at) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-else class="p-4 md:p-6">
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
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAssetsStore } from '@/stores/assets'
import { useAlertsStore } from '@/stores/alerts'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'

const authStore = useAuthStore()
const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const showAddAssetModal = ref(false)
const searchQuery = ref('')
let searchTimeout: NodeJS.Timeout | null = null

// Computed property for active alerts count
const activeAlertsCount = computed(() => alertsStore.activeAlerts.length)

function formatPrice(price: number) {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
  
  // Fetch alerts to get active count
  await alertsStore.fetchAlerts()
  
  // Fetch notifications list and unread count
  await notificationsStore.fetchNotifications()
  await notificationsStore.fetchUnreadCount()
})
</script>
