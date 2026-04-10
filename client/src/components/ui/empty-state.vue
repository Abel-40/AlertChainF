<template>
  <div class="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div class="w-32 h-32 mb-6 opacity-50">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="2" class="text-border" />
        <path d="M100 60v40l30 30" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="text-muted-foreground" />
      </svg>
    </div>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-muted-foreground max-w-sm mb-6">{{ description }}</p>
    <button v-if="actionLabel" @click="$emit('action')" class="btn btn-primary">
      {{ actionLabel }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  actionLabel?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No Data Available',
  description: 'There\'s nothing to show here yet.',
  actionLabel: ''
})

defineEmits<{
  action: []
}>()
</script>
