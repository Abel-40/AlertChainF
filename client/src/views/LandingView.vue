<template>
  <div class="min-h-screen overflow-hidden">
    <header class="sticky top-0 z-20 border-b border-border/60 bg-background/78 backdrop-blur-2xl">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <AppBrand />
        <nav class="hidden items-center gap-8 md:flex">
          <a href="#features" class="text-sm font-medium text-muted-foreground transition hover:text-foreground">Features</a>
          <a href="#workflow" class="text-sm font-medium text-muted-foreground transition hover:text-foreground">Workflow</a>
          <a href="#faq" class="text-sm font-medium text-muted-foreground transition hover:text-foreground">FAQ</a>
        </nav>
        <div class="flex items-center gap-3">
          <RouterLink to="/login" class="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground sm:inline-flex">
            Sign in
          </RouterLink>
          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
          >
            Start free
          </RouterLink>
        </div>
      </div>
    </header>

    <main>
      <section class="relative px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <div class="absolute inset-0 app-shell-bg" />
        <div class="absolute inset-0 bg-grid opacity-40" />

        <div class="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Market monitoring, refined
            </div>
            <h1 class="mt-8 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Monitor conviction trades with a calmer alert workflow.
            </h1>
            <p class="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Alert Chain gives you a focused command center for watchlists, price triggers, and delivery history so you can stop babysitting charts and react when it matters.
            </p>

            <div class="mt-8 flex flex-col gap-4 sm:flex-row">
              <RouterLink
                to="/register"
                class="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Create account
                <ArrowRight class="h-4 w-4" />
              </RouterLink>
              <RouterLink
                to="/login"
                class="inline-flex items-center justify-center rounded-2xl border border-border/70 bg-card/60 px-6 py-4 text-sm font-semibold text-foreground transition hover:bg-card"
              >
                Open dashboard
              </RouterLink>
            </div>

            <div class="mt-10 grid gap-4 sm:grid-cols-3">
              <MetricCard label="Monitoring" value="24/7" hint="Continuous price checks" :icon="Radar" />
              <MetricCard label="Reaction speed" value="<1s" hint="Fast delivery after trigger" :icon="Zap" tone="success" />
              <MetricCard label="Tracked assets" value="50+" hint="Crypto search and watchlists" :icon="ScanSearch" tone="warning" />
            </div>
          </div>

          <div class="surface-panel surface-elevated relative overflow-hidden rounded-[2rem] p-4 sm:p-5">
            <div class="absolute -right-10 top-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <div class="absolute -bottom-12 left-0 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />

            <div class="relative rounded-[1.5rem] border border-border/60 bg-background/70 p-5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Alert desk</p>
                  <h2 class="mt-2 text-xl font-semibold text-foreground">Priority watchlist</h2>
                </div>
                <span class="inline-flex items-center gap-2 rounded-full bg-success/12 px-3 py-1 text-xs font-semibold text-success">
                  <span class="h-2 w-2 rounded-full bg-success" />
                  Live
                </span>
              </div>

              <div class="mt-6 space-y-3">
                <div
                  v-for="asset in heroAssets"
                  :key="asset.symbol"
                  class="flex items-center justify-between rounded-2xl border border-border/60 bg-card/70 px-4 py-3"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-white" :class="asset.iconClass">
                      {{ asset.symbol }}
                    </div>
                    <div>
                      <p class="font-semibold text-foreground">{{ asset.name }}</p>
                      <p class="text-xs uppercase tracking-[0.18em] text-muted-foreground">{{ asset.signal }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-mono text-lg font-semibold text-foreground">{{ asset.price }}</p>
                    <p :class="['text-xs font-semibold', asset.change.startsWith('+') ? 'text-success' : 'text-destructive']">
                      {{ asset.change }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-[1.5rem] border border-border/60 bg-card/75 p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-semibold text-foreground">Triggered alerts</p>
                    <p class="text-xs text-muted-foreground">Delivery feed</p>
                  </div>
                  <BellRing class="h-5 w-5 text-primary" />
                </div>
                <div class="mt-4 space-y-3">
                  <div
                    v-for="message in heroAlerts"
                    :key="message.title"
                    class="flex items-start gap-3 rounded-2xl bg-background/70 px-4 py-3"
                  >
                    <div class="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <div>
                      <p class="text-sm font-medium text-foreground">{{ message.title }}</p>
                      <p class="mt-1 text-xs text-muted-foreground">{{ message.subtitle }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" class="px-4 py-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="max-w-3xl">
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">What you get</p>
            <h2 class="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">A sharper monitoring workflow from search to signal.</h2>
          </div>

          <div class="mt-10 grid gap-5 lg:grid-cols-3">
            <SectionCard title="Search and track" description="Discover assets, curate your watchlist, and keep price context close.">
              <div class="space-y-3 text-sm text-muted-foreground">
                <p>Search crypto assets by name or symbol and add them to a tracked watchlist.</p>
                <p>Open asset detail views for historical charts, metrics, and trigger context.</p>
              </div>
            </SectionCard>
            <SectionCard title="Alert with intent" description="Set precise conditions instead of checking charts all day.">
              <div class="space-y-3 text-sm text-muted-foreground">
                <p>Create price alerts above or below your target thresholds.</p>
                <p>Track active, paused, and historical alert behavior from one dashboard.</p>
              </div>
            </SectionCard>
            <SectionCard title="Stay informed" description="Get signal delivery history without losing the thread.">
              <div class="space-y-3 text-sm text-muted-foreground">
                <p>Review notifications, unread states, and trigger outcomes in one place.</p>
                <p>Use profile settings to tune the experience as the product expands.</p>
              </div>
            </SectionCard>
          </div>
        </div>
      </section>

      <section id="workflow" class="px-4 py-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl rounded-[2rem] border border-border/60 bg-card/55 p-6 sm:p-8">
          <div class="grid gap-6 md:grid-cols-3">
            <div v-for="(step, index) in workflowSteps" :key="step.title" class="rounded-[1.5rem] border border-border/60 bg-background/60 p-5">
              <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                0{{ index + 1 }}
              </div>
              <h3 class="mt-5 text-xl font-semibold text-foreground">{{ step.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-5xl rounded-[2rem] border border-border/60 bg-card/55 p-6 text-center sm:p-8">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Ready to start</p>
          <h2 class="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">Set up your first watchlist and let the market come to you.</h2>
          <p class="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Alert Chain is designed for traders who want clearer signal flow, faster reaction time, and less manual checking.
          </p>
          <div class="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <RouterLink to="/register" class="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
              Get started free
            </RouterLink>
            <RouterLink to="/login" class="inline-flex items-center justify-center rounded-2xl border border-border/70 bg-background/60 px-6 py-4 text-sm font-semibold text-foreground">
              Sign in
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, BellRing, Radar, ScanSearch, Zap } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import MetricCard from '@/components/data-display/MetricCard.vue'
import AppBrand from '@/components/layout/AppBrand.vue'
import SectionCard from '@/components/layout/SectionCard.vue'

const heroAssets = [
  { name: 'Bitcoin', symbol: 'BTC', signal: 'Breakout watch', price: '$67,234', change: '+2.4%', iconClass: 'bg-amber-500' },
  { name: 'Ethereum', symbol: 'ETH', signal: 'Retest zone', price: '$3,456', change: '+1.8%', iconClass: 'bg-sky-500' },
  { name: 'Solana', symbol: 'SOL', signal: 'Support check', price: '$178.90', change: '-0.5%', iconClass: 'bg-fuchsia-500' },
]

const heroAlerts = [
  { title: 'BTC crossed above your $70,000 threshold', subtitle: 'Delivered instantly to notifications and email routing.' },
  { title: 'ETH dipped near your accumulation range', subtitle: 'Marked unread so you can follow up from the dashboard.' },
]

const workflowSteps = [
  { title: 'Track assets', description: 'Pick the coins you actually care about and keep them in one focused watchlist.' },
  { title: 'Set conditions', description: 'Create above/below price triggers that match your strategy and time horizon.' },
  { title: 'React faster', description: 'Review notification history and act when alerts hit instead of scanning endlessly.' },
]
</script>
