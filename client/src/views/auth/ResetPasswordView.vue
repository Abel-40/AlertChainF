<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <Logo />
      </div>

      <!-- Form Card -->
      <div class="card border-slate-700">
        <h1 class="text-2xl font-bold text-center mb-6">Reset Password</h1>

        <form @submit.prevent="handleResetPassword" class="space-y-4">
          <!-- Token (from URL) -->
          <div>
            <label class="label mb-2">Reset Token</label>
            <input
              v-model="token"
              type="text"
              class="input"
              placeholder="Enter your reset token"
              required
            />
          </div>

          <!-- New Password -->
          <div>
            <label class="label mb-2">New Password</label>
            <input
              v-model="form.password"
              type="password"
              class="input"
              placeholder="Enter new password"
              required
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="label mb-2">Confirm Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="input"
              placeholder="Confirm new password"
              required
            />
            <div v-if="passwordMismatch" class="text-red-500 text-sm mt-1">
              Passwords do not match
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="authStore.error" class="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
            {{ authStore.error }}
          </div>

          <!-- Success Message -->
          <div v-if="submitted" class="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-sm">
            Password reset successfully! Redirecting to login...
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading || passwordMismatch || submitted"
            class="btn btn-primary w-full"
          >
            <span v-if="authStore.isLoading">Resetting...</span>
            <span v-else>Reset Password</span>
          </button>
        </form>

        <!-- Links -->
        <div class="mt-6 text-center text-sm">
          <RouterLink to="/login" class="text-primary hover:underline">
            Back to Login
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import Logo from '@/components/Logo.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { toast } = useToast()

const token = ref('')
const submitted = ref(false)
const form = reactive({
  password: '',
  confirmPassword: '',
})

const passwordMismatch = computed(() => {
  return form.password && form.confirmPassword && form.password !== form.confirmPassword
})

onMounted(() => {
  // Get token from URL query params
  token.value = (route.query.token as string) || ''
})

async function handleResetPassword() {
  if (passwordMismatch.value) {
    toast({
      title: 'Error',
      description: 'Passwords do not match',
      variant: 'destructive',
    })
    return
  }

  const success = await authStore.resetPassword(form.password, token.value)
  if (success) {
    submitted.value = true
    toast({
      title: 'Password Reset',
      description: 'Your password has been reset successfully',
      variant: 'success',
    })
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
}
</script>
