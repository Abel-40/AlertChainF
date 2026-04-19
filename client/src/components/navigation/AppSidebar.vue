<template>
  <aside
    class="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:z-30 lg:h-screen lg:flex-col lg:border-r lg:border-border/60 lg:bg-card/72 lg:backdrop-blur-2xl"
    :class="collapsed ? 'lg:w-20' : 'lg:w-64'"
  >
    <div class="flex h-16 items-center px-4" :class="collapsed ? 'justify-center' : 'justify-between'">
      <AppBrand v-if="!collapsed" />
      <button
        type="button"
        class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition hover:border-primary/35 hover:text-primary"
        @click="$emit('toggle-collapse')"
      >
        <PanelLeftClose v-if="!collapsed" class="h-5 w-5" />
        <PanelLeftOpen v-else class="h-5 w-5" />
      </button>
    </div>

    <nav class="mt-3 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
      <RouterLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        :class="[
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200',
          isActive(item)
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
            : 'text-muted-foreground hover:bg-secondary/75 hover:text-foreground',
          collapsed ? 'justify-center' : '',
        ]"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />
        <template v-if="!collapsed">
          <span class="truncate font-medium">{{ item.label }}</span>
          <span
            v-if="item.badgeKey && badgeCount > 0"
            class="ml-auto inline-flex min-w-6 items-center justify-center rounded-full bg-white/18 px-2 py-0.5 text-[11px] font-semibold"
          >
            {{ badgeCount > 99 ? '99+' : badgeCount }}
          </span>
        </template>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'
import { RouterLink, useRoute } from 'vue-router'
import type { AppModule, ModuleNavItem } from '@/constants/navigation'
import AppBrand from '@/components/layout/AppBrand.vue'

const props = defineProps<{
  badgeCount: number
  collapsed: boolean
  items: ModuleNavItem[]
  module: AppModule
}>()

defineEmits<{
  'toggle-collapse': []
}>()

const route = useRoute()

function isActive(item: ModuleNavItem) {
  return item.exact
    ? route.path === item.path
    : route.path === item.path || route.path.startsWith(`${item.path}/`)
}
</script>
