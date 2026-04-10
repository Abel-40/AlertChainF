import { ref } from 'vue'

type noop = (...args: any[]) => any

/**
 * usePersistFn - Vue composable to persist function references
 * Similar to useCallback but keeps the latest function reference
 */
export function usePersistFn<T extends noop>(fn: T): T {
  const fnRef = ref<T>(fn)
  fnRef.value = fn

  const persistFn = ref<T | null>(null)
  if (!persistFn.value) {
    persistFn.value = function (this: unknown, ...args: any[]) {
      return fnRef.value!.apply(this, args)
    } as T
  }

  return persistFn.value!
}
