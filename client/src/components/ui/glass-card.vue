<template>
  <div :class="['glass-card', { 'glow-on-hover': glow }, $attrs.class]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  glow?: boolean
}

withDefaults(defineProps<Props>(), {
  glow: false
})
</script>
