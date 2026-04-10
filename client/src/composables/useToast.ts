import { ref } from 'vue'

export interface Toast {
  id: string
  title: string
  description?: string
  variant?: 'default' | 'destructive' | 'success'
  duration?: number
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const toast = (options: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      ...options,
      duration: options.duration || 3000,
    }
    toasts.value.push(newToast)

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, newToast.duration)
    }

    return id
  }

  const dismiss = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  return {
    toast,
    dismiss,
    toasts,
  }
}
