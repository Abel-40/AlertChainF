<template>
  <div class="space-y-4 sm:space-y-6 animate-fade-in">
    <!-- Header -->
    <div class="relative overflow-hidden bg-gradient-to-br from-card/90 via-card/70 to-card/50 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
      <!-- Background Glow Effects -->
      <div class="absolute top-0 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-2xl sm:blur-3xl -translate-y-1/3 translate-x-1/3 animate-pulse" style="animation-duration: 4s" />
      <div class="absolute bottom-0 left-0 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl sm:blur-3xl translate-y-1/3 -translate-x-1/3 animate-pulse" style="animation-duration: 5s" />
      
      <div class="relative z-10">
        <!-- Desktop Layout -->
        <div class="hidden sm:flex items-center justify-between">
          <div>
            <div class="flex items-center gap-4 mb-3">
              <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
                <svg class="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div>
                <h1 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Notifications</h1>
                <p class="text-sm sm:text-base text-muted-foreground mt-1 font-medium">{{ notificationsStore.unreadCount }} unread notifications</p>
              </div>
            </div>
          </div>
          <div class="flex gap-3">
            <!-- Bulk Actions (shown when items selected) -->
            <div v-if="selectedNotifications.length > 0" class="flex items-center gap-3 animate-scale-in">
              <span class="text-sm font-semibold text-primary">{{ selectedNotifications.length }} selected</span>
              <button
                @click="bulkDeleteSelected"
                class="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-destructive to-destructive/80 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-destructive/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="hidden sm:inline">Delete Selected</span>
                <span class="sm:hidden">Delete</span>
              </button>
              <button
                @click="clearSelection"
                class="px-4 py-2.5 sm:py-3 bg-secondary/50 border-2 border-border/50 text-foreground font-semibold rounded-lg sm:rounded-xl hover:border-primary/50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
            
            <!-- Regular Actions -->
            <button
              v-if="notificationsStore.unreadCount > 0 && selectedNotifications.length === 0"
              @click="markAllAsRead"
              class="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="hidden sm:inline">Mark All Read</span>
              <span class="sm:hidden">Mark All</span>
            </button>
          </div>
        </div>
        
        <!-- Mobile Layout -->
        <div class="sm:hidden">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">Notifications</h1>
                <p class="text-xs text-muted-foreground mt-0.5 font-medium">{{ notificationsStore.unreadCount }} unread</p>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-2">
            <!-- Bulk Actions -->
            <template v-if="selectedNotifications.length > 0">
              <button
                @click="bulkDeleteSelected"
                class="flex-1 px-4 py-3 bg-gradient-to-r from-destructive to-destructive/80 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-destructive/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete ({{ selectedNotifications.length }})
              </button>
              <button
                @click="clearSelection"
                class="px-4 py-3 bg-secondary/50 border-2 border-border/50 text-foreground font-semibold rounded-lg hover:border-primary/50 transition-all active:scale-95"
              >
                Cancel
              </button>
            </template>
            
            <!-- Mark All Read -->
            <button
              v-else-if="notificationsStore.unreadCount > 0"
              @click="markAllAsRead"
              class="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Mark All Read
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl">
      <!-- Loading -->
      <div v-if="notificationsStore.isLoading" class="p-4 sm:p-6">
        <div class="space-y-3 sm:space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-start gap-3 sm:gap-4 animate-pulse">
            <div class="w-10 h-10 rounded-full bg-secondary flex-shrink-0" />
            <div class="flex-1">
              <div class="h-4 sm:h-5 bg-secondary rounded w-3/4 mb-2" />
              <div class="h-3 sm:h-4 bg-secondary rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <EmptyState
        v-else-if="notificationsStore.notifications.length === 0"
        title="No notifications"
        description="Your notifications will appear here when alerts are triggered"
      />

      <!-- Notifications -->
      <div v-else class="divide-y divide-border/50">
        <!-- Select All Checkbox -->
        <div class="p-3 sm:p-4 bg-gradient-to-r from-secondary/30 to-secondary/10 border-b border-border/50 flex items-center justify-between">
          <label class="flex items-center gap-3 sm:gap-4 cursor-pointer group">
            <div class="relative">
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate.prop="isIndeterminate"
                @change="toggleSelectAll"
                class="peer w-5 h-5 sm:w-6 sm:h-6 appearance-none rounded-full border-2 border-border/50 bg-secondary/30 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-md checked:border-primary checked:bg-gradient-to-br checked:from-primary checked:to-accent checked:shadow-lg checked:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card"
              />
              <svg
                class="absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none p-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              Select All
            </span>
          </label>
          <div class="flex items-center gap-2">
            <span 
              v-if="selectedNotifications.length > 0"
              class="px-2 py-1 text-[10px] sm:text-xs font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-md"
            >
              {{ selectedNotifications.length }} selected
            </span>
            <span class="text-[10px] sm:text-xs text-muted-foreground">
              {{ selectedNotifications.length }} / {{ notificationsStore.notifications.length }}
            </span>
          </div>
        </div>
        
        <div
          v-for="notification in notificationsStore.notifications"
          :key="notification.id"
          :class="[
            'transition-all duration-300',
            selectedNotifications.includes(notification.id) ? 'bg-gradient-to-r from-primary/15 to-accent/5 border-l-4 border-primary shadow-md' : '',
            !notification.is_read && notification.status === 'SENT' && !selectedNotifications.includes(notification.id) ? 'bg-primary/5 hover:bg-primary/10' : '',
            notification.status === 'FAILED' && !selectedNotifications.includes(notification.id) ? 'bg-destructive/5 hover:bg-destructive/10' : '',
            notification.status === 'SENT' && notification.is_read && !selectedNotifications.includes(notification.id) ? 'hover:bg-secondary/30' : ''
          ]"
        >
          <!-- Desktop Layout -->
          <div class="hidden sm:flex items-start gap-4 p-6">
            <!-- Circular Checkbox -->
            <div class="flex-shrink-0 pt-1">
              <div class="relative">
                <input
                  type="checkbox"
                  :checked="selectedNotifications.includes(notification.id)"
                  @change="toggleNotification(notification.id)"
                  class="peer w-6 h-6 appearance-none rounded-full border-2 border-border/50 bg-secondary/30 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-md checked:border-primary checked:bg-gradient-to-br checked:from-primary checked:to-accent checked:shadow-lg checked:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card"
                />
                <svg
                  class="absolute inset-0 w-6 h-6 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none p-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <!-- Clickable Content -->
            <div class="flex items-start gap-4 flex-1 cursor-pointer" @click="viewNotification(notification.id)">
              <!-- Icon based on status -->
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                notification.status === 'FAILED' ? 'bg-destructive/20 text-destructive' :
                !notification.is_read ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
              ]">
                <svg v-if="notification.status === 'FAILED'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <svg v-else-if="notification.status === 'SENT'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <p :class="[
                    'font-medium',
                    notification.status === 'FAILED' ? 'text-destructive' :
                    !notification.is_read ? 'text-foreground' : 'text-muted-foreground'
                  ]">
                    {{ notification.message }}
                  </p>
                </div>
                <div class="flex items-center gap-3 mt-2">
                  <p class="text-sm text-muted-foreground">
                    {{ formatDate(notification.created_at) }}
                  </p>
                  <!-- Status Badge -->
                  <span 
                    v-if="notification.status === 'FAILED'" 
                    class="px-2 py-0.5 text-xs font-semibold rounded-full bg-destructive/20 text-destructive border border-destructive/30"
                  >
                    Failed
                  </span>
                  <span 
                    v-else-if="notification.status === 'SENT'" 
                    class="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                  >
                    Sent
                  </span>
                  <span 
                    v-else
                    class="px-2 py-0.5 text-xs font-semibold rounded-full bg-secondary text-muted-foreground border border-border/30"
                  >
                    Pending
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Three Dot Menu -->
            <div class="relative flex-shrink-0" :ref="el => setMenuRef(notification.id, el as HTMLElement)">
              <button 
                @click.stop="toggleMenu(notification.id)"
                class="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <svg class="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div 
                v-if="activeMenu === notification.id"
                class="absolute right-0 mt-2 w-48 bg-card border-2 border-border shadow-2xl animate-scale-in rounded-xl overflow-hidden z-50"
              >
                <button
                  @click.stop="viewNotification(notification.id)"
                  class="w-full px-4 py-3 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3"
                >
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
                <button
                  v-if="!notification.is_read"
                  @click.stop="markAsRead(notification.id)"
                  class="w-full px-4 py-3 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3"
                >
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Read
                </button>
                <button
                  @click.stop="deleteNotification(notification.id)"
                  class="w-full px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-3"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
          
          <!-- Mobile Layout -->
          <div class="sm:hidden p-4">
            <div class="flex items-start gap-3">
              <!-- Circular Checkbox -->
              <div class="flex-shrink-0 pt-1">
                <div class="relative">
                  <input
                    type="checkbox"
                    :checked="selectedNotifications.includes(notification.id)"
                    @change="toggleNotification(notification.id)"
                    class="peer w-5 h-5 appearance-none rounded-full border-2 border-border/50 bg-secondary/30 cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-md checked:border-primary checked:bg-gradient-to-br checked:from-primary checked:to-accent checked:shadow-lg checked:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <svg
                    class="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none p-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <!-- Clickable Content -->
              <div class="flex-1 min-w-0 cursor-pointer" @click="viewNotification(notification.id)">
                <!-- Icon & Header Row -->
                <div class="flex items-start gap-3">
                  <!-- Icon -->
                  <div :class="[
                    'w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
                    notification.status === 'FAILED' ? 'bg-destructive/20 text-destructive' :
                    !notification.is_read ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                  ]">
                    <svg v-if="notification.status === 'FAILED'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <svg v-else-if="notification.status === 'SENT'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <!-- Message -->
                    <p :class="[
                      'text-sm font-medium break-words',
                      notification.status === 'FAILED' ? 'text-destructive' :
                      !notification.is_read ? 'text-foreground' : 'text-muted-foreground'
                    ]">
                      {{ notification.message }}
                    </p>
                    
                    <!-- Meta Info -->
                    <div class="flex items-center gap-2 mt-2 flex-wrap">
                      <!-- Time -->
                      <span class="text-xs text-muted-foreground">
                        {{ formatDate(notification.created_at) }}
                      </span>
                      
                      <!-- Status Badge -->
                      <span 
                        v-if="notification.status === 'FAILED'" 
                        class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-destructive/20 text-destructive border border-destructive/30"
                      >
                        Failed
                      </span>
                      <span 
                        v-else-if="notification.status === 'SENT'" 
                        class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                      >
                        Sent
                      </span>
                      <span 
                        v-else
                        class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-secondary text-muted-foreground border border-border/30"
                      >
                        Pending
                      </span>
                      
                      <!-- Unread Badge -->
                      <span v-if="!notification.is_read && notification.status === 'SENT'" class="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                        Unread
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Three Dot Menu -->
              <div class="relative flex-shrink-0" :ref="el => setMenuRef(notification.id, el as HTMLElement)">
                <button 
                  @click.stop="toggleMenu(notification.id)"
                  class="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <svg class="w-5 h-5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>

                <!-- Dropdown Menu -->
                <div 
                  v-if="activeMenu === notification.id"
                  class="absolute right-0 mt-2 w-48 bg-card border-2 border-border shadow-2xl animate-scale-in rounded-xl overflow-hidden z-50"
                >
                  <button
                    @click.stop="viewNotification(notification.id)"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3"
                  >
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>
                  <button
                    v-if="!notification.is_read"
                    @click.stop="markAsRead(notification.id)"
                    class="w-full px-4 py-3 text-left text-sm hover:bg-secondary/50 transition-colors flex items-center gap-3"
                  >
                    <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Mark as Read
                  </button>
                  <button
                    @click.stop="deleteNotification(notification.id)"
                    class="w-full px-4 py-3 text-left text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-3"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationsStore } from '@/stores/notifications'
