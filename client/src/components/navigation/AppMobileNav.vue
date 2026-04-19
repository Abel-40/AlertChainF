<template>
  <nav class="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-card/88 px-2 pb-2 pt-2 backdrop-blur-2xl lg:hidden safe-area-bottom">
    <div class="grid grid-cols-5 gap-1">
      <RouterLink
        v-for="item in items.slice(0, 5)"
        :key="item.path"
        :to="item.path"
        :class="[
          'relative flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition',
          isActive(item)
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
            : 'text-muted-foreground hover:bg-secondary/75 hover:text-foreground',
        ]"
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span class="truncate">{{ item.label }}</span>
        <span
          v-if="item.badgeKey && badgeCount > 0"
          class="absolute right-2 top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 py-0.5 text-[10px] font-semibold text-destructive-foreground"
        >
          {{ badgeCount > 9 ? '9+' : badgeCount }}
        </span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import type { ModuleNavItem } from '@/constants/navigation'

defineProps<{
  badgeCount: number
  items: ModuleNavItem[]
}>()

const route = useRoute()

function isActive(item: ModuleNavItem) {
  return item.exact
    ? route.path === item.path
    : route.path === item.path || route.path.startsWith(`${item.path}/`)
}
</script>
