<template>
  <div class="hidden lg:flex items-center gap-1.5 rounded-xl border border-border/60 bg-card/60 p-1 backdrop-blur-xl">
    <button
      v-for="module in modules"
      :key="module.id"
      type="button"
      :class="[
        'group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
        currentModule.id === module.id
          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
          : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
        !module.enabled ? 'opacity-70' : '',
      ]"
      @click="$emit('select', module)"
    >
      <component :is="module.icon" class="h-4 w-4" />
      <span>{{ module.label }}</span>
      <span
        v-if="!module.enabled"
        class="rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
      >
        Soon
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { AppModule } from '@/constants/navigation'

defineProps<{
  modules: AppModule[]
  currentModule: AppModule
}>()

defineEmits<{
  select: [module: AppModule]
}>()
</script>
