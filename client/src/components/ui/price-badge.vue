<template>
  <div :class="['inline-flex items-center gap-2 px-3 py-1.5 rounded-lg', variant]">
    <span class="text-lg font-mono font-semibold">{{ formattedPrice }}</span>
    <span v-if="change !== undefined" :class="['text-sm font-medium', changeClass]">
      {{ change >= 0 ? '↑' : '↓' }} {{ Math.abs(change).toFixed(2) }}%
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  price: number
  change?: number
  variant?: 'default' | 'large' | 'small'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const formattedPrice = computed(() => {
  if (props.price >= 1) {
    return `$${props.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } else if (props.price >= 0.01) {
    return `$${props.price.toFixed(4)}`
  } else {
    return `$${props.price.toFixed(6)}`
  }
})

const changeClass = computed(() => {
  if (props.change === undefined) return ''
  return props.change >= 0 ? 'text-success' : 'text-destructive'
})

const variant = computed(() => {
  return {
    default: 'bg-secondary/50 border border-border',
    large: 'bg-secondary/50 border border-border px-4 py-2',
    small: 'bg-transparent px-2 py-1'
  }[props.variant]
})
</script>
