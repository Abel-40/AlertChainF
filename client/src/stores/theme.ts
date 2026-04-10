import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(
    localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  )

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
  }

  function setTheme(dark: boolean) {
    isDarkMode.value = dark
  }

  // Watch for changes and update localStorage and DOM
  watch(
    isDarkMode,
    (newValue) => {
      localStorage.setItem('theme', newValue ? 'dark' : 'light')
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    { immediate: true }
  )

  return {
    isDarkMode,
    toggleTheme,
    setTheme,
  }
})
