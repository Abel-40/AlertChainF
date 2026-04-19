<template>
  <div v-if="coinDetails" class="space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Deep market profile"
      :title="coinDetails.header.name"
      :description="`${coinDetails.header.symbol.toUpperCase()} - Extended fundamentals, links, sentiment, and supply metrics pulled from the current details endpoint.`"
    >
      <template #actions>
        <button type="button" class="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-background/75 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary" @click="$router.back()">
          Back to asset
        </button>
      </template>
    </PageHeader>

    <div class="grid gap-4 md:grid-cols-4">
      <MetricCard label="Price" :value="formatPrice(coinDetails.price_panel.current_price)" hint="Current market price" :icon="BadgeDollarSign" />
      <MetricCard label="Market cap" :value="formatLargeNumber(coinDetails.market_stats.market_cap)" hint="Current valuation" :icon="BarChart3" tone="success" />
      <MetricCard label="24h volume" :value="formatLargeNumber(coinDetails.market_stats.volume_24h)" hint="Trading activity" :icon="Activity" tone="warning" />
      <MetricCard label="Rank" :value="coinDetails.header.rank ?? 'N/A'" hint="Market positioning" :icon="Trophy" />
    </div>

    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_380px]">
      <div class="space-y-6">
        <SectionCard :title="`About ${coinDetails.header.name}`" description="Fundamental context and category tags.">
          <div class="prose max-w-none text-sm leading-7 text-muted-foreground" v-html="coinDetails.about.description || '<p>No description available.</p>'" />
          <div v-if="coinDetails.about.categories.length" class="mt-5 flex flex-wrap gap-2">
            <span v-for="category in coinDetails.about.categories.slice(0, 10)" :key="category" class="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {{ category }}
            </span>
          </div>
        </SectionCard>

        <SectionCard title="Performance timeline" description="Key percentage moves across common trading windows.">
          <div class="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <article v-for="(change, label) in coinDetails.price_panel.changes" :key="label" class="rounded-[1.25rem] border border-border/60 bg-background/60 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{{ label }}</p>
              <p class="mt-3 font-mono text-xl font-semibold" :class="change === null ? 'text-muted-foreground' : change >= 0 ? 'text-success' : 'text-destructive'">
                {{ change === null ? 'N/A' : `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` }}
              </p>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Official links" description="Direct resources surfaced from the current details payload.">
          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <a v-for="link in resourceLinks" :key="link.label" :href="link.href" target="_blank" rel="noreferrer" class="rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary">
              {{ link.label }}
            </a>
          </div>
        </SectionCard>
      </div>

      <div class="space-y-6">
        <SectionCard title="Market structure" description="Supply, valuation, and trading metrics at a glance.">
          <div class="space-y-3">
            <div v-for="item in marketStats" :key="item.label" class="flex items-center justify-between gap-3 rounded-[1.25rem] border border-border/60 bg-background/60 p-4">
              <span class="text-sm text-muted-foreground">{{ item.label }}</span>
              <span class="font-mono text-sm font-semibold text-foreground">{{ item.value }}</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Cycle extremes" description="All-time high and low context from the details API.">
          <div class="space-y-4">
            <article class="rounded-[1.25rem] border border-success/30 bg-success/6 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-success">All-time high</p>
              <p class="mt-2 font-mono text-2xl font-semibold text-foreground">{{ formatPrice(coinDetails.historical_highlights.ath.price) }}</p>
              <p class="mt-2 text-sm text-muted-foreground">{{ formatDate(coinDetails.historical_highlights.ath.date) }}</p>
            </article>
            <article class="rounded-[1.25rem] border border-destructive/30 bg-destructive/6 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-destructive">All-time low</p>
              <p class="mt-2 font-mono text-2xl font-semibold text-foreground">{{ formatPrice(coinDetails.historical_highlights.atl.price) }}</p>
              <p class="mt-2 text-sm text-muted-foreground">{{ formatDate(coinDetails.historical_highlights.atl.date) }}</p>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Community sentiment" description="Audience posture and watchlist appetite.">
          <div class="space-y-4">
            <div>
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="text-success">Bullish</span>
                <span class="font-semibold text-foreground">{{ (coinDetails.community.sentiment_up_percentage ?? 0).toFixed(1) }}%</span>
              </div>
              <div class="h-3 rounded-full bg-secondary/70">
                <div class="h-3 rounded-full bg-success" :style="{ width: `${coinDetails.community.sentiment_up_percentage || 0}%` }" />
              </div>
            </div>
            <div>
              <div class="mb-2 flex items-center justify-between text-sm">
                <span class="text-destructive">Bearish</span>
                <span class="font-semibold text-foreground">{{ (coinDetails.community.sentiment_down_percentage ?? 0).toFixed(1) }}%</span>
              </div>
              <div class="h-3 rounded-full bg-secondary/70">
                <div class="h-3 rounded-full bg-destructive" :style="{ width: `${coinDetails.community.sentiment_down_percentage || 0}%` }" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-center">
                <p class="font-mono text-xl font-semibold text-foreground">{{ formatLargeNumber(coinDetails.community.reddit_subscribers) }}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Reddit</p>
              </div>
              <div class="rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-center">
                <p class="font-mono text-xl font-semibold text-foreground">{{ formatLargeNumber(coinDetails.community.watchlist_users) }}</p>
                <p class="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Watchlists</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  </div>

  <div v-else-if="error" class="rounded-[2rem] bg-background/70">
    <EmptyState title="Failed to load details" :description="error" action-label="Retry" @action="reload" />
  </div>

  <div v-else class="flex min-h-[50vh] items-center justify-center">
    <div class="text-center">
      <div class="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-primary/25 border-t-primary" />
      <p class="mt-4 text-sm font-semibold text-foreground">Fetching market details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Activity, BadgeDollarSign, BarChart3, Trophy } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import EmptyState from '@/components/ui/empty-state.vue'
