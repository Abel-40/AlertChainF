<template>
  <div class="min-h-screen bg-background bg-grid">
    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed left-0 top-0 h-screen bg-card/95 backdrop-blur-xl border-r border-border transition-all duration-300 z-50',
        isCollapsed ? 'w-20' : 'w-64'
      ]"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-between px-4 border-b border-border">
        <RouterLink to="/dashboard" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span v-if="!isCollapsed" class="text-xl font-bold gradient-text">AlertChain</span>
        </RouterLink>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
            isActive(item.path) 
              ? 'bg-primary/20 text-primary glow-primary' 
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

    <!-- Main Content -->
    <div 
      :class="[
        'transition-all duration-300',
        isCollapsed ? 'ml-20' : 'ml-64'
      ]"
    >
      <!-- Top Header -->
      <header class="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border">
        <div class="flex items-center justify-between h-16 px-6">
          <!-- Mobile Menu Toggle -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Global Search -->
          <div class="flex-1 max-w-xl mx-4">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                @keyup.enter="handleSearch"
                type="text"
                placeholder="Search assets, alerts..."
                class="input pl-10"
              />
            </div>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3">
            <!-- Notifications -->
            <RouterLink
              to="/notifications"
              class="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
              </svg>
              <span 
                v-if="notificationsStore.unreadCount > 0" 
                class="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"
              />
            </RouterLink>

            <!-- User Menu -->
            <div class="relative">
              <button
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-all"
              >
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {{ authStore.user?.full_name?.[0] || 'U' }}
                </div>
                <span class="hidden md:block text-sm font-medium">{{ authStore.user?.full_name || 'User' }}</span>
              </button>

              <!-- Dropdown -->
              <div
                v-if="isUserMenuOpen"
                class="absolute right-0 mt-2 w-48 glass-card py-2 animate-fade-in"
              >
                <RouterLink
                  to="/profile"
                  @click="isUserMenuOpen = false"
                  class="block px-4 py-2 text-sm hover:bg-secondary transition-colors"
                >
                  Profile Settings
                </RouterLink>
                <hr class="my-2 border-border" />
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const isCollapsed = ref(false)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
const searchQuery = ref('')

const navItems = computed(() => [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`
  },
  {
    path: '/assets/search',
    label: 'Assets',
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
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

function isActive(path: string) {
  return router.currentRoute.value.path === path
}

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/assets/search', query: { q: searchQuery.value } })
  }
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

onMounted(async () => {
  // Fetch unread notifications count
  if (authStore.isAuthenticated) {
    await notificationsStore.fetchUnreadCount()
  }
})
</script>
