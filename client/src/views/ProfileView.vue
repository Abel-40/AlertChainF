<template>
  <div class="space-y-6 animate-fade-in">
    <PageHeader
      eyebrow="Account workspace"
      title="Profile settings"
      description="Tune your preferences, notification posture, and display defaults from one control surface."
    />

    <div class="grid gap-4 md:grid-cols-3">
      <MetricCard label="Tracked assets" :value="assetsStore.trackedAssets.length" hint="Markets currently monitored" :icon="WalletCards" />
      <MetricCard label="Active alerts" :value="alertsStore.activeAlerts.length" hint="Rules still running" :icon="BellRing" tone="success" />
      <MetricCard label="Theme" :value="profileForm.theme || 'SYSTEM'" hint="Preferred display mode" :icon="Palette" tone="warning" />
    </div>

    <div class="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div class="space-y-6">
        <SectionCard title="Identity" description="Your current account snapshot.">
          <div class="flex flex-col items-center text-center">
            <div class="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary text-3xl font-semibold text-primary-foreground shadow-lg shadow-primary/25">
              {{ authStore.user?.full_name?.[0] || 'U' }}
            </div>
            <h2 class="mt-4 text-2xl font-semibold text-foreground">{{ authStore.user?.full_name }}</h2>
            <p class="mt-1 text-sm text-muted-foreground">{{ authStore.user?.email }}</p>
            <p class="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">Member since {{ memberSince }}</p>
          </div>
        </SectionCard>

        <SectionCard title="Quick actions" description="Fast links for common workflows.">
          <div class="space-y-3">
            <RouterLink to="/assets/search" class="block rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary">Manage assets</RouterLink>
            <RouterLink to="/alerts" class="block rounded-[1.25rem] border border-border/60 bg-background/60 p-4 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary">Manage alerts</RouterLink>
            <button type="button" class="w-full rounded-[1.25rem] bg-destructive/10 p-4 text-left text-sm font-semibold text-destructive transition hover:bg-destructive/15" @click="handleLogout">Logout</button>
          </div>
        </SectionCard>
      </div>

      <div class="space-y-6">
        <SectionCard title="Profile information" description="Optional personal details for your account profile.">
          <form class="grid gap-4 md:grid-cols-2" @submit.prevent="saveAllSettings">
            <div>
              <label class="label mb-2">Location</label>
              <input v-model="profileForm.location" type="text" class="input" placeholder="City, Country" />
            </div>
            <div>
              <label class="label mb-2">Website</label>
              <input v-model="profileForm.website" type="url" class="input" placeholder="https://example.com" />
            </div>
            <div class="md:col-span-2">
              <label class="label mb-2">Bio</label>
              <textarea v-model="profileForm.bio" rows="4" class="input min-h-28 resize-none" placeholder="Tell us about yourself..." />
            </div>
            <div>
              <label class="label mb-2">Preferred currency</label>
              <select v-model="profileForm.preferred_currency" class="input">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label class="label mb-2">Theme</label>
              <select v-model="profileForm.theme" class="input">
                <option value="SYSTEM">System</option>
                <option value="LIGHT">Light</option>
                <option value="DARK">Dark</option>
              </select>
            </div>
          </form>
        </SectionCard>

        <SectionCard title="Trading preferences" description="Default account behavior for analysis and alerting.">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="label mb-2">Risk tolerance</label>
              <select v-model="profileForm.risk_tolerance" class="input">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="VERY_HIGH">Very high</option>
              </select>
            </div>
            <div>
              <label class="label mb-2">Experience</label>
              <select v-model="profileForm.trading_experience" class="input">
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
                <option value="EXPERT">Expert</option>
              </select>
            </div>
            <div>
              <label class="label mb-2">Default timeframe</label>
              <select v-model="profileForm.default_chart_timeframe" class="input">
                <option value="5m">5 Minutes</option>
                <option value="1H">1 Hour</option>
                <option value="1D">1 Day</option>
                <option value="7D">7 Days</option>
                <option value="30D">30 Days</option>
              </select>
            </div>
            <div>
              <label class="label mb-2">Default alert condition</label>
              <select v-model="profileForm.default_alert_condition" class="input">
                <option value="ABOVE">Above</option>
                <option value="BELOW">Below</option>
              </select>
            </div>
            <div>
              <label class="label mb-2">Alert cooldown (minutes)</label>
              <input v-model.number="profileForm.alert_cooldown_minutes" type="number" min="0" class="input" />
            </div>
            <div>
              <label class="label mb-2">Max active alerts</label>
              <input v-model.number="profileForm.max_active_alerts" type="number" min="1" class="input" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Notification and display settings" description="Delivery preferences and dashboard behavior.">
          <div class="space-y-3">
            <ToggleSetting v-model="profileForm.email_notifications" title="Email notifications" description="Receive alert updates over email." icon="Mail" />
            <ToggleSetting v-model="profileForm.price_alert_notifications" title="Price alert notifications" description="Notify when targets are hit." icon="Bell" />
            <ToggleSetting v-model="profileForm.market_update_notifications" title="Market update notifications" description="Receive market trend summaries." icon="Signal" />
            <ToggleSetting v-model="profileForm.newsletter_subscription" title="Newsletter subscription" description="Get periodic product and market updates." icon="News" />
            <ToggleSetting v-model="profileForm.show_portfolio_on_dashboard" title="Show portfolio on dashboard" description="Display portfolio modules in the main workspace." icon="Grid" />
          </div>
        </SectionCard>

        <div class="flex justify-end">
          <button type="button" class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50" :disabled="isSaving" @click="saveAllSettings">
            {{ isSaving ? 'Saving...' : 'Save settings' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { BellRing, Palette, WalletCards } from 'lucide-vue-next'
import MetricCard from '@/components/data-display/MetricCard.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionCard from '@/components/layout/SectionCard.vue'
import ToggleSetting from '@/components/ui/toggle-setting.vue'
import { useAuthStore } from '@/stores/auth'
import { useAssetsStore } from '@/stores/assets'
import { useAlertsStore } from '@/stores/alerts'
import { useProfileStore } from '@/stores/profile'
import { useToast } from '@/composables/useToast'
import type { UserProfileUpdate } from '@/types'

const router = useRouter()
const authStore = useAuthStore()
const assetsStore = useAssetsStore()
const alertsStore = useAlertsStore()
const profileStore = useProfileStore()
const { toast } = useToast()

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
  theme: 'SYSTEM',
  default_chart_timeframe: '1D',
  show_portfolio_on_dashboard: true,
  default_alert_condition: 'ABOVE',
  alert_cooldown_minutes: 30,
  max_active_alerts: 10,
})

