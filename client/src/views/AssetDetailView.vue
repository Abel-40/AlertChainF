<template>
  <div v-if="asset" class="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
    <!-- Asset Hero Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/95 via-card/80 to-card/60 backdrop-blur-2xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl shadow-primary/5">
      <!-- Animated Background Effects -->
      <div class="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-2xl sm:blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse" style="animation-duration: 4s" />
      <div class="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tr from-accent/20 via-primary/15 to-transparent rounded-full blur-2xl sm:blur-3xl translate-y-1/3 -translate-x-1/3 animate-pulse" style="animation-duration: 5s" />
      
      <div class="relative z-10">
        <!-- Top Bar: Back Button & Actions -->
        <div class="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-border/30">
          <button @click="$router.back()" class="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300">
            <div class="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span class="font-semibold text-sm sm:text-base hidden sm:inline">Back</span>
          </button>
          
          <!-- Action Buttons -->
          <div class="flex items-center gap-2 sm:gap-3">
            <button
              @click="handleRemoveAsset"
              class="group/remove p-2 sm:p-2.5 bg-destructive/10 border-2 border-destructive/30 rounded-lg hover:bg-destructive hover:text-white hover:border-destructive hover:shadow-lg hover:shadow-destructive/30 transition-all duration-300"
              title="Remove from watchlist"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover/remove:scale-110 group-hover/remove:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              @click="$router.push(`/assets/${asset.coingecko_id}/more`)"
              class="px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-semibold text-xs sm:text-sm hover:scale-105 active:scale-95"
            >
              <span class="flex items-center gap-1.5 sm:gap-2">
                <span class="hidden sm:inline">More Details</span>
                <span class="sm:hidden">Details</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="p-4 sm:p-6 lg:p-8">
          <!-- Asset Info & Price -->
          <div class="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <!-- Asset Icon -->
            <div class="relative group flex-shrink-0">
              <div class="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" style="animation-duration: 3s" />
              <div class="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden ring-2 sm:ring-4 ring-border/50 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <img :src="asset.image" :alt="asset.name" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <!-- Asset Details -->
            <div class="flex-1">
              <div class="flex items-start justify-between gap-3 mb-3">
                <div class="flex-1 min-w-0">
                  <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x truncate">{{ asset.name }}</h1>
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="px-3 py-1 bg-primary/15 border-2 border-primary/40 text-primary text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider shadow-lg shadow-primary/20">{{ asset.symbol }}</span>
                    <span class="text-xs text-muted-foreground font-mono bg-secondary/50 px-2 py-1 rounded-lg border border-border/30 truncate max-w-[120px] sm:max-w-none">{{ asset.coingecko_id }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Price Display -->
              <div class="flex items-baseline gap-3">
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-xl" />
                  <p class="relative text-3xl sm:text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">${{ formatPrice(asset.current_price) }}</p>
                </div>
              </div>
              <p class="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">Current Market Price</p>
            </div>
          </div>
          
          <!-- Stats Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <!-- Asset ID Card -->
            <div class="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl p-4 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:w-24 group-hover:h-24 transition-all duration-300" />
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <p class="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-wider">Asset ID</p>
                </div>
                <p class="text-sm sm:text-base font-bold font-mono text-blue-300 truncate">{{ asset.id?.slice(0, 8) || 'N/A' }}</p>
              </div>
            </div>

            <!-- Active Alerts Card -->
            <div class="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-4 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:w-24 group-hover:h-24 transition-all duration-300" />
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                    </svg>
                  </div>
                  <p class="text-[10px] sm:text-xs text-purple-400 font-bold uppercase tracking-wider">Active Alerts</p>
                </div>
                <p class="text-2xl sm:text-3xl font-bold font-mono text-purple-300">{{ activeAlertsCount }}</p>
              </div>
            </div>

            <!-- Alert Status Card -->
            <div class="group relative overflow-hidden bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm border-2 border-emerald-500/30 rounded-xl p-4 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <div class="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:w-24 group-hover:h-24 transition-all duration-300" />
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p class="text-[10px] sm:text-xs text-emerald-400 font-bold uppercase tracking-wider">Alert Status</p>
                </div>
                <p class="text-lg sm:text-xl font-bold text-emerald-300">Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Price History Chart -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl">
      <!-- Background Glow Effects -->
      <div class="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl sm:blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div class="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl sm:blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div class="relative z-10 p-4 sm:p-6 lg:p-8">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 class="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Price History</h2>
            <p class="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{{ chartTimeRangeLabel }}</p>
          </div>
          <span class="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold">
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span class="hidden sm:inline">Live</span>
          </span>
        </div>
        
        <!-- Time Range Selector -->
        <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 p-1.5 sm:p-2 bg-secondary/30 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <button
            v-for="range in timeRanges"
            :key="range.value"
            @click="selectTimeRange(range)"
            :class="[
              'flex-1 min-w-[50px] sm:min-w-[60px] px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300',
              selectedTimeRange.value === range.value
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-105'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
            ]"
          >
            {{ range.label }}
          </button>
        </div>
        
        <!-- Chart Component -->
        <div class="relative">
          <div v-if="!isChartLoading && chartData.length > 0" class="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-card/50 to-card/30 border border-border/30 p-3 sm:p-4 lg:p-6" style="height: 300px;">
            <div class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            <PriceChart :snapshots="chartData" :time-range="selectedTimeRange" />
          </div>
          <div v-else-if="isChartLoading" class="rounded-xl sm:rounded-2xl flex items-center justify-center" style="height: 300px;">
            <div class="text-center">
              <div class="relative inline-block mb-4 sm:mb-6">
                <div class="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl sm:blur-2xl animate-pulse" />
                <div class="relative animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 sm:w-16 border-3 sm:border-4 border-primary/30 border-t-primary" />
              </div>
              <p class="text-sm sm:text-lg text-muted-foreground font-semibold mb-1 sm:mb-2">{{ chartLoadingMessage }}</p>
              <p class="text-xs sm:text-sm text-muted-foreground/70">Please wait...</p>
              <div class="mt-4 sm:mt-6 flex justify-center gap-1">
                <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0s" />
                <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.1s" />
                <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s" />
              </div>
            </div>
          </div>
          <div v-else class="rounded-xl sm:rounded-2xl flex items-center justify-center" style="height: 300px;">
            <div class="text-center">
              <div class="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-secondary/50 flex items-center justify-center">
                <svg class="w-8 h-8 sm:w-12 sm:h-12 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p class="text-sm sm:text-lg text-muted-foreground font-semibold mb-1 sm:mb-2">No price data available</p>
              <p class="text-xs sm:text-sm text-muted-foreground/70">Try selecting a different time range</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Alert Section -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl">
      <!-- Background Glow -->
      <div class="absolute top-1/2 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-2xl sm:blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <div class="relative z-10 p-4 sm:p-6 lg:p-10">
        <div class="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Create Price Alert</h2>
            <p class="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Get notified when price reaches your target</p>
          </div>
        </div>
        
        <form @submit.prevent="handleCreateAlert" class="space-y-6 sm:space-y-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Target Price ($)</label>
              <input
                v-model="alertForm.targetPrice"
                type="number"
                step="any"
                class="w-full px-4 sm:px-6 py-3 sm:py-5 bg-secondary/50 border-2 border-border/50 rounded-lg sm:rounded-xl text-base sm:text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
                placeholder="0.00"
                required
              />
            </div>
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Condition</label>
              <select
                v-model="alertForm.conditionType"
                class="w-full px-4 sm:px-6 py-3 sm:py-5 bg-secondary/50 border-2 border-border/50 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
              >
                <option value="ABOVE">📈 Price goes ABOVE</option>
                <option value="BELOW">📉 Price goes BELOW</option>
              </select>
            </div>
          </div>
          <button type="submit" class="group/btn relative w-full py-3 sm:py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span class="relative flex items-center justify-center gap-2 sm:gap-3">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Alert
            </span>
          </button>
        </form>
      </div>
    </div>

    <!-- Active Alerts for this Asset -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl">
      <!-- Background Glow -->
      <div class="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl sm:blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div class="relative z-10">
        <div class="p-4 sm:p-6 lg:p-10 border-b border-border/50">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Active Alerts for {{ asset.name }}</h2>
          <p class="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 font-medium">Your configured price alerts</p>
        </div>
        <div class="p-4 sm:p-6 lg:p-10">
          <EmptyState
            title="No alerts for this asset"
            description="Create an alert above to get notified when price reaches your target"
            action-label="Create Your First Alert"
            @action="scrollToAlertForm"
          />
        </div>
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
import PriceChart from '@/components/PriceChart.vue'
import { HistoricalPricePoint, PriceSnapshotOut } from '@/types'

