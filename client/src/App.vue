<template>
  <div class="min-h-screen bg-background text-foreground selection:bg-primary/15 selection:text-foreground">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.init()
})
</script>