const memberSince = computed(() => {
  const createdAt = authStore.user?.created_at
  if (!createdAt) return 'Unknown'
  return new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})

async function saveAllSettings() {
  isSaving.value = true
  const success = await profileStore.updateProfile(profileForm.value)
  isSaving.value = false

  if (!success) {
    toast({ title: 'Unable to save settings', description: profileStore.error || 'Please try again.', variant: 'destructive' })
    return
  }

  toast({ title: 'Settings saved', description: 'Your profile settings were updated successfully.', variant: 'success' })
}

async function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) return
  await authStore.logout()
  toast({ title: 'Logged out', description: 'You have been signed out successfully.', variant: 'success' })
  router.push('/login')
}

onMounted(async () => {
  await Promise.all([profileStore.fetchProfile(), assetsStore.fetchTrackedAssets(), alertsStore.fetchAlerts()])

  if (profileStore.profile) {
    const profile = profileStore.profile
    profileForm.value = {
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      preferred_currency: profile.preferred_currency,
      risk_tolerance: profile.risk_tolerance,
      trading_experience: profile.trading_experience,
      email_notifications: profile.email_notifications,
      price_alert_notifications: profile.price_alert_notifications,
      market_update_notifications: profile.market_update_notifications,
      newsletter_subscription: profile.newsletter_subscription,
      theme: profile.theme,
      default_chart_timeframe: profile.default_chart_timeframe,
      show_portfolio_on_dashboard: profile.show_portfolio_on_dashboard,
      default_alert_condition: profile.default_alert_condition,
      alert_cooldown_minutes: profile.alert_cooldown_minutes,
      max_active_alerts: profile.max_active_alerts,
    }
  }
})
</script>
