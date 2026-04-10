<template>
  <div class="space-y-6 animate-fade-in max-w-3xl">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold mb-2">Profile Settings</h1>
      <p class="text-muted-foreground">Manage your account settings</p>
    </div>

    <!-- Profile Card -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-xl">
      <div class="flex items-center gap-6 mb-8">
        <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
          {{ authStore.user?.full_name?.[0] || 'U' }}
        </div>
        <div>
          <h2 class="text-2xl font-bold">{{ authStore.user?.full_name }}</h2>
          <p class="text-muted-foreground">{{ authStore.user?.email }}</p>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Account Info -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Account Information</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
              <div class="px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground">
                {{ authStore.user?.full_name }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <div class="px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground">
                {{ authStore.user?.email }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2">Member Since</label>
              <div class="px-4 py-3 bg-secondary/30 border border-border rounded-xl text-foreground">
                {{ formatDate(authStore.user?.created_at) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Assets Tracked -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Portfolio</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-secondary/30 border border-border rounded-xl p-4">
              <p class="text-sm text-muted-foreground mb-1">Assets Tracked</p>
              <p class="text-2xl font-bold font-mono">{{ assetsCount }}</p>
            </div>
            <div class="bg-secondary/30 border border-border rounded-xl p-4">
              <p class="text-sm text-muted-foreground mb-1">Active Alerts</p>
              <p class="text-2xl font-bold font-mono">{{ alertsCount }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="pt-6 border-t border-border space-y-3">
          <RouterLink to="/assets/search" class="block w-full px-6 py-3 bg-secondary/50 border border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-all text-center">
            Manage Assets
          </RouterLink>
          <RouterLink to="/alerts" class="block w-full px-6 py-3 bg-secondary/50 border border-border text-foreground font-medium rounded-xl hover:bg-secondary transition-all text-center">
            Manage Alerts
          </RouterLink>
          <button
            @click="handleLogout"
            class="w-full px-6 py-3 bg-destructive/10 border border-destructive/30 text-destructive font-medium rounded-xl hover:bg-destructive hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAssetsStore } from '@/stores/assets'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const authStore = useAuthStore()
const assetsStore = useAssetsStore()
const { toast } = useToast()

const assetsCount = ref(0)
const alertsCount = ref(0)

function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) return
  
  await authStore.logout()
  toast({
    title: 'Logged Out',
    description: 'You have been successfully logged out',
    variant: 'success',
  })
  router.push('/login')
}

onMounted(async () => {
  await assetsStore.fetchTrackedAssets()
  assetsCount.value = assetsStore.trackedAssets.length
})
</script>
