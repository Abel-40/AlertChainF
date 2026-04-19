<template>
  <div class="min-h-screen bg-background bg-grid">
    <!-- Sidebar (Only for Alert System) - Desktop -->
    <aside 
      v-if="currentModule === 'alert-system'"
      :class="[
        'hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card/95 backdrop-blur-xl border-r border-border transition-all duration-300 z-40',
        isCollapsed ? 'w-20' : 'w-64',
      ]"
    >
      <!-- Navigation -->
      <nav class="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
        <RouterLink
          v-for="item in sidebarItems"
          :key="item.path"
          :to="item.path"
          @click="isMobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            isActive(item.path) 
              ? 'bg-primary/20 text-primary' 
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          ]"
        >
          <div v-html="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="!isCollapsed" class="font-medium">{{ item.label }}</span>
          <!-- Badge for notifications -->
          <span 
            v-if="item.badge && item.badge > 0 && !isCollapsed" 
            class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-destructive text-white"
          >
            {{ item.badge > 99 ? '99+' : item.badge }}
          </span>
        </RouterLink>
      </nav>

      <!-- Collapse Toggle -->
      <button
        @click="toggleSidebar"
        class="absolute bottom-4 right-4 p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
      >
        <svg 
          v-if="!isCollapsed" 
          class="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <svg 
          v-else 
          class="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>
    </aside>

    <!-- Mobile Sidebar Menu (Hamburger) -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden fixed inset-0 z-40 pt-16"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="isMobileMenuOpen = false" />
      
      <!-- Menu Content -->
      <div class="relative bg-card/95 backdrop-blur-xl border-b border-border shadow-2xl animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
        <nav class="p-4 space-y-2">
          <button
            v-for="item in navbarItems"
            :key="item.path"
            @click="handleNavbarClick(item); isMobileMenuOpen = false"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full',
              isActiveModule(item.path) 
                ? 'bg-primary/20 text-primary' 
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            ]"
          >
            <div v-html="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span class="font-medium">{{ item.label }}</span>
            <!-- Coming Soon Badge -->
            <span 
              v-if="item.comingSoon" 
              class="ml-auto px-2 py-0.5 text-xs font-semibold rounded-full bg-secondary text-muted-foreground"
            >
              Soon
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Mobile Bottom Navigation (Alert System Sidebar Items) -->
    <nav
      v-if="currentModule === 'alert-system'"
      class="lg:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
    >
      <!-- Glassmorphism Background -->
      <div class="absolute inset-0 bg-card/80 backdrop-blur-xl border-t border-border/50" />
      
      <div class="relative flex items-end justify-around h-16 pb-1">
        <RouterLink
          v-for="(item, index) in sidebarItems.slice(0, 5)"
          :key="item.path"
          :to="item.path"
          :class="[
            'relative flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-0 flex-1 transition-all duration-300 ease-out',
            isActive(item.path) 
              ? 'text-primary -translate-y-0.5' 
              : 'text-muted-foreground hover:text-foreground'
          ]"
          @click="handleNavClick(index, $event)"
        >
          <!-- Click Ripple Effect -->
          <span
            v-if="clickedIndex === index"
            class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
          >
            <span
              class="w-0 h-0 bg-gradient-to-br from-primary/50 to-accent/50 rounded-full animate-click-ripple"
            />
          </span>
          
          <!-- Icon Container with Animation -->
          <div class="relative z-10">
            <div 
              class="relative w-7 h-7 flex items-center justify-center transition-all duration-300"
              :class="[
                isActive(item.path) ? 'scale-110' : 'scale-100',
                clickedIndex === index ? 'animate-icon-pop' : ''
              ]"
            >
              <div v-html="item.icon" class="w-6 h-6" />
            </div>
          </div>
          
          <!-- Badge for notifications -->
          <span 
            v-if="item.badge && item.badge > 0" 
            class="absolute top-0 right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce-in border-2 border-card z-20"
          >
            {{ item.badge > 9 ? '9+' : item.badge }}
          </span>
          
          <!-- Label with Animation -->
          <span 
            class="relative z-10 text-[10px] font-medium truncate transition-all duration-300"
            :class="isActive(item.path) ? 'opacity-100 font-semibold' : 'opacity-70'"
          >
            {{ item.label }}
          </span>
        </RouterLink>
      </div>
    </nav>

    <!-- Top Navbar -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border h-16">
      <div class="flex items-center justify-between h-full px-4 md:px-6">
        <!-- Logo & Hamburger -->
        <div class="flex items-center gap-3">
          <!-- Hamburger Menu (Mobile Only) -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <RouterLink to="/dashboard" class="flex items-center gap-3">
            <div class="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg class="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="text-lg md:text-xl font-bold gradient-text hidden sm:block">AlertChain</span>
          </RouterLink>
        </div>

        <!-- Main Navbar Items (Desktop) -->
        <nav class="hidden lg:flex items-center gap-2">
          <button
            v-for="item in navbarItems"
            :key="item.path"
            @click="handleNavbarClick(item)"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm',
              isActiveModule(item.path)
                ? 'bg-primary/20 text-primary'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            ]"
          >
            <div v-html="item.icon" class="w-5 h-5" />
            <span>{{ item.label }}</span>
            <!-- Coming Soon Badge -->
            <span 
              v-if="item.comingSoon" 
              class="px-2 py-0.5 text-xs font-semibold rounded-full bg-secondary text-muted-foreground"
            >
              Soon
            </span>
          </button>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-2 md:gap-3">
          <!-- Notifications - Mobile Button -->
          <RouterLink
            to="/notifications"
            class="md:hidden relative p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
            </svg>
            <span 
              v-if="notificationsStore.unreadCount > 0" 
              class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-card"
            >
              {{ notificationsStore.unreadCount > 99 ? '99+' : notificationsStore.unreadCount }}
            </span>
          </RouterLink>

          <!-- Notifications - Desktop Modal -->
          <div class="relative hidden md:block" ref="notificationRef">
            <button
              @click.stop="toggleNotificationPanel"
              class="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
              </svg>
              <span 
                v-if="notificationsStore.unreadCount > 0" 
                class="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] px-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg border-2 border-card"
              >
                {{ notificationsStore.unreadCount > 99 ? '99+' : notificationsStore.unreadCount }}
              </span>
            </button>

            <!-- Notification Dropdown Panel -->
            <div
              v-if="isNotificationPanelOpen"
              class="absolute right-0 mt-2 w-96 bg-card border-2 border-border shadow-2xl animate-fade-in rounded-xl overflow-hidden z-50"
              style="max-height: 28rem;"
            >
              <div class="p-4 border-b border-border">
                <div class="flex items-center justify-between">
                  <h3 class="font-bold text-lg">Notifications</h3>
                  <button 
                    v-if="notificationsStore.unreadCount > 0"
                    @click="markAllAsRead"
                    class="text-xs text-primary hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
              </div>
              <div class="overflow-y-auto" style="max-height: 22rem;">
                <div v-if="notificationsStore.notifications.length === 0" class="p-8 text-center">
                  <svg class="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p class="text-muted-foreground text-sm">No notifications yet</p>
                </div>
                <div
                  v-for="notif in notificationsStore.notifications.slice(0, 10)"
                  :key="notif.id"
                  :class="[
                    'p-4 border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer',
                    !notif.is_read ? 'bg-primary/5' : ''
                  ]"
                  @click="handleNotificationClick(notif)"
                >
                  <div class="flex items-start gap-3">
                    <div class="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" v-if="!notif.is_read" />
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold truncate">{{ notif.message }}</p>
                      <p class="text-xs text-muted-foreground/70 mt-2">{{ formatTimeAgo(notif.created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border-t border-border">
                <RouterLink 
                  to="/notifications" 
                  @click="isNotificationPanelOpen = false"
                  class="block text-center text-sm text-primary hover:underline font-semibold"
                >
                  View All Notifications →
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- User Menu -->
          <div class="relative" ref="userMenuRef">
            <button
              @click.stop="toggleUserMenu"
              class="flex items-center gap-2 p-1.5 md:p-2 rounded-lg hover:bg-secondary transition-all"
            >
              <div class="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                {{ authStore.user?.full_name?.[0] || 'U' }}
              </div>
              <span class="hidden md:block text-sm font-medium">{{ authStore.user?.full_name || 'User' }}</span>
            </button>

            <!-- Dropdown -->
            <div
              v-if="isUserMenuOpen"
              class="absolute right-0 mt-2 w-56 bg-card border-2 border-border py-2 animate-fade-in shadow-2xl rounded-xl z-50"
            >
              <div class="px-4 py-3 border-b border-border">
                <p class="text-sm font-semibold">{{ authStore.user?.full_name || 'User' }}</p>
                <p class="text-xs text-muted-foreground mt-0.5">{{ authStore.user?.email }}</p>
              </div>
              <RouterLink
                to="/profile"
                @click="isUserMenuOpen = false"
                class="flex items-center gap-3 px-4 py-3 text-sm hover:bg-secondary transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Settings
              </RouterLink>
              <hr class="my-2 border-border" />
              <button
                @click="handleLogout"
                class="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-destructive hover:bg-secondary/50 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div 
      :class="[
        'transition-all duration-300 pt-16 pb-20 lg:pb-6',
        currentModule === 'alert-system' ? (isCollapsed ? 'lg:ml-20' : 'lg:ml-64') : 'ml-0'
      ]"
    >
      <!-- Page Content -->
      <main class="p-4 md:p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const isCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const isNotificationPanelOpen = ref(false)
const notificationRef = ref<HTMLElement | null>(null)
const userMenuRef = ref<HTMLElement | null>(null)
const clickedIndex = ref<number | null>(null)

// Top Navbar Items (Main Modules)
const navbarItems = computed(() => [
  {
    path: '/alert-system',
    label: 'Alert System',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" /></svg>`
  },
  {
    path: '/trading',
    label: 'Trading',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`,
    comingSoon: true
  },
  {
    path: '/portfolio',
    label: 'Portfolio',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>`,
    comingSoon: true
  },
  {
    path: '/ai-insights',
    label: 'AI Insights',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>`,
    comingSoon: true
  }
])

// Sidebar Items (Only for Alert System)
const sidebarItems = computed(() => [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
  },
  {
    path: '/assets/search',
    label: 'Assets',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>`
  },
  {
    path: '/alerts',
    label: 'Alerts',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" /></svg>`
  },
  {
    path: '/notifications',
    label: 'Notifications',
    badge: notificationsStore.unreadCount,
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>`
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`
  }
])

// Determine which module is currently active
const currentModule = computed(() => {
  const path = router.currentRoute.value.path
  if (path.startsWith('/trading')) return 'trading'
  if (path.startsWith('/portfolio')) return 'portfolio'
  if (path.startsWith('/ai-insights')) return 'ai-insights'
  return 'alert-system' // Default
})

function isActiveModule(modulePath: string) {
  return currentModule.value === modulePath.replace('/', '')
}

function isActive(path: string) {
  return router.currentRoute.value.path === path
}

function handleNavbarClick(item: any) {
  if (item.comingSoon) {
    // Show coming soon message
    router.push('/coming-soon')
  } else {
    router.push('/dashboard')
  }
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
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

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString()
}

function getActiveIndex() {
  const items = sidebarItems.value.slice(0, 5)
  const currentIndex = items.findIndex(item => isActive(item.path))
  return currentIndex >= 0 ? currentIndex : 0
}

function handleNavClick(index: number, event: MouseEvent) {
  clickedIndex.value = index
  
  // Reset after animation completes
  setTimeout(() => {
    clickedIndex.value = null
  }, 600)
}

async function handleNotificationClick(notif: any) {
  if (!notif.is_read) {
    await notificationsStore.markAsRead(notif.id)
  }
  isNotificationPanelOpen.value = false
  router.push(`/notifications/${notif.id}`)
}

async function markAllAsRead() {
  await notificationsStore.markAllAsRead()
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

// Close panels when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  
  // Close notification panel
  if (isNotificationPanelOpen.value && notificationRef.value) {
    if (!notificationRef.value.contains(target)) {
      isNotificationPanelOpen.value = false
    }
  }
  
  // Close user menu
  if (isUserMenuOpen.value && userMenuRef.value) {
    if (!userMenuRef.value.contains(target)) {
      isUserMenuOpen.value = false
    }
  }
}

onMounted(async () => {
  // Verify user session is still valid
  if (authStore.token && !authStore.user) {
    const success = await authStore.fetchMe()
    if (!success) {
      // Session expired or invalid, redirect to login
      authStore.logout()
      router.push('/login')
      return
    }
  }
  
  // Fetch unread notifications count
  if (authStore.isAuthenticated) {
    await notificationsStore.fetchUnreadCount()
    await notificationsStore.fetchNotifications()
  }
  
  // Add click outside listener
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
