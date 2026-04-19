<template>
  <div class="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/72 px-4 py-5 shadow-[0_20px_55px_rgba(15,23,42,0.14)] backdrop-blur-2xl sm:px-5 sm:py-6">
    <div class="absolute inset-0">
      <div class="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-primary/16 blur-[110px] animate-pulse" />
      <div class="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/16 blur-[110px] animate-pulse" style="animation-delay: 1.5s" />
    </div>

    <div class="relative z-10 mx-auto w-full max-w-md animate-fade-in">
      <div class="mb-6 text-center">
        <div class="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent animate-pulse-glow">
          <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h1 class="mb-1 text-2xl font-bold gradient-text">Welcome Back</h1>
        <p class="text-sm text-muted-foreground">Sign in to your AlertChain account</p>
      </div>

      <div class="rounded-[1.5rem] border border-border bg-card/82 p-5 shadow-xl transition-all duration-300 hover:shadow-primary/10 sm:p-6">
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="mb-2 block text-sm font-medium text-foreground">Email or Username</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                v-model="form.username"
                type="text"
                class="w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 pl-11 text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter your email or username"
                required
                autocomplete="username"
              />
            </div>
          </div>

          <div>
            <div class="mb-2 flex items-center justify-between">
              <label class="block text-sm font-medium text-foreground">Password</label>
              <RouterLink to="/forgot-password" class="text-sm text-primary hover:underline">
                Forgot password?
              </RouterLink>
            </div>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 pl-11 pr-11 text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <svg v-if="!showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <input id="remember-me" v-model="form.rememberMe" type="checkbox" class="h-4 w-4 rounded border-border bg-secondary text-primary focus:ring-2 focus:ring-primary/50" />
            <label for="remember-me" class="ml-2 text-sm text-muted-foreground">Remember me for 30 days</label>
          </div>

          <div v-if="authStore.error" class="rounded-xl border border-destructive/20 bg-destructive/10 p-3 animate-fade-in">
            <p class="text-sm text-destructive">{{ authStore.error }}</p>
          </div>

          <button type="submit" :disabled="authStore.isLoading" class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
            <svg v-if="authStore.isLoading" class="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}</span>
          </button>
        </form>

        <div class="relative my-5">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-border"></div></div>
          <div class="relative flex justify-center text-sm"><span class="bg-card px-2 text-muted-foreground">Or continue with</span></div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button type="button" @click="handleGoogleLogin" :disabled="authStore.isLoading" class="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-secondary/80 disabled:opacity-50">
            <svg class="h-5 w-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button type="button" @click="handleGithubLogin" :disabled="authStore.isLoading" class="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 font-medium text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-secondary/80 disabled:opacity-50">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <div class="mt-5 text-center text-sm">
          <span class="text-muted-foreground">Don't have an account? </span>
          <RouterLink to="/register" class="font-medium text-primary hover:underline">Create one now</RouterLink>
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
    toast({ title: 'Welcome back!', description: 'You have successfully signed in.', variant: 'success' })
    router.push('/dashboard')
  } else {
    toast({ title: 'Login Failed', description: authStore.error || 'Please check your credentials and try again.', variant: 'destructive' })
  }
}

async function handleGoogleLogin() {
  toast({ title: 'Google Sign-In', description: 'OAuth integration requires Google Client ID configuration. Please use email login for now.', variant: 'default' })
}

async function handleGithubLogin() {
  toast({ title: 'GitHub Sign-In', description: 'OAuth integration requires GitHub Client ID configuration. Please use email login for now.', variant: 'default' })
}
</script>
