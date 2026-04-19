<template>
  <section class="surface-panel surface-elevated relative overflow-hidden rounded-[1.5rem] p-4 sm:p-5">
    <div class="absolute -right-10 top-0 h-24 w-24 rounded-full bg-primary/8 blur-3xl" />
    <div class="absolute -bottom-10 left-8 h-20 w-20 rounded-full bg-accent/8 blur-3xl" />

    <div class="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div class="max-w-3xl">
        <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {{ eyebrow }}
        </p>
        <h1 class="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
          {{ title }}
        </h1>
        <p v-if="description" class="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2.5">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
}>()
</script>
