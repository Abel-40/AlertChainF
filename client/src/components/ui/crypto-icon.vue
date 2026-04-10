<template>
  <div :class="['relative rounded-full overflow-hidden', sizeClass]">
    <img 
      v-if="!hasError" 
      :src="image" 
      :alt="name"
      @error="handleError"
      class="w-full h-full object-cover"
    />
    <div v-else :class="['absolute inset-0 flex items-center justify-center font-bold', fallbackSizeClass]">
      {{ fallbackText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  image: string
  name: string
  symbol?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  symbol: '',
  size: 'md'
})

const hasError = ref(false)

function handleError() {
  hasError.value = true
}

const fallbackText = computed(() => {
  return (props.symbol || props.name || '?')[0].toUpperCase()
})

const sizeClass = computed(() => {
  return {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }[props.size]
})

const fallbackSizeClass = computed(() => {
  return {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-xl'
  }[props.size]
})
</script>
