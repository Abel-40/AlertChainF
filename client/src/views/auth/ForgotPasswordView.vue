<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <Logo />
      </div>

      <!-- Form Card -->
      <div class="card border-slate-700">
        <h1 class="text-2xl font-bold text-center mb-2">Forgot Password</h1>
        <p class="text-center text-muted-foreground text-sm mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="label mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              class="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
            {{ authStore.error }}
          </div>

          <!-- Success Message -->
          <div v-if="submitted" class="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-sm">
            Check your email for a password reset link
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading || submitted"
            class="btn btn-primary w-full"
          >
            <span v-if="authStore.isLoading">Sending...</span>
            <span v-else>Send Reset Link</span>
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 text-center text-sm space-y-2">
          <div>
            <RouterLink to="/login" class="text-primary hover:underline">
              Back to Login
            </RouterLink>
          </div>
          <div>
            <RouterLink to="/register" class="text-primary hover:underline">
              Create Account
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import Logo from '@/components/Logo.vue'

const authStore = useAuthStore()
const { toast } = useToast()

const email = ref('')
const submitted = ref(false)

async function handleForgotPassword() {
  const success = await authStore.forgotPassword(email.value)
  if (success) {
    submitted.value = true
    toast({
      title: 'Email Sent',
      description: 'Check your email for a password reset link',
      variant: 'success',
    })
  }
}
</script>
