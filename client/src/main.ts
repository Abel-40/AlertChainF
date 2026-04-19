import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './index.css'

async function bootstrap() {
  const app = createApp(App)
  const pinia = createPinia()

  app.use(pinia)
  app.use(router)

  // Initialize auth state before mounting the app
  const authStore = useAuthStore()
  // If there's a token in localStorage, verify it's still valid
  if (authStore.token) {
    await authStore.fetchMe().catch(() => {
      // If fetchMe fails, clear the invalid token
      authStore.logout()
    })
  }

  app.mount('#app')
}

bootstrap()
