import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/**
 * Composable to validate user session and redirect to login if expired
 */
export function useSessionValidator() {
  const router = useRouter()
  const authStore = useAuthStore()

  /**
   * Validate the current user session
   * @returns true if session is valid, false if redirected to login
   */
  async function validateSession(): Promise<boolean> {
    // If there's a token but no user data, try to fetch user info
    if (authStore.token && !authStore.user) {
      const success = await authStore.fetchMe()
      if (!success) {
        // Token is invalid or expired, clear auth and redirect to login
        authStore.logout()
        router.push('/login')
        return false
      }
    }
    
    // If not authenticated (no token), redirect to login
    if (!authStore.isAuthenticated) {
      router.push('/login')
      return false
    }
    
    return true
  }

  /**
   * Auto-validate session on component mount
   */
  function autoValidateOnMount() {
    onMounted(async () => {
      await validateSession()
    })
  }

  return {
    validateSession,
    autoValidateOnMount,
  }
}
