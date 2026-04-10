<template>
  <span :class="['badge', variant]">
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'success' | 'danger' | 'muted'
}

withDefaults(defineProps<Props>(), {
  variant: 'muted'
})
</script>