import { useAssetsStore } from '@/stores/assets'

const route = useRoute()
const assetsStore = useAssetsStore()

const coinDetails = computed(() => assetsStore.coinDetails)
const error = computed(() => assetsStore.error)

const resourceLinks = computed(() => {
  const details = coinDetails.value
  if (!details) return []

  return [
    { label: 'Website', href: details.links.homepage },
    { label: 'Whitepaper', href: details.links.whitepaper },
    { label: 'Explorer', href: details.links.blockchain_site },
    { label: 'Twitter', href: details.links.twitter },
    { label: 'GitHub', href: details.links.github },
    { label: 'Reddit', href: details.links.subreddit },
  ].filter((item): item is { label: string; href: string } => Boolean(item.href))
})

const marketStats = computed(() => {
  const details = coinDetails.value
  if (!details) return []

  return [
    { label: 'Market cap', value: formatLargeNumber(details.market_stats.market_cap) },
    { label: 'FDV', value: formatLargeNumber(details.market_stats.fdv) },
    { label: '24h volume', value: formatLargeNumber(details.market_stats.volume_24h) },
    { label: 'Circulating supply', value: formatLargeNumber(details.market_stats.circulating_supply) },
    { label: 'Total supply', value: formatLargeNumber(details.market_stats.total_supply) },
    { label: 'Max supply', value: formatLargeNumber(details.market_stats.max_supply) },
    { label: 'Genesis', value: formatDate(details.about.genesis) },
    { label: 'Algorithm', value: details.about.algorithm || 'N/A' },
  ]
})

function formatPrice(price: number | null) {
  if (price === null || price === undefined) return 'N/A'
  if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (price >= 0.01) return `$${price.toFixed(4)}`
  return `$${price.toFixed(6)}`
}

function formatLargeNumber(num: number | null) {
  if (num === null || num === undefined) return 'N/A'
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

async function reload() {
  await assetsStore.fetchCoinDetails(route.params.coingecko_id as string)
}

onMounted(reload)
</script>
