import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Layouts
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

// Public pages
import LandingView from '@/views/LandingView.vue'

// Auth pages
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'

// Main pages
import DashboardView from '@/views/DashboardView.vue'
import AssetSelectionView from '@/views/AssetSelectionView.vue'
import AssetSearchView from '@/views/AssetSearchView.vue'
import AssetDetailView from '@/views/AssetDetailView.vue'
import AssetMoreDetailsView from '@/views/AssetMoreDetailsView.vue'
import AlertsView from '@/views/AlertsView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes: RouteRecordRaw[] = [
  // Landing page (public, no sidebar)
  {
    path: '/',
    name: 'Landing',
    component: LandingView,
    meta: { requiresAuth: false, title: 'AlertChain - Crypto Price Alerts' },
  },
  
  // Auth routes (with animated background layout)
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: LoginView,
        meta: { requiresAuth: false, title: 'Login' },
      },
      {
        path: 'register',
        name: 'Register',
        component: RegisterView,
        meta: { requiresAuth: false, title: 'Register' },
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: ForgotPasswordView,
        meta: { requiresAuth: false, title: 'Forgot Password' },
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: ResetPasswordView,
        meta: { requiresAuth: false, title: 'Reset Password' },
      },
      {
        path: 'asset-selection',
        name: 'AssetSelection',
        component: AssetSelectionView,
        meta: { requiresAuth: true, title: 'Select Your Assets' },
      },
    ],
  },

  // Dashboard routes (with sidebar layout)
  {
    path: '/',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true, title: 'Dashboard' },
      },
      {
        path: 'assets/search',
        name: 'AssetSearch',
        component: AssetSearchView,
        meta: { requiresAuth: true, title: 'Search Assets' },
      },
      {
        path: 'assets/:coingecko_id',
        name: 'AssetDetail',
        component: AssetDetailView,
        meta: { requiresAuth: true, title: 'Asset Details' },
      },
      {
        path: 'assets/:coingecko_id/more',
        name: 'AssetMoreDetails',
        component: AssetMoreDetailsView,
        meta: { requiresAuth: true, title: 'Asset Full Details' },
      },
      {
        path: 'alerts',
        name: 'Alerts',
        component: AlertsView,
        meta: { requiresAuth: true, title: 'Price Alerts' },
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: NotificationsView,
        meta: { requiresAuth: true, title: 'Notifications' },
      },
      {
        path: 'profile',
        name: 'Profile',
        component: ProfileView,
        meta: { requiresAuth: true, title: 'Profile Settings' },
      },
    ],
  },

  // Catch-all 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard for auth
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  // Check if user is authenticated
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  // Redirect authenticated users away from auth pages (but allow landing page)
  if (
    authStore.isAuthenticated &&
    ['/login', '/register', '/forgot-password', '/reset-password'].includes(to.path)
  ) {
    next('/dashboard')
    return
  }

  next()
})

export default router
