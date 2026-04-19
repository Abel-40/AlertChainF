<template>
  <div class="min-h-screen app-shell-bg text-foreground">
    <AppSidebar
      :badge-count="notificationsStore.unreadCount"
      :collapsed="isSidebarCollapsed"
      :items="currentModule.sidebar"
      :module="currentModule"
      @toggle-collapse="isSidebarCollapsed = !isSidebarCollapsed"
    />

    <div
      class="min-h-screen transition-all duration-300"
      :class="isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'"
    >
      <header class="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
        <div class="mx-auto flex h-16 max-w-[1480px] items-center gap-3 px-4 sm:px-5">
          <button
            type="button"
            class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card/65 text-muted-foreground transition hover:border-primary/35 hover:text-primary lg:hidden"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Menu v-if="!isMobileMenuOpen" class="h-5 w-5" />
            <X v-else class="h-5 w-5" />
          </button>

          <div class="lg:hidden">
            <AppBrand />
          </div>

          <AppModuleTabs
            :current-module="currentModule"
            :modules="appModules"
            @select="handleModuleSelect"
          />

          <div class="ml-auto flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card/65 text-muted-foreground transition hover:border-primary/35 hover:text-primary"
              @click="themeStore.toggleTheme()"
            >
              <SunMedium v-if="themeStore.isDarkMode" class="h-5 w-5" />
              <MoonStar v-else class="h-5 w-5" />
            </button>

            <div class="relative" ref="notificationRef">
              <button
                type="button"
                class="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-card/65 text-muted-foreground transition hover:border-primary/35 hover:text-primary"
                @click.stop="toggleNotificationPanel"
              >
                <Bell class="h-4.5 w-4.5" />
                <span
                  v-if="notificationsStore.unreadCount > 0"
                  class="absolute right-1.5 top-1.5 inline-flex min-w-4.5 items-center justify-center rounded-full bg-destructive px-1 py-0.5 text-[10px] font-semibold text-destructive-foreground"
                >
                  {{ notificationsStore.unreadCount > 99 ? '99+' : notificationsStore.unreadCount }}
                </span>
              </button>

              <div
                v-if="isNotificationPanelOpen"
                class="absolute right-0 top-[calc(100%+0.5rem)] w-[min(21rem,calc(100vw-2rem))] rounded-2xl border border-border/70 bg-popover/95 p-2 shadow-[0_20px_55px_rgba(15,23,42,0.22)] backdrop-blur-2xl"
              >
                <div class="flex items-center justify-between px-3 py-2">
                  <div>
                    <p class="text-sm font-semibold text-foreground">Notifications</p>
                    <p class="text-[11px] text-muted-foreground">Recent triggered alerts and delivery status</p>
                  </div>
                  <button
                    v-if="notificationsStore.unreadCount > 0"
                    type="button"
                    class="text-xs font-semibold text-primary transition hover:opacity-80"
                    @click="markAllAsRead"
                  >
                    Mark all read
                  </button>
                </div>

                <div v-if="notificationsStore.notifications.length === 0" class="px-3 py-8 text-center">
                  <p class="text-sm font-medium text-foreground">No notifications yet</p>
                  <p class="mt-1 text-xs text-muted-foreground">Triggered alerts will appear here.</p>
                </div>

                <div v-else class="mt-1 space-y-1">
                  <button
                    v-for="notification in notificationsStore.notifications.slice(0, 6)"
                    :key="notification.id"
                    type="button"
                    class="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-secondary/70"
                    @click="handleNotificationClick(notification.id)"
                  >
                    <div
                      class="mt-1 h-2.5 w-2.5 rounded-full"
                      :class="notification.is_read ? 'bg-muted-foreground/35' : 'bg-primary'"
                    />
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-medium text-foreground">{{ notification.message }}</p>
                      <p class="mt-1 text-xs text-muted-foreground">{{ formatTimeAgo(notification.created_at) }}</p>
                    </div>
                  </button>
                </div>

                <RouterLink
                  to="/notifications"
                  class="mt-1 block rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-secondary/70"
                  @click="isNotificationPanelOpen = false"
                >
                  View all notifications
                </RouterLink>
              </div>
            </div>

            <div class="relative" ref="userMenuRef">
              <button
                type="button"
                class="flex items-center gap-2 rounded-xl border border-border/60 bg-card/65 px-2 py-2 transition hover:border-primary/35"
                @click.stop="toggleUserMenu"
              >
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                  {{ authStore.user?.full_name?.[0] || 'U' }}
                </div>
                <div class="hidden text-left md:block">
                  <p class="text-sm font-semibold text-foreground">{{ authStore.user?.full_name || 'User' }}</p>
                  <p class="text-[11px] text-muted-foreground">{{ authStore.user?.email || 'Signed in' }}</p>
                </div>
                <ChevronDown class="hidden h-4 w-4 text-muted-foreground md:block" />
              </button>

              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-3 w-60 rounded-3xl border border-border/70 bg-popover/95 p-2 shadow-[0_24px_70px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
              >
                <RouterLink
                  to="/profile"
                  class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-secondary/75"
                  @click="isUserMenuOpen = false"
                >
                  <UserRound class="h-4 w-4 text-primary" />
                  Profile settings
                </RouterLink>
                <button
                  type="button"
                  class="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-destructive transition hover:bg-destructive/8"
                  @click="handleLogout"
                >
                  <LogOut class="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-20 bg-slate-950/35 backdrop-blur-sm lg:hidden"
        @click="isMobileMenuOpen = false"
      />

      <aside
        class="fixed inset-y-16 left-4 right-4 z-30 overflow-hidden rounded-[1.5rem] border border-border/70 bg-popover/96 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.25)] backdrop-blur-2xl lg:hidden"
        :class="isMobileMenuOpen ? 'block' : 'hidden'"
      >
        <div class="mb-4 rounded-3xl border border-border/60 bg-background/65 p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Module navigation</p>
          <div class="mt-4 grid gap-2">
            <button
              v-for="module in appModules"
              :key="module.id"
              type="button"
              class="flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition"
              :class="currentModule.id === module.id ? 'bg-primary text-primary-foreground' : 'bg-secondary/55 text-foreground'"
              @click="handleModuleSelect(module)"
            >
              <component :is="module.icon" class="h-5 w-5" />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold">{{ module.label }}</p>
                <p class="truncate text-xs" :class="currentModule.id === module.id ? 'text-primary-foreground/80' : 'text-muted-foreground'">
                  {{ module.enabled ? module.description : 'Coming soon' }}
                </p>
              </div>
            </button>
          </div>
        </div>

        <div class="space-y-1">
          <RouterLink
            v-for="item in currentModule.sidebar"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition"
            :class="isCurrentPath(item.path, item.exact) ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary/70'"
            @click="isMobileMenuOpen = false"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span>{{ item.label }}</span>
            <span
              v-if="item.badgeKey && notificationsStore.unreadCount > 0"
              class="ml-auto inline-flex min-w-6 items-center justify-center rounded-full bg-white/18 px-2 py-0.5 text-[11px] font-semibold"
            >
              {{ notificationsStore.unreadCount > 99 ? '99+' : notificationsStore.unreadCount }}
            </span>
          </RouterLink>
        </div>
      </aside>

      <main class="mx-auto max-w-[1480px] px-4 pb-28 pt-4 sm:px-5 lg:pb-8">
        <router-view />
      </main>
    </div>

    <AppMobileNav :badge-count="notificationsStore.unreadCount" :items="currentModule.sidebar" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  MoonStar,
  SunMedium,
  UserRound,
  X,
} from 'lucide-vue-next'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'
import { useThemeStore } from '@/stores/theme'
import { appModules, getModuleByPath, type AppModule } from '@/constants/navigation'
import AppBrand from '@/components/layout/AppBrand.vue'
import AppMobileNav from '@/components/navigation/AppMobileNav.vue'
import AppModuleTabs from '@/components/navigation/AppModuleTabs.vue'
import AppSidebar from '@/components/navigation/AppSidebar.vue'
import { useToast } from '@/composables/useToast'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()
const themeStore = useThemeStore()
const route = useRoute()
const router = useRouter()
const { toast } = useToast()

const isSidebarCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
const isNotificationPanelOpen = ref(false)
const isUserMenuOpen = ref(false)
const notificationRef = ref<HTMLElement | null>(null)
const userMenuRef = ref<HTMLElement | null>(null)

const currentModule = computed(() => getModuleByPath(route.path))
const currentPageTitle = computed(() => String(route.meta.title || currentModule.value.label))

function isCurrentPath(path: string, exact = false) {
  return exact ? route.path === path : route.path === path || route.path.startsWith(`${path}/`)
}

function handleModuleSelect(module: AppModule) {
  if (!module.enabled) {
    toast({
      title: `${module.label} is coming soon`,
      description: `${module.label} already has a dedicated navigation model, so we can plug in its own sidebar as soon as those screens are ready.`,
      variant: 'default',
    })
    return
  }

  isMobileMenuOpen.value = false
  router.push(module.path)
}

function toggleNotificationPanel() {
  isNotificationPanelOpen.value = !isNotificationPanelOpen.value
  if (isNotificationPanelOpen.value) {
    isUserMenuOpen.value = false
  }
}

function toggleUserMenu() {
  isUserMenuOpen.value = !isUserMenuOpen.value
  if (isUserMenuOpen.value) {
    isNotificationPanelOpen.value = false
  }
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`

  return date.toLocaleDateString()
}

async function handleNotificationClick(notificationId: string) {
  const notification = notificationsStore.notifications.find((item) => item.id === notificationId)
  if (notification && !notification.is_read) {
    await notificationsStore.markAsRead(notificationId)
  }
  isNotificationPanelOpen.value = false
  router.push(`/notifications/${notificationId}`)
}

async function markAllAsRead() {
  await notificationsStore.markAllAsRead()
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement

  if (isNotificationPanelOpen.value && notificationRef.value && !notificationRef.value.contains(target)) {
    isNotificationPanelOpen.value = false
  }

  if (isUserMenuOpen.value && userMenuRef.value && !userMenuRef.value.contains(target)) {
    isUserMenuOpen.value = false
  }
}

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    const success = await authStore.fetchMe()
    if (!success) {
      authStore.logout()
      router.push('/login')
      return
    }
  }

  if (authStore.isAuthenticated) {
    await Promise.all([
      notificationsStore.fetchUnreadCount(),
      notificationsStore.fetchNotifications(),
    ])
  }

  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
