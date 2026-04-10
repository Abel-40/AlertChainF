<template>
  <div :class="['animate-pulse rounded-lg bg-secondary/50', sizeClass]" />
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const sizeClass = {
  sm: 'h-4 w-24',
  md: 'h-6 w-48',
  lg: 'h-8 w-64',
  xl: 'h-12 w-full',
  full: 'h-full w-full'
}[props.size]
</script>
