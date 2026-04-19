<template>
  <RouterLink to="/dashboard" class="group inline-flex items-center gap-2.5">
    <div class="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-primary via-sky-400 to-accent text-primary-foreground shadow-md shadow-primary/15 transition-transform duration-300 group-hover:scale-105">
      <span class="absolute inset-[1px] rounded-[11px] bg-white/10" />
      <BellRing class="relative z-10 h-5 w-5" />
    </div>
    <div class="min-w-0">
      <p class="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Alert Chain</p>
      <p class="truncate text-sm font-semibold text-foreground">Monitoring desk</p>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { BellRing } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>