import { useToast } from '@/composables/useToast'
import EmptyState from '@/components/ui/empty-state.vue'

const router = useRouter()
const notificationsStore = useNotificationsStore()
const { toast } = useToast()

const selectedNotifications = ref<string[]>([])
const activeMenu = ref<string | null>(null)
const menuRefs = ref<Map<string, HTMLElement>>(new Map())

// Computed properties for selection
const isAllSelected = computed(() => {
  return notificationsStore.notifications.length > 0 && 
         selectedNotifications.value.length === notificationsStore.notifications.length
})

const isIndeterminate = computed(() => {
  return selectedNotifications.value.length > 0 && 
         selectedNotifications.value.length < notificationsStore.notifications.length
})

// Selection functions
function toggleNotification(id: string) {
  const index = selectedNotifications.value.indexOf(id)
  if (index > -1) {
    selectedNotifications.value.splice(index, 1)
  } else {
    selectedNotifications.value.push(id)
  }
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedNotifications.value = []
  } else {
    selectedNotifications.value = notificationsStore.notifications.map(n => n.id)
  }
}

function clearSelection() {
  selectedNotifications.value = []
}

async function bulkDeleteSelected() {
  if (selectedNotifications.value.length === 0) return
  
  if (!confirm(`Are you sure you want to delete ${selectedNotifications.value.length} notification${selectedNotifications.value.length > 1 ? 's' : ''}?`)) {
    return
  }
  
  const success = await notificationsStore.bulkDeleteNotifications(selectedNotifications.value)
  if (success) {
    toast({
      title: 'Notifications Deleted!',
      description: `${selectedNotifications.value.length} notification${selectedNotifications.value.length > 1 ? 's have' : ' has'} been deleted`,
      variant: 'success'
    })
    selectedNotifications.value = []
    await notificationsStore.fetchNotifications()
    await notificationsStore.fetchUnreadCount()
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown date'
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  if (hours < 168) return `${Math.floor(hours / 24)}d ago`
  return date.toLocaleDateString()
}

async function markAsRead(notificationId: string) {
  const success = await notificationsStore.markAsRead(notificationId)
  if (success) {
    toast({ title: 'Success', description: 'Notification marked as read', variant: 'success' })
  }
}

async function markAllAsRead() {
  const success = await notificationsStore.markAllAsRead()
  if (success) {
    toast({ title: 'Success', description: 'All notifications marked as read', variant: 'success' })
  }
}

async function deleteNotification(notificationId: string) {
  if (!confirm('Delete this notification?')) return
  const success = await notificationsStore.deleteNotification(notificationId)
  if (success) {
    toast({ title: 'Deleted', description: 'Notification deleted', variant: 'success' })
    activeMenu.value = null
  }
}

function viewNotification(notificationId: string) {
  router.push(`/notifications/${notificationId}`)
  activeMenu.value = null
}

function toggleMenu(notificationId: string) {
  activeMenu.value = activeMenu.value === notificationId ? null : notificationId
}

function setMenuRef(notificationId: string, el: HTMLElement) {
  if (el) {
    menuRefs.value.set(notificationId, el)
  }
}

function handleClickOutside(event: MouseEvent) {
  let clickedInside = false
  menuRefs.value.forEach((el) => {
    if (el.contains(event.target as HTMLElement)) {
      clickedInside = true
    }
  })
  if (!clickedInside) {
    activeMenu.value = null
  }
}

onMounted(async () => {
  await notificationsStore.fetchNotifications()
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
