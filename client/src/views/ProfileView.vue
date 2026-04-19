<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
      <!-- Background Glow Effects -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse" style="animation-duration: 4s" />
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 animate-pulse" style="animation-duration: 5s" />
      
      <div class="relative z-10">
        <div class="flex items-center gap-4 mb-3">
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Profile Settings</h1>
            <p class="text-muted-foreground mt-1 font-medium">Customize your account preferences and settings</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column - Profile Info -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Profile Card -->
        <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-6">
          <div class="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-primary/15 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          
          <div class="relative z-10">
            <!-- Avatar -->
            <div class="flex flex-col items-center mb-6">
              <div class="relative group mb-4">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/60 to-accent/60 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse" style="animation-duration: 3s" />
                <div class="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-5xl font-bold shadow-2xl ring-4 ring-border/50">
                  {{ authStore.user?.full_name?.[0] || 'U' }}
                </div>
              </div>
              <h2 class="text-2xl font-bold text-foreground">{{ authStore.user?.full_name }}</h2>
              <p class="text-muted-foreground mt-1">{{ authStore.user?.email }}</p>
              <p class="text-sm text-muted-foreground/70 mt-2">Member since {{ formatDate(authStore.user?.created_at || null) }}</p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div class="relative p-4 bg-secondary/30 border-2 border-border/30 rounded-2xl text-center">
                  <p class="text-3xl font-bold font-mono text-blue-400">{{ assetsCount }}</p>
                  <p class="text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wider">Assets</p>
                </div>
              </div>
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div class="relative p-4 bg-secondary/30 border-2 border-border/30 rounded-2xl text-center">
                  <p class="text-3xl font-bold font-mono text-purple-400">{{ alertsCount }}</p>
                  <p class="text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wider">Alerts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-6">
          <div class="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          
          <div class="relative z-10 space-y-3">
            <RouterLink to="/assets/search" class="group flex items-center gap-4 p-4 bg-secondary/30 border-2 border-border/30 rounded-2xl hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-foreground">Manage Assets</p>
                <p class="text-xs text-muted-foreground">View your portfolio</p>
              </div>
              <svg class="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </RouterLink>

            <RouterLink to="/alerts" class="group flex items-center gap-4 p-4 bg-secondary/30 border-2 border-border/30 rounded-2xl hover:border-primary/50 hover:bg-primary/10 transition-all duration-300">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-foreground">Manage Alerts</p>
                <p class="text-xs text-muted-foreground">Configure notifications</p>
              </div>
              <svg class="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </RouterLink>

            <button
              @click="handleLogout"
              class="group flex items-center gap-4 w-full p-4 bg-destructive/10 border-2 border-destructive/30 rounded-2xl hover:bg-destructive hover:border-destructive transition-all duration-300"
            >
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div class="flex-1 text-left">
                <p class="font-semibold text-destructive group-hover:text-white">Logout</p>
                <p class="text-xs text-muted-foreground group-hover:text-white/70">Sign out of your account</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column - Settings -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Profile Information -->
        <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-foreground">Profile Information</h2>
                <p class="text-sm text-muted-foreground">Update your personal details</p>
              </div>
            </div>

            <form @submit.prevent="saveProfileInfo" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Location</label>
                  <input
                    v-model="profileForm.location"
                    type="text"
                    class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
                    placeholder="City, Country"
                  />
                </div>
                <div class="space-y-3">
                  <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Website</label>
                  <input
                    v-model="profileForm.website"
                    type="url"
                    class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div class="space-y-3">
                <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Bio</label>
                <textarea
                  v-model="profileForm.bio"
                  rows="4"
                  class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <button type="submit" :disabled="isSaving" class="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSaving ? 'Saving...' : 'Save Changes' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Trading Preferences -->
        <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
          
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-foreground">Trading Preferences</h2>
                <p class="text-sm text-muted-foreground">Configure your trading settings</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Risk Tolerance</label>
                <select
                  v-model="profileForm.risk_tolerance"
                  class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
                >
                  <option value="LOW">🛡️ Low - Conservative</option>
                  <option value="MEDIUM">⚖️ Medium - Balanced</option>
                  <option value="HIGH">🔥 High - Aggressive</option>
                  <option value="VERY_HIGH">🚀 Very High - Expert</option>
                </select>
              </div>
              <div class="space-y-3">
                <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Experience Level</label>
                <select
                  v-model="profileForm.trading_experience"
                  class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
                >
                  <option value="BEGINNER">🌱 Beginner</option>
                  <option value="INTERMEDIATE">📊 Intermediate</option>
                  <option value="ADVANCED">💼 Advanced</option>
                  <option value="EXPERT">🎯 Expert</option>
                </select>
              </div>
              <div class="space-y-3">
                <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Preferred Currency</label>
                <select
                  v-model="profileForm.preferred_currency"
                  class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
                >
                  <option value="USD">🇺🇸 USD</option>
                  <option value="EUR">🇪🇺 EUR</option>
                  <option value="GBP">🇬🇧 GBP</option>
                </select>
              </div>
              <div class="space-y-3">
                <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Default Chart Timeframe</label>
                <select
                  v-model="profileForm.default_chart_timeframe"
                  class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
                >
                  <option value="5m">5 Minutes</option>
                  <option value="1H">1 Hour</option>
                  <option value="1D">1 Day</option>
                  <option value="7D">7 Days</option>
                  <option value="30D">30 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div class="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
          
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-foreground">Notification Settings</h2>
                <p class="text-sm text-muted-foreground">Manage your notification preferences</p>
              </div>
            </div>

            <div class="space-y-4">
              <ToggleSetting
                v-model="profileForm.email_notifications"
                title="Email Notifications"
                description="Receive alerts and updates via email"
                icon="✉️"
              />
              <ToggleSetting
                v-model="profileForm.price_alert_notifications"
                title="Price Alert Notifications"
                description="Get notified when price targets are hit"
                icon="🎯"
              />
              <ToggleSetting
                v-model="profileForm.market_update_notifications"
                title="Market Updates"
                description="Receive market news and analysis"
                icon="📈"
              />
              <ToggleSetting
                v-model="profileForm.newsletter_subscription"
                title="Newsletter Subscription"
                description="Weekly crypto insights and tips"
                icon="📰"
              />
            </div>
          </div>
        </div>

        <!-- Display Settings -->
        <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div class="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
          
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-foreground">Display Settings</h2>
                <p class="text-sm text-muted-foreground">Customize your interface</p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <label class="block text-sm font-bold text-foreground uppercase tracking-wider">Theme</label>
                <select
                  v-model="profileForm.theme"
                  class="w-full px-5 py-4 bg-secondary/50 border-2 border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 hover:border-primary/30 cursor-pointer"
                >
                  <option value="DARK">🌙 Dark</option>
                  <option value="LIGHT">☀️ Light</option>
                  <option value="SYSTEM">💻 System</option>
                </select>
              </div>
              <ToggleSetting
                v-model="profileForm.show_portfolio_on_dashboard"
                title="Show Portfolio on Dashboard"
                description="Display portfolio overview on main page"
                icon="💼"
              />
            </div>
          </div>
        </div>

        <!-- Save All Button -->
        <div class="flex justify-end">
          <button
            @click="saveAllSettings"
            :disabled="isSaving"
            class="group/btn relative px-12 py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <span class="relative flex items-center gap-3">
              <svg v-if="isSaving" class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-6.396-5.396m0 0H15" />
              </svg>
              <svg v-else class="w-6 h-6 group-hover/btn:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isSaving ? 'Saving All Settings...' : 'Save All Settings' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAssetsStore } from '@/stores/assets'
