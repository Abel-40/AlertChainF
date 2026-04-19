<template>
  <div class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0 app-shell-bg" />
    <div class="absolute inset-0 bg-grid opacity-40" />
    <div class="absolute -left-20 top-16 h-72 w-72 rounded-full bg-primary/18 blur-3xl" />
    <div class="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-accent/18 blur-3xl" />

    <div class="relative z-10 flex min-h-screen items-center px-4 py-4 sm:px-6 sm:py-6 lg:px-10">
      <div class="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/55 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-2xl lg:grid-cols-[1.02fr_0.98fr]">
        <section class="relative hidden overflow-hidden border-r border-border/60 p-8 xl:flex xl:flex-col xl:justify-between">
          <div>
            <div class="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Intelligent monitoring
            </div>
            <h1 class="mt-6 max-w-lg text-4xl font-semibold leading-tight text-foreground">
              Build your alert desk with calm, instant market awareness.
            </h1>
            <p class="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Alert Chain helps you track high-priority assets, watch price thresholds, and react without living inside chart tabs all day.
            </p>
          </div>

          <div class="grid gap-3 xl:grid-cols-3">
            <div class="rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Coverage</p>
              <p class="mt-3 text-2xl font-semibold text-foreground">24/7</p>
              <p class="mt-2 text-xs leading-5 text-muted-foreground">Continuous price monitoring with trigger-ready notifications.</p>
            </div>
            <div class="rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Signals</p>
              <p class="mt-3 text-2xl font-semibold text-foreground">Live</p>
              <p class="mt-2 text-xs leading-5 text-muted-foreground">Track active alerts, asset context, and notification history in one flow.</p>
            </div>
            <div class="rounded-[1.5rem] border border-border/60 bg-background/50 p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Workflow</p>
              <p class="mt-3 text-2xl font-semibold text-foreground">Fast</p>
              <p class="mt-2 text-xs leading-5 text-muted-foreground">Set conditions quickly and keep your watchlist focused and actionable.</p>
            </div>
          </div>
        </section>

        <section class="flex items-center justify-center px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div class="w-full max-w-lg">
            <router-view />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
