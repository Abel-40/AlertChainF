<template>
  <article class="surface-panel relative overflow-hidden rounded-[1.25rem] p-4 transition-transform duration-200 hover:-translate-y-0.5">
    <div class="absolute inset-x-0 top-0 h-1" :class="accentClass" />
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{{ label }}</p>
        <p class="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">{{ value }}</p>
        <p v-if="hint" class="mt-1.5 text-xs text-muted-foreground sm:text-sm">{{ hint }}</p>
      </div>
      <div class="rounded-xl p-2.5" :class="iconWrapClass">
        <component :is="icon" class="h-4.5 w-4.5" />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string | number
  hint?: string
  icon: Component
  tone?: 'primary' | 'success' | 'warning'
}>()

const accentClass = computed(() => {
  if (props.tone === 'success') return 'bg-success'
  if (props.tone === 'warning') return 'bg-warning'
  return 'bg-primary'
})

const iconWrapClass = computed(() => {
  if (props.tone === 'success') return 'bg-success/12 text-success'
  if (props.tone === 'warning') return 'bg-warning/14 text-warning'
  return 'bg-primary/12 text-primary'
})
</script>
