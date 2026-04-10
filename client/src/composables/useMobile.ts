import { ref, onMounted, onUnmounted } from 'vue'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const isMobile = ref<boolean>(false)

  function onChange() {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  }

  onMounted(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener('change', onChange)
    onChange() // Set initial value
    
    // Store the mql for cleanup
    ;(window as any).__mobileMql = mql
  })

  onUnmounted(() => {
    const mql = (window as any).__mobileMql
    if (mql) {
      mql.removeEventListener('change', onChange)
      delete (window as any).__mobileMql
    }
  })

  return isMobile
}