import { useAlertsStore } from '@/stores/alerts'
import { useProfileStore } from '@/stores/profile'
import { useToast } from '@/composables/useToast'
import ToggleSetting from '@/components/ui/toggle-setting.vue'
import type { UserProfileUpdate } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const profileStore = useProfileStore()
const { toast } = useToast()

const assetsCount = ref(0)
const alertsCount = ref(0)
const isSaving = ref(false)

const profileForm = ref<UserProfileUpdate>({
  bio: null,
  location: null,
  website: null,
  preferred_currency: 'USD',
  risk_tolerance: 'MEDIUM',
  trading_experience: 'BEGINNER',
  email_notifications: true,
  price_alert_notifications: true,
  market_update_notifications: false,
  newsletter_subscription: false,
  theme: 'DARK',
  default_chart_timeframe: '1D',
  show_portfolio_on_dashboard: true,
})

function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function saveProfileInfo() {
  await saveAllSettings()
}

async function saveAllSettings() {
  isSaving.value = true
  
  const success = await profileStore.updateProfile(profileForm.value)
  
  if (success) {
    toast({
      title: 'Settings Saved',
      description: 'Your profile settings have been updated successfully',
      variant: 'success',
    })
  } else {
    toast({
      title: 'Error',
      description: profileStore.error || 'Failed to save settings',
      variant: 'destructive',
    })
  }
  
  isSaving.value = false
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
  // Fetch profile data
  await profileStore.fetchProfile()
  
  // Populate form with profile data
  if (profileStore.profile) {
    const p = profileStore.profile
    profileForm.value = {
      bio: p.bio,
      location: p.location,
      website: p.website,
      preferred_currency: p.preferred_currency,
      risk_tolerance: p.risk_tolerance,
      trading_experience: p.trading_experience,
      email_notifications: p.email_notifications,
      price_alert_notifications: p.price_alert_notifications,
      market_update_notifications: p.market_update_notifications,
      newsletter_subscription: p.newsletter_subscription,
      theme: p.theme,
      default_chart_timeframe: p.default_chart_timeframe,
      show_portfolio_on_dashboard: p.show_portfolio_on_dashboard,
    }
  }
  
  // Fetch assets and alerts count
  await assetsStore.fetchTrackedAssets()
  assetsCount.value = assetsStore.trackedAssets.length
  alertsCount.value = alertsStore.activeAlerts.length
})
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}
</style>
