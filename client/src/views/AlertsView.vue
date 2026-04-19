<template>
  <div class="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
      <!-- Background Glow Effects -->
      <div class="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-2xl sm:blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse" style="animation-duration: 4s" />
      <div class="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl sm:blur-3xl translate-y-1/3 -translate-x-1/3 animate-pulse" style="animation-duration: 5s" />
      
      <div class="relative z-10">
        <!-- Desktop Layout -->
        <div class="hidden sm:flex items-center justify-between">
          <div>
            <div class="flex items-center gap-3 sm:gap-4 mb-3">
              <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
                <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Price Alerts</h1>
                <p class="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Monitor and manage your cryptocurrency price notifications</p>
              </div>
            </div>
            <!-- Stats -->
            <div class="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-6">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span class="text-xs sm:text-sm font-semibold text-emerald-500">{{ alertsStore.activeAlerts.length }} Active</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                <span class="text-xs sm:text-sm font-semibold text-muted-foreground">{{ alertsStore.inactiveAlerts.length }} Inactive</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-primary rounded-full" />
                <span class="text-xs sm:text-sm font-semibold text-primary">{{ alertsStore.alerts.length }} Total</span>
              </div>
            </div>
          </div>
          <button 
            @click="showCreateModal = true" 
            class="group/btn relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span class="relative flex items-center gap-2 sm:gap-3">
              <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span class="hidden sm:inline">Create Alert</span>
              <span class="sm:hidden">Create</span>
            </span>
          </button>
        </div>
        
        <!-- Mobile Layout -->
        <div class="sm:hidden">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Price Alerts</h1>
                <p class="text-xs text-muted-foreground mt-0.5 font-medium">Manage your alerts</p>
              </div>
            </div>
          </div>
          
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 mb-4">
            <div class="flex flex-col items-center p-2 sm:p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mb-1" />
              <span class="text-xs font-bold text-emerald-500">{{ alertsStore.activeAlerts.length }}</span>
              <span class="text-[10px] text-emerald-500/70 font-medium">Active</span>
            </div>
            <div class="flex flex-col items-center p-2 sm:p-3 bg-muted-foreground/10 border border-muted-foreground/20 rounded-lg">
              <div class="w-2 h-2 bg-muted-foreground/50 rounded-full mb-1" />
              <span class="text-xs font-bold text-muted-foreground">{{ alertsStore.inactiveAlerts.length }}</span>
              <span class="text-[10px] text-muted-foreground/70 font-medium">Inactive</span>
            </div>
            <div class="flex flex-col items-center p-2 sm:p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div class="w-2 h-2 bg-primary rounded-full mb-1" />
              <span class="text-xs font-bold text-primary">{{ alertsStore.alerts.length }}</span>
              <span class="text-[10px] text-primary/70 font-medium">Total</span>
            </div>
          </div>
          
          <!-- Create Button (Full Width) -->
          <button 
            @click="showCreateModal = true" 
            class="w-full group/btn relative px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 active:scale-95 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span class="relative flex items-center justify-center gap-2">
              <svg class="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Create Alert
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl sm:rounded-2xl shadow-xl">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div class="relative flex gap-1.5 sm:gap-2 p-1.5 sm:p-2">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'flex-1 px-3 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300',
            activeTab === tab.value
              ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 scale-105'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          ]"
        >
          <span class="hidden sm:inline">{{ tab.label }}</span>
          <span class="sm:hidden">{{ tab.label === 'All' ? 'All' : tab.label === 'Active' ? 'Active' : 'Inactive' }}</span>
          <span v-if="tab.count > 0" class="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-white/20">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Alerts Grid -->
    <div class="relative">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 rounded-3xl blur-3xl -z-10" />
      
      <!-- Loading State -->
      <div v-if="alertsStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-48">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 rounded-2xl bg-secondary/50" />
              <div class="flex-1">
                <div class="h-5 bg-secondary/50 rounded-lg w-3/4 mb-2" />
                <div class="h-4 bg-secondary/50 rounded-lg w-1/2" />
              </div>
            </div>
            <div class="h-10 bg-secondary/50 rounded-xl w-full mb-3" />
            <div class="h-8 bg-secondary/50 rounded-lg w-2/3" />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else-if="filteredAlerts.length === 0"
        title="No alerts found"
        description="Create your first price alert to get started"
        action-label="Create Alert"
        @action="showCreateModal = true"
      />

      <!-- Alerts Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="(alert, index) in filteredAlerts"
          :key="alert.id"
          class="group relative animate-fade-in"
          :style="{ animationDelay: `${index * 0.05}s` }"
        >
          <!-- Card Container -->
          <div class="relative h-full bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:border-primary/30 group-hover:scale-[1.02]">
            <!-- Animated Background Glow -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              :class="alert.condition_type === 'ABOVE' 
                ? 'bg-gradient-to-br from-emerald-500/10 via-transparent to-accent/10' 
                : 'bg-gradient-to-br from-red-500/10 via-transparent to-accent/10'"
            />
            
            <!-- Top Accent Line -->
            <div 
              class="absolute top-0 left-0 right-0 h-1"
              :class="alert.condition_type === 'ABOVE' 
                ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-accent' 
                : 'bg-gradient-to-r from-red-500 via-red-400 to-accent'"
            />
            
            <!-- Card Content -->
            <div class="relative z-10 p-5 sm:p-6">
              <!-- Header: Icon + Status -->
              <div class="flex items-start justify-between mb-4">
                <!-- Asset Icon with Glow -->
                <div class="relative">
                  <div 
                    class="absolute inset-0 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl"
                    :class="alert.condition_type === 'ABOVE' ? 'bg-emerald-500/40' : 'bg-red-500/40'"
                  />
                  <div 
                    class="relative w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    :class="alert.condition_type === 'ABOVE' 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' 
                      : 'bg-gradient-to-br from-red-500 to-red-600'"
                  >
                    {{ alert.symbol?.[0] || alert.asset_name?.[0] || 'A' }}
                  </div>
                  <!-- Active Indicator -->
                  <div 
                    v-if="alert.is_active"
                    class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full animate-pulse"
                  />
                </div>
                
                <!-- Status Badge -->
                <span 
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-300"
                  :class="alert.is_active 
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/20' 
                    : 'bg-muted-foreground/10 border border-muted-foreground/30 text-muted-foreground'"
                >
                  <span :class="['w-1.5 h-1.5 rounded-full', alert.is_active ? 'bg-emerald-400 animate-pulse' : 'bg-muted-foreground/50']" />
                  {{ alert.is_active ? 'Active' : 'Paused' }}
                </span>
              </div>
              
              <!-- Asset Name -->
              <h3 class="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                {{ alert.asset_name || 'Unknown Asset' }}
              </h3>
              
              <!-- Symbol Badge -->
              <span v-if="alert.symbol" class="inline-block px-2 py-0.5 bg-secondary/50 border border-border/30 text-muted-foreground rounded text-[10px] font-bold uppercase tracking-wider mb-4">
                {{ alert.symbol }}
              </span>
              
              <!-- Price Alert Info -->
              <div class="mt-4 p-4 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/30 backdrop-blur-sm">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Target Price</span>
                  <div 
                    class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold"
                    :class="alert.condition_type === 'ABOVE' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'"
                  >
                    <svg v-if="alert.condition_type === 'ABOVE'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    {{ alert.condition_type === 'ABOVE' ? 'Above' : 'Below' }}
                  </div>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-2xl font-bold font-mono bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${{ formatPrice(alert.target_price) }}
                  </span>
                </div>
              </div>
              
              <!-- Footer: Time + Actions -->
              <div class="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                <!-- Created Time -->
                <div v-if="alert.created_at" class="flex items-center gap-2 text-xs text-muted-foreground">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-medium">{{ formatTimeAgo(alert.created_at) }}</span>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex items-center gap-2">
                  <!-- Toggle Button -->
                  <button
                    @click.stop="toggleAlert(alert)"
                    class="group/icon p-2 rounded-lg hover:bg-secondary/80 border border-transparent hover:border-border transition-all duration-300 hover:scale-110 active:scale-95"
                    :title="alert.is_active ? 'Disable' : 'Enable'"
                  >
                    <svg v-if="alert.is_active" class="w-4 h-4 text-emerald-400 group-hover/icon:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="w-4 h-4 text-muted-foreground group-hover/icon:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                  
                  <!-- Delete Button -->
                  <button
                    @click.stop="deleteAlert(alert.id)"
                    class="group/icon p-2 rounded-lg hover:bg-destructive/10 border border-transparent hover:border-destructive/30 text-muted-foreground hover:text-destructive transition-all duration-300 hover:scale-110 active:scale-95"
                    title="Delete"
                  >
                    <svg class="w-4 h-4 group-hover/icon:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create Alert Modal -->
    <div 
      v-if="showCreateModal" 
      class="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-4 animate-fade-in overflow-y-auto"
      @click.self="showCreateModal = false"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      
      <!-- Modal Content -->
      <div class="relative w-full max-w-2xl my-8 sm:my-auto max-h-[calc(100vh-2rem)] sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-card/95 via-card/90 to-card/80 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl animate-scale-in">
        <!-- Background Glow -->
        <div class="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl sm:blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div class="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl sm:blur-3xl translate-y-1/3 -translate-x-1/3" />
        
        <div class="relative z-10 p-4 sm:p-8">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6 sm:mb-8">
            <div class="flex items-center gap-3 sm:gap-4">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
                <svg class="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Create Alert</h2>
                <p class="text-xs sm:text-sm text-muted-foreground font-medium">Set up price monitoring for your assets</p>
              </div>
            </div>
            <button 
              @click="showCreateModal = false"
              class="group/close p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-secondary border-2 border-transparent hover:border-border transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover/close:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Form -->
          <form @submit.prevent="handleCreateAlert" class="space-y-5 sm:space-y-6">
            <!-- Asset Selection -->
            <div class="space-y-2 sm:space-y-3">
              <label class="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Select Asset</label>
              <div class="relative">
                <select
                  v-model="createForm.coingecko_id"
                  class="w-full px-4 sm:px-6 py-3 sm:py-4 bg-secondary/50 border-2 border-border/50 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer appearance-none"
                  required
                >
                  <option value="" disabled>Select a cryptocurrency</option>
                  <option v-for="asset in assetsStore.trackedAssets" :key="asset.coingecko_id" :value="asset.coingecko_id">
                    {{ asset.name }} ({{ asset.symbol }}) - ${{ formatPrice(asset.current_price) }}
                  </option>
                </select>
                <svg class="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p v-if="!assetsStore.trackedAssets || assetsStore.trackedAssets.length === 0" class="text-xs sm:text-sm text-muted-foreground">
                No assets in your watchlist. 
                <RouterLink to="/assets/search" class="text-primary hover:underline font-semibold">Add assets first</RouterLink>
              </p>
            </div>
            
            <!-- Target Price & Condition -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <!-- Target Price -->
              <div class="space-y-2 sm:space-y-3">
                <label class="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Target Price ($)</label>
                <input
                  v-model.number="createForm.target_price"
                  type="number"
                  step="any"
                  class="w-full px-4 sm:px-6 py-3 sm:py-4 bg-secondary/50 border-2 border-border/50 rounded-lg sm:rounded-xl text-base sm:text-lg font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <!-- Condition -->
              <div class="space-y-2 sm:space-y-3">
                <label class="block text-xs sm:text-sm font-bold text-foreground uppercase tracking-wider">Condition</label>
                <div class="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    type="button"
                    @click="createForm.condition_type = 'ABOVE'"
                    :class="[
                      'px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border-2',
                      createForm.condition_type === 'ABOVE'
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-500 shadow-lg shadow-emerald-500/20 scale-105'
                        : 'bg-secondary/50 border-border/50 text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-500'
                    ]"
                  >
                    <div class="flex items-center justify-center gap-1.5 sm:gap-2">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Above
                    </div>
                  </button>
                  <button
                    type="button"
                    @click="createForm.condition_type = 'BELOW'"
                    :class="[
                      'px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 border-2',
                      createForm.condition_type === 'BELOW'
                        ? 'bg-red-500/20 border-red-500/50 text-red-500 shadow-lg shadow-red-500/20 scale-105'
                        : 'bg-secondary/50 border-border/50 text-muted-foreground hover:border-red-500/30 hover:text-red-500'
                    ]"
                  >
                    <div class="flex items-center justify-center gap-1.5 sm:gap-2">
                      <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                      Below
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Current Price Info -->
            <div v-if="selectedAsset" class="p-3 sm:p-4 bg-secondary/30 border-2 border-border/30 rounded-lg sm:rounded-xl">
              <div class="flex items-center justify-between">
                <span class="text-xs sm:text-sm font-semibold text-muted-foreground">Current Price:</span>
                <span class="text-base sm:text-lg font-bold font-mono text-primary">${{ formatPrice(selectedAsset.current_price) }}</span>
              </div>
              <div class="flex items-center justify-between mt-2">
                <span class="text-xs sm:text-sm font-semibold text-muted-foreground">Target:</span>
                <span class="text-base sm:text-lg font-bold font-mono" :class="createForm.condition_type === 'ABOVE' ? 'text-emerald-500' : 'text-red-500'">${{ formatPrice(createForm.target_price || 0) }}</span>
              </div>
            </div>
            
            <!-- Submit Button -->
            <button 
              type="submit" 
              :disabled="isCreating"
              class="group/btn relative w-full py-4 sm:py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-base sm:text-lg rounded-lg sm:rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span class="relative flex items-center justify-center gap-2 sm:gap-3">
                <svg v-if="isCreating" class="w-5 h-5 sm:w-6 sm:h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-6.396-5.396m0 0H15" />
                </svg>
                <svg v-else class="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                {{ isCreating ? 'Creating...' : 'Create Alert' }}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAlertsStore } from '@/stores/alerts'
