<template>
  <div class="group flex items-center justify-between p-5 bg-secondary/30 border-2 border-border/30 rounded-2xl hover:border-primary/50 transition-all duration-300">
    <div class="flex items-center gap-4 flex-1">
      <span class="text-2xl">{{ icon }}</span>
      <div>
        <p class="font-semibold text-foreground">{{ title }}</p>
        <p class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
    </div>
    <button
      @click="toggle"
      :class="[
        'relative w-14 h-8 rounded-full transition-all duration-300',
        modelValue ? 'bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30' : 'bg-secondary border-2 border-border/50'
      ]"
    >
      <div
        :class="[
          'absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300',
          modelValue ? 'left-7' : 'left-1'
        ]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  description: string
  icon: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>
