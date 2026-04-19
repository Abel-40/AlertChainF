<template>
  <section class="surface-panel rounded-[1.25rem]">
    <div v-if="title || $slots.header" class="flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3.5 sm:px-5">
      <div>
        <h2 v-if="title" class="text-base font-semibold text-foreground">{{ title }}</h2>
        <p v-if="description" class="mt-1 text-xs text-muted-foreground sm:text-sm">{{ description }}</p>
      </div>
      <slot name="header" />
    </div>
    <div class="p-4 sm:p-5">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
