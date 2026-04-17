<template>
  <div v-if="coinDetails" class="animate-fade-in pb-8">
    <!-- Sticky Header with Back Button -->
    <div class="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <button @click="$router.back()" class="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300">
            <div class="w-10 h-10 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <svg class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span class="font-semibold hidden sm:inline">Back to Asset</span>
          </button>
          <div class="flex items-center gap-3">
            <span v-if="coinDetails.header.rank" class="px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 text-sm font-bold rounded-lg">
              #{{ coinDetails.header.rank }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <!-- Hero Card - Coin Info & Price -->
      <div class="relative overflow-hidden bg-gradient-to-br from-primary/20 via-card/60 to-accent/20 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8">
        <!-- Animated Background Blobs -->
        <div class="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div class="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        <div class="relative z-10">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div class="flex items-center gap-4 md:gap-6">
              <!-- Coin Image with Glow -->
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/50 to-accent/50 rounded-2xl blur-2xl animate-pulse" />
                <img :src="coinDetails.header.image" :alt="coinDetails.header.name" class="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl ring-2 ring-border/50 shadow-2xl" />
              </div>
              <div>
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  {{ coinDetails.header.name }}
                </h1>
                <div class="flex items-center gap-3">
                  <span class="px-3 py-1 bg-primary/20 border border-primary/40 text-primary text-sm font-bold rounded-lg uppercase tracking-wider">
                    {{ coinDetails.header.symbol }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Current Price -->
            <div class="text-left md:text-right">
              <p class="text-4xl md:text-5xl font-bold font-mono mb-2">
                {{ formatPrice(coinDetails.price_panel.current_price) }}
              </p>
              <div class="flex items-center gap-2 justify-start md:justify-end">
                <span :class="(coinDetails.price_panel.changes['24h'] ?? 0) >= 0 ? 'text-success' : 'text-destructive'" class="text-lg font-bold">
                  {{ (coinDetails.price_panel.changes['24h'] ?? 0) >= 0 ? '▲' : '▼' }}
                  {{ Math.abs(coinDetails.price_panel.changes['24h'] || 0).toFixed(2) }}%
                </span>
                <span class="text-muted-foreground text-sm">(24h)</span>
              </div>
            </div>
          </div>

          <!-- Price Changes Timeline -->
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div v-for="(change, period) in coinDetails.price_panel.changes" :key="period" 
                 class="group bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/30 hover:border-primary/50 hover:bg-card/80 transition-all duration-300">
              <p class="text-xs text-muted-foreground mb-2 uppercase font-bold tracking-wider">{{ period }}</p>
              <p :class="change !== null ? (change >= 0 ? 'text-success' : 'text-destructive') : 'text-muted-foreground'" 
                 class="text-xl md:text-2xl font-bold font-mono">
                {{ change !== null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats Row -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-primary/50 transition-all duration-300 group">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-sm text-muted-foreground font-semibold">Market Cap</span>
          </div>
          <p class="text-2xl font-bold font-mono text-primary">{{ formatLargeNumber(coinDetails.market_stats.market_cap) }}</p>
        </div>

        <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-accent/50 transition-all duration-300 group">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/40 flex items-center justify-center">
              <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span class="text-sm text-muted-foreground font-semibold">24h Volume</span>
          </div>
          <p class="text-2xl font-bold font-mono text-accent">{{ formatLargeNumber(coinDetails.market_stats.volume_24h) }}</p>
        </div>

        <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-success/50 transition-all duration-300 group">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-success/20 to-success/40 flex items-center justify-center">
              <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span class="text-sm text-muted-foreground font-semibold">Circulating</span>
          </div>
          <p class="text-2xl font-bold font-mono">{{ formatLargeNumber(coinDetails.market_stats.circulating_supply) }}</p>
        </div>

        <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-5 hover:border-amber-500/50 transition-all duration-300 group">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-500/40 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span class="text-sm text-muted-foreground font-semibold">Max Supply</span>
          </div>
          <p class="text-2xl font-bold font-mono">{{ coinDetails.market_stats.max_supply ? formatLargeNumber(coinDetails.market_stats.max_supply) : '∞' }}</p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column (2/3 width) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Section -->
          <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden">
            <div class="p-6 border-b border-border/30">
              <h2 class="text-xl font-bold flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                About {{ coinDetails.header.name }}
              </h2>
            </div>
            <div class="p-6">
              <div class="relative">
                <div v-html="coinDetails.about.description" 
                     class="prose prose-invert max-w-none text-muted-foreground leading-relaxed"
                     :class="{ 'line-clamp-4': !showFullDescription }">
                </div>
                <button v-if="descriptionNeedsTruncate" 
                        @click="showFullDescription = !showFullDescription"
                        class="mt-4 text-primary font-semibold hover:underline flex items-center gap-2 transition-colors group">
                  {{ showFullDescription ? 'Show Less' : 'Read More' }}
                  <svg class="w-4 h-4 transition-transform group-hover:translate-y-0.5" :class="{ 'rotate-180': showFullDescription }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <!-- Categories -->
              <div v-if="coinDetails.about.categories.length > 0" class="mt-6 pt-6 border-t border-border/30">
                <p class="text-sm font-semibold mb-3 text-foreground">Categories</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="cat in coinDetails.about.categories.slice(0, 10)" :key="cat" 
                        class="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary text-sm rounded-lg hover:bg-primary/20 hover:border-primary/50 transition-all cursor-default">
                    {{ cat }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Links & Resources -->
          <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden">
            <div class="p-6 border-b border-border/30">
              <h2 class="text-xl font-bold flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                Links & Resources
              </h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <a v-if="coinDetails.links.homepage" :href="coinDetails.links.homepage" target="_blank" 
                   class="group flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 hover:scale-[1.02] transition-all duration-300 border border-border/30 hover:border-primary/50">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/50 transition-all">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span class="font-semibold text-sm">Website</span>
                </a>
                <a v-if="coinDetails.links.whitepaper" :href="coinDetails.links.whitepaper" target="_blank" 
                   class="group flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 hover:scale-[1.02] transition-all duration-300 border border-border/30 hover:border-blue-500/50">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/40 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-500/50 transition-all">
                    <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span class="font-semibold text-sm">Whitepaper</span>
                </a>
                <a v-if="coinDetails.links.twitter" :href="coinDetails.links.twitter" target="_blank" 
                   class="group flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 hover:scale-[1.02] transition-all duration-300 border border-border/30 hover:border-sky-500/50">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500/20 to-sky-500/40 flex items-center justify-center group-hover:from-sky-500/30 group-hover:to-sky-500/50 transition-all">
                    <svg class="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </div>
                  <span class="font-semibold text-sm">Twitter</span>
                </a>
                <a v-if="coinDetails.links.github" :href="coinDetails.links.github" target="_blank" 
                   class="group flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 hover:scale-[1.02] transition-all duration-300 border border-border/30 hover:border-gray-500/50">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-500/40 flex items-center justify-center group-hover:from-gray-500/30 group-hover:to-gray-500/50 transition-all">
                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 2.613.622 1.153-.385 2.388-.586 3.613-.591 1.225.005 2.46.206 3.613.591 1.605-.944 2.613-.622 2.613-.622.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <span class="font-semibold text-sm">GitHub</span>
                </a>
                <a v-if="coinDetails.links.subreddit" :href="coinDetails.links.subreddit" target="_blank" 
                   class="group flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 hover:scale-[1.02] transition-all duration-300 border border-border/30 hover:border-orange-500/50">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-500/40 flex items-center justify-center group-hover:from-orange-500/30 group-hover:to-orange-500/50 transition-all">
                    <svg class="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.857-1.43 4.737-1.5l.885-4.154a.58.58 0 0 1 .699-.463l3.19.678a1.245 1.245 0 0 1 1.25-1.25z"/></svg>
                  </div>
                  <span class="font-semibold text-sm">Reddit</span>
                </a>
                <a v-if="coinDetails.links.blockchain_site" :href="coinDetails.links.blockchain_site" target="_blank" 
                   class="group flex items-center gap-3 p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 hover:scale-[1.02] transition-all duration-300 border border-border/30 hover:border-success/50">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-success/20 to-success/40 flex items-center justify-center group-hover:from-success/30 group-hover:to-success/50 transition-all">
                    <svg class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span class="font-semibold text-sm">Explorer</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (1/3 width) - Sidebar -->
        <div class="space-y-6">
          <!-- 24h Price Range -->
          <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6">
            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              24h Price Range
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">High</span>
                <span class="font-mono font-bold text-success">{{ formatPrice(coinDetails.price_panel.high_24h) }}</span>
              </div>
              <div class="relative">
                <div class="w-full bg-secondary/50 rounded-full h-2">
                  <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-success to-accent rounded-full transition-all duration-500" style="width: 70%"></div>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-muted-foreground">Low</span>
                <span class="font-mono font-bold text-destructive">{{ formatPrice(coinDetails.price_panel.low_24h) }}</span>
              </div>
            </div>
          </div>

          <!-- All-Time High/Low -->
          <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden">
            <div class="p-4 border-b border-border/30 bg-success/5">
              <div class="flex items-center gap-2">
                <span class="text-xl">🏆</span>
                <h3 class="font-bold">All-Time High</h3>
              </div>
            </div>
            <div class="p-4 space-y-2">
              <p class="text-2xl font-bold font-mono text-success">{{ formatPrice(coinDetails.historical_highlights.ath.price) }}</p>
              <p class="text-sm text-muted-foreground">{{ formatDate(coinDetails.historical_highlights.ath.date) }}</p>
              <p class="text-sm text-destructive font-semibold">{{ coinDetails.historical_highlights.ath.change_percentage?.toFixed(2) }}% from ATH</p>
            </div>
            
            <div class="p-4 border-t border-border/30 bg-destructive/5">
              <div class="flex items-center gap-2">
                <span class="text-xl">📉</span>
                <h3 class="font-bold">All-Time Low</h3>
              </div>
            </div>
            <div class="p-4 space-y-2">
              <p class="text-2xl font-bold font-mono text-destructive">{{ formatPrice(coinDetails.historical_highlights.atl.price) }}</p>
              <p class="text-sm text-muted-foreground">{{ formatDate(coinDetails.historical_highlights.atl.date) }}</p>
              <p class="text-sm text-success font-semibold">+{{ Math.abs(coinDetails.historical_highlights.atl.change_percentage || 0).toFixed(2) }}% from ATL</p>
            </div>
          </div>

          <!-- Community Sentiment -->
          <div class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6">
            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Sentiment
            </h3>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-semibold text-success flex items-center gap-1">
                    <span class="text-lg">📈</span> Bullish
                  </span>
                  <span class="text-sm font-bold">{{ coinDetails.community.sentiment_up_percentage?.toFixed(1) }}%</span>
                </div>
                <div class="w-full bg-secondary/50 rounded-full h-3">
                  <div class="bg-gradient-to-r from-success to-emerald-400 h-3 rounded-full transition-all duration-500 shadow-lg shadow-success/50" 
                       :style="{ width: `${coinDetails.community.sentiment_up_percentage || 0}%` }"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-2">
                  <span class="text-sm font-semibold text-destructive flex items-center gap-1">
                    <span class="text-lg">📉</span> Bearish
                  </span>
                  <span class="text-sm font-bold">{{ coinDetails.community.sentiment_down_percentage?.toFixed(1) }}%</span>
                </div>
                <div class="w-full bg-secondary/50 rounded-full h-3">
                  <div class="bg-gradient-to-r from-destructive to-red-400 h-3 rounded-full transition-all duration-500 shadow-lg shadow-destructive/50" 
                       :style="{ width: `${coinDetails.community.sentiment_down_percentage || 0}%` }"></div>
                </div>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t border-border/30 grid grid-cols-2 gap-4">
              <div class="text-center p-3 bg-secondary/30 rounded-xl">
                <p class="text-xl font-bold font-mono">{{ formatLargeNumber(coinDetails.community.reddit_subscribers) }}</p>
                <p class="text-xs text-muted-foreground mt-1">Reddit</p>
              </div>
              <div class="text-center p-3 bg-secondary/30 rounded-xl">
                <p class="text-xl font-bold font-mono">{{ formatLargeNumber(coinDetails.community.watchlist_users) }}</p>
                <p class="text-xs text-muted-foreground mt-1">Watchlist</p>
              </div>
            </div>
          </div>

          <!-- Technical Details -->
          <div v-if="coinDetails.about.genesis || coinDetails.about.algorithm" class="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden">
            <div class="p-4 border-b border-border/30">
              <h3 class="font-bold flex items-center gap-2">
                <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Technical Info
              </h3>
            </div>
            <div class="p-4 space-y-3">
              <div v-if="coinDetails.about.genesis" class="flex justify-between py-2 border-b border-border/20">
                <span class="text-sm text-muted-foreground">Genesis</span>
                <span class="text-sm font-semibold">{{ formatDate(coinDetails.about.genesis) }}</span>
              </div>
              <div v-if="coinDetails.about.algorithm" class="flex justify-between py-2 border-b border-border/20">
                <span class="text-sm text-muted-foreground">Algorithm</span>
                <span class="text-sm font-semibold">{{ coinDetails.about.algorithm }}</span>
              </div>
              <div v-if="coinDetails.market_stats.fdv" class="flex justify-between py-2 border-b border-border/20">
                <span class="text-sm text-muted-foreground">FDV</span>
                <span class="text-sm font-semibold">{{ formatLargeNumber(coinDetails.market_stats.fdv) }}</span>
              </div>
              <div v-if="coinDetails.market_stats.total_supply" class="flex justify-between py-2">
                <span class="text-sm text-muted-foreground">Total Supply</span>
                <span class="text-sm font-semibold">{{ formatLargeNumber(coinDetails.market_stats.total_supply) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-destructive to-red-600 rounded-full blur-2xl animate-pulse opacity-50" />
      <svg class="relative w-24 h-24 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-2">Failed to Load Details</h2>
      <p class="text-muted-foreground max-w-md">{{ error }}</p>
    </div>
    <button
      @click="assetsStore.fetchCoinDetails(route.params.coingecko_id as string)"
      class="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
    >
      Retry
    </button>
  </div>

  <!-- Loading State -->
  <div v-else class="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl animate-pulse" />
      <div class="relative animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent" />
    </div>
    <div class="text-center">
      <p class="text-lg font-semibold mb-1">{{ isLoading ? 'Fetching coin details...' : 'Loading...' }}</p>
      <p class="text-sm text-muted-foreground">{{ isLoading ? 'This may take a few seconds' : 'Preparing data...' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAssetsStore } from '@/stores/assets'

const route = useRoute()
const assetsStore = useAssetsStore()

// Reactive state from store
const coinDetails = computed(() => assetsStore.coinDetails)
const isLoading = computed(() => assetsStore.isLoading)
const error = computed(() => assetsStore.error)

// Description expand/collapse
const showFullDescription = ref(false)
const descriptionNeedsTruncate = ref(false)

function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return 'N/A'
  if (price >= 1) {
    return '$' + price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return '$' + price.toFixed(4)
  } else {
    return '$' + price.toFixed(6)
  }
}

function formatLargeNumber(num: number | null): string {
  if (num === null || num === undefined) return 'N/A'
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(async () => {
  const coingeckoId = route.params.coingecko_id as string
  console.log('🚀 AssetMoreDetailsView mounted, fetching:', coingeckoId)
  await assetsStore.fetchCoinDetails(coingeckoId)
  console.log('✅ Coin details loaded:', assetsStore.coinDetails)
})
</script>