const route = useRoute()
const router = useRouter()
const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const { toast } = useToast()

const asset = ref(assetsStore.currentAsset)
const priceSnapshots = ref<PriceSnapshotOut[]>([])
const activeAlertsCount = ref(0)
const isAdding = ref(false)

// Chart data and loading states
const chartData = ref<HistoricalPricePoint[]>([])
const isChartLoading = ref(false)
const chartLoadingMessage = ref('Loading price data...')

// Time range selection
const selectedTimeRange = ref({ label: '5m', value: 0, isHours: false })
const timeRanges = [
  { label: '5m', value: 0, isHours: false },
  { label: '1H', value: 1/24, isHours: true },
  { label: '3H', value: 3/24, isHours: true },
  { label: '6H', value: 6/24, isHours: true },
  { label: '12H', value: 12/24, isHours: true },
  { label: '1D', value: 1, isHours: true },
  { label: '7D', value: 7, isHours: true },
  { label: '30D', value: 30, isHours: true },
  { label: '1Y', value: 365, isHours: true },
]

const chartTimeRangeLabel = computed(() => {
  if (selectedTimeRange.value.value === 0) {
    return 'Real-time price movements (last 5 minutes)'
  } else if (selectedTimeRange.value.value < 1) {
    const hours = Math.round(selectedTimeRange.value.value * 24)
    return `Price history (last ${hours} hour${hours > 1 ? 's' : ''})`
  } else {
    const days = selectedTimeRange.value.value
    if (days >= 365) {
      return `Price history (last ${Math.round(days / 365)} year${days >= 730 ? 's' : ''})`
    }
    return `Price history (last ${days} day${days > 1 ? 's' : ''})`
  }
})

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

