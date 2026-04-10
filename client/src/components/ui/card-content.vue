<script setup lang="ts">
import { cn } from '@/lib/utils'

interface CardContentProps {
  class?: string
}

const props = withDefaults(defineProps<CardContentProps>(), {
  class: '',
})
</script>

<template>
  <div
    data-slot="card-content"
    :class="cn('px-6', props.class)"
  >
    <slot />
  </div>
</template>
