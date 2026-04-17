<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1.5s" />
      
      <!-- Floating Crypto Icons -->
      <div class="absolute top-1/4 left-10 animate-float opacity-20">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">₿</div>
      </div>
      <div class="absolute top-1/3 right-20 animate-float opacity-20" style="animation-delay: 0.5s">
        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">Ξ</div>
      </div>
      <div class="absolute bottom-1/4 left-1/4 animate-float opacity-20" style="animation-delay: 1s">
        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">◎</div>
      </div>
    </div>

    <div class="w-full max-w-md animate-fade-in relative z-10">
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 animate-pulse-glow">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
        <p class="text-muted-foreground">Sign in to your AlertChain account</p>
      </div>

      <!-- Login Card -->
      <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl hover:shadow-primary/20 transition-all duration-300">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email/Username Field -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">Email or Username</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                v-model="form.username"
                type="text"
                class="w-full px-4 py-3 pl-11 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter your email or username"
                required
                autocomplete="username"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-foreground">Password</label>
              <RouterLink to="/forgot-password" class="text-sm text-primary hover:underline">
                Forgot password?
              </RouterLink>
            </div>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-3 pl-11 pr-11 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              type="checkbox"
              class="w-4 h-4 rounded border-border bg-secondary text-primary focus:ring-2 focus:ring-primary/50"
            />
            <label for="remember-me" class="ml-2 text-sm text-muted-foreground">
              Remember me for 30 days
            </label>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="p-4 bg-destructive/10 border border-destructive/20 rounded-xl animate-fade-in">
            <p class="text-sm text-destructive">{{ authStore.error }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading"
            class="w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 flex items-center justify-center gap-2"
          >
            <svg v-if="authStore.isLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-border"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="grid grid-cols-2 gap-3">
          <button 
            type="button"
            @click="handleGoogleLogin"
            :disabled="authStore.isLoading"
            class="w-full px-4 py-2.5 border border-border bg-secondary/50 text-foreground font-medium rounded-xl hover:bg-secondary/80 hover:border-primary/50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button 
            type="button"
            @click="handleGithubLogin"
            :disabled="authStore.isLoading"
            class="w-full px-4 py-2.5 border border-border bg-secondary/50 text-foreground font-medium rounded-xl hover:bg-secondary/80 hover:border-primary/50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        <!-- Register Link -->
        <div class="mt-6 text-center text-sm">
          <span class="text-muted-foreground">Don't have an account? </span>
          <RouterLink to="/register" class="text-primary hover:underline font-medium">
            Create one now
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const authStore = useAuthStore()
const { toast } = useToast()

const showPassword = ref(false)
const form = reactive({
  username: '',
  password: '',
  rememberMe: false,
})

async function handleLogin() {
  const success = await authStore.login(form.username, form.password)
  
  if (success) {
    toast({
      title: 'Welcome back!',
      description: 'You have successfully signed in.',
      variant: 'success',
    })
    
    // Always redirect to dashboard after login
    router.push('/dashboard')
  } else {
    toast({
      title: 'Login Failed',
      description: authStore.error || 'Please check your credentials and try again.',
      variant: 'destructive',
    })
  }
}

async function handleGoogleLogin() {
  // Google OAuth - opens popup for user to authenticate
  // After Google auth, send data to backend /social/signup endpoint
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID || ''}&redirect_uri=${window.location.origin}/auth/callback&response_type=token&scope=email%20profile`
  
  // For now, show toast that OAuth needs backend configuration
  toast({
    title: 'Google Sign-In',
    description: 'OAuth integration requires Google Client ID configuration. Please use email login for now.',
    variant: 'default',
  })
  
  // When backend OAuth is configured, use:
  // window.location.href = googleAuthUrl
}

async function handleGithubLogin() {
  // GitHub OAuth
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID || ''}&redirect_uri=${window.location.origin}/auth/callback&scope=user:email`
  
  // For now, show toast that OAuth needs backend configuration
  toast({
    title: 'GitHub Sign-In',
    description: 'OAuth integration requires GitHub Client ID configuration. Please use email login for now.',
    variant: 'default',
  })
  
  // When backend OAuth is configured, use:
  // window.location.href = githubAuthUrl
}
</script>
