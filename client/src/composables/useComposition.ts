import { ref } from 'vue'
import { usePersistFn } from './usePersistFn'

export interface UseCompositionReturn {
  onCompositionStart: (e: CompositionEvent) => void
  onCompositionEnd: (e: CompositionEvent) => void
  onKeyDown: (e: KeyboardEvent) => void
  isComposing: () => boolean
}

export interface UseCompositionOptions {
  onKeyDown?: (e: KeyboardEvent) => void
  onCompositionStart?: (e: CompositionEvent) => void
  onCompositionEnd?: (e: CompositionEvent) => void
}

type TimerResponse = ReturnType<typeof setTimeout>

export function useComposition(
  options: UseCompositionOptions = {}
): UseCompositionReturn {
  const {
    onKeyDown: originalOnKeyDown,
    onCompositionStart: originalOnCompositionStart,
    onCompositionEnd: originalOnCompositionEnd,
  } = options

  const c = ref(false)
  const timer = ref<TimerResponse | null>(null)
  const timer2 = ref<TimerResponse | null>(null)

  const onCompositionStart = usePersistFn((e: CompositionEvent) => {
    if (timer.value) {
      clearTimeout(timer.value)
      timer.value = null
    }
    if (timer2.value) {
      clearTimeout(timer2.value)
      timer2.value = null
    }
    c.value = true
    originalOnCompositionStart?.(e)
  })

  const onCompositionEnd = usePersistFn((e: CompositionEvent) => {
    // Use nested setTimeout to handle Safari browser issue where compositionEnd fires before onKeyDown
    timer.value = setTimeout(() => {
      timer2.value = setTimeout(() => {
        c.value = false
      })
    })
    originalOnCompositionEnd?.(e)
  })

  const onKeyDown = usePersistFn((e: KeyboardEvent) => {
    // In composition state, prevent ESC and Enter (non shift+Enter) events from bubbling
    if (
      c.value &&
      (e.key === 'Escape' || (e.key === 'Enter' && !e.shiftKey))
    ) {
      e.stopPropagation()
      return
    }
    originalOnKeyDown?.(e)
  })

  const isComposing = usePersistFn(() => {
    return c.value
  })

  return {
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    isComposing,
  }
}
