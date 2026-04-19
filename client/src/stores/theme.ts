import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<'light' | 'dark' | 'system'>(
    (localStorage.getItem('theme-preference') as 'light' | 'dark' | 'system' | null) || 'system'
  )
  const systemDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

  const resolvedTheme = computed<'light' | 'dark'>(() => {
    if (mode.value === 'system') {
      return systemDark.value ? 'dark' : 'light'
    }

    return mode.value
  })

  const isDarkMode = computed(() => resolvedTheme.value === 'dark')

  function applyTheme() {
    const root = document.documentElement
    root.classList.toggle('dark', isDarkMode.value)
    root.dataset.theme = resolvedTheme.value
    localStorage.setItem('theme-preference', mode.value)
  }

  function handleSystemThemeChange(event: MediaQueryListEvent) {
    systemDark.value = event.matches
    applyTheme()
  }

  function init() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = mediaQuery.matches

    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    } else {
      mediaQuery.addListener(handleSystemThemeChange)
    }

    applyTheme()
  }

  function setTheme(theme: 'light' | 'dark' | 'system') {
    mode.value = theme
    applyTheme()
  }

  function toggleTheme() {
    setTheme(isDarkMode.value ? 'light' : 'dark')
  }

  return {
    mode,
    resolvedTheme,
    isDarkMode,
    init,
    toggleTheme,
    setTheme,
  }
})