async function selectTimeRange(range: typeof timeRanges[0]) {
  selectedTimeRange.value = range
  const coingeckoId = route.params.coingecko_id as string
  
  if (!coingeckoId || !asset.value) return
  
  isChartLoading.value = true
  
  try {
    if (range.value === 0) {
      // 5 minutes - use price snapshots from DB
      chartLoadingMessage.value = 'Loading recent price data...'
      await assetsStore.fetchPriceSnapshots(coingeckoId, 1, 50)
      
      // Convert PriceSnapshotOut to HistoricalPricePoint format
      chartData.value = assetsStore.priceSnapshots.map(snapshot => ({
        timestamp: snapshot.timestamp,
        price_usd: snapshot.price_usd
      }))
    } else {
      // 1 hour or more - fetch historical data
      chartLoadingMessage.value = `Fetching ${range.label} price data...`
      await assetsStore.fetchHistoricalPrices(coingeckoId, range.value)
      chartData.value = assetsStore.historicalPrices
    }
    
    if (chartData.value.length === 0) {
      toast({
        title: 'No Data Available',
        description: `No price data available for ${range.label} time range`,
        variant: 'default',
      })
    }
  } catch (error) {
    console.error('❌ Error fetching chart data:', error)
    toast({
      title: 'Error',
      description: 'Failed to load price data',
      variant: 'destructive',
    })
    chartData.value = []
  } finally {
    isChartLoading.value = false
  }
}

function scrollToAlertForm() {
  const form = document.querySelector('form')
  if (form) {
    form.scrollIntoView({ behavior: 'smooth' })
  }
}

async function handleAddAndReload() {
  const coingeckoId = route.params.coingecko_id as string
  if (!coingeckoId) return
  
  isAdding.value = true
  console.log('➕ Adding asset to database:', coingeckoId)
  
  const success = await assetsStore.addAsset(coingeckoId)
  
  if (success) {
    console.log('✅ Asset added, reloading full page data...')
    toast({
      title: 'Asset Added!',
      description: 'Asset added to your watchlist. Loading details...',
      variant: 'success',
    })
    
    // Clear error state first
    assetsStore.error = null
    
    // Reload the asset details
    await assetsStore.fetchAssetWithPrice(coingeckoId)
    asset.value = assetsStore.currentAsset
    
    console.log('💎 Asset loaded after add:', asset.value)
    
    if (asset.value) {
      // Load initial chart data (5m)
      await selectTimeRange(timeRanges[0])
      
      // Prefetch coin details in background
      assetsStore.fetchCoinDetails(coingeckoId).then(() => {
        console.log('✅ Coin details prefetched after adding asset')
      }).catch(err => {
        console.warn('⚠️ Background prefetch of coin details failed:', err)
      })
    }
  } else {
    console.error('❌ Failed to add asset')
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
  
  // Prefetch coin details in background (don't await - let it load asynchronously)
  // This way when user clicks "More Details", data will already be cached
  assetsStore.fetchCoinDetails(coingeckoId).then(() => {
    console.log('✅ Coin details prefetched in background')
  }).catch(err => {
    console.warn('⚠️ Background prefetch of coin details failed:', err)
  })
  
  // Load initial chart data (5m by default)
  await selectTimeRange(timeRanges[0])
  
  console.log('📊 Chart data loaded:', chartData.value.length)
  
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
      
      // Prefetch coin details in background for the new asset
      assetsStore.fetchCoinDetails(newId as string).then(() => {
        console.log('✅ Coin details prefetched in background for:', newId)
      }).catch(err => {
        console.warn('⚠️ Background prefetch of coin details failed:', err)
      })
      
      // Reload chart data with current time range
      await selectTimeRange(selectedTimeRange.value)
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