import { useAssetsStore } from '@/stores/assets'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'
import type { AlertOut } from '@/types'

const alertsStore = useAlertsStore()
const assetsStore = useAssetsStore()
const { toast } = useToast()

const activeTab = ref<'all' | 'active' | 'inactive'>('all')
const showCreateModal = ref(false)
const isCreating = ref(false)

const createForm = ref({
  coingecko_id: '',
  target_price: null as number | null,
  condition_type: 'ABOVE' as 'ABOVE' | 'BELOW'
})

const tabs = computed(() => [
  { label: 'All', value: 'all' as const, count: alertsStore.alerts.length },
  { label: 'Active', value: 'active' as const, count: alertsStore.activeAlerts.length },
  { label: 'Inactive', value: 'inactive' as const, count: alertsStore.inactiveAlerts.length }
])

const filteredAlerts = computed(() => {
  const alerts = alertsStore.alerts
  if (activeTab.value === 'active') return alerts.filter(a => a.is_active)
  if (activeTab.value === 'inactive') return alerts.filter(a => !a.is_active)
  return alerts
})

const selectedAsset = computed(() => {
  if (!createForm.value.coingecko_id) return null
  return assetsStore.trackedAssets.find(a => a.coingecko_id === createForm.value.coingecko_id)
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

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

async function toggleAlert(alert: AlertOut) {
  const success = await alertsStore.toggleAlert(alert.id)
  if (success) {
    toast({
      title: 'Alert Updated',
      description: `Alert ${alert.is_active ? 'disabled' : 'enabled'} successfully`,
      variant: 'success',
    })
  }
}

async function deleteAlert(alertId: string) {
  if (!confirm('Are you sure you want to delete this alert?')) return
  
  const success = await alertsStore.deleteAlert(alertId)
  if (success) {
    toast({
      title: 'Alert Deleted',
      description: 'The alert has been removed',
      variant: 'success',
    })
  }
}

async function handleCreateAlert() {
  if (!createForm.value.coingecko_id || !createForm.value.target_price) {
    toast({
      title: 'Validation Error',
      description: 'Please select an asset and enter a target price',
      variant: 'destructive',
    })
    return
  }

  isCreating.value = true
  
  const success = await alertsStore.createAlert({
    asset_id: createForm.value.coingecko_id,
    target_price: createForm.value.target_price,
    condition_type: createForm.value.condition_type
  })

  if (success) {
    toast({
      title: 'Alert Created!',
      description: `You'll be notified when price ${createForm.value.condition_type === 'ABOVE' ? 'goes above' : 'drops below'} $${formatPrice(createForm.value.target_price)}`,
      variant: 'success',
    })
    
    // Reset form and close modal
    createForm.value = {
      coingecko_id: '',
      target_price: null,
      condition_type: 'ABOVE'
    }
    showCreateModal.value = false
    
    // Refresh alerts list
    await alertsStore.fetchAlerts()
  } else {
    toast({
      title: 'Error',
      description: alertsStore.error || 'Failed to create alert. Please try again.',
      variant: 'destructive',
    })
  }
  
  isCreating.value = false
}

onMounted(async () => {
  await alertsStore.fetchAlerts()
  await assetsStore.fetchTrackedAssets()
})
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

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out;
}
</style>
