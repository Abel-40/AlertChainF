import type { Component } from 'vue'
import {
  Bell,
  BellRing,
  CandlestickChart,
  Gauge,
  Layers3,
  LayoutDashboard,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  WalletCards,
} from 'lucide-vue-next'

export type ModuleId = 'alerts' | 'trading' | 'portfolio' | 'insights'

export interface ModuleNavItem {
  label: string
  path: string
  icon: Component
  exact?: boolean
  badgeKey?: 'notifications'
}

export interface AppModule {
  id: ModuleId
  label: string
  description: string
  icon: Component
  path: string
  enabled: boolean
  matchers: string[]
  sidebar: ModuleNavItem[]
}

export const appModules: AppModule[] = [
  {
    id: 'alerts',
    label: 'Alerts',
    description: 'Real-time monitoring and notification workflows',
    icon: BellRing,
    path: '/dashboard',
    enabled: true,
    matchers: ['/dashboard', '/alerts', '/assets', '/notifications', '/profile'],
    sidebar: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, exact: true },
      { label: 'Assets', path: '/assets/search', icon: Search },
      { label: 'Alerts', path: '/alerts', icon: Bell, exact: true },
      { label: 'Notifications', path: '/notifications', icon: ShieldCheck, badgeKey: 'notifications' },
      { label: 'Profile', path: '/profile', icon: UserRound, exact: true },
    ],
  },
  {
    id: 'trading',
    label: 'Trading',
    description: 'Execution, setups, and market action tools',
    icon: CandlestickChart,
    path: '/trading',
    enabled: false,
    matchers: ['/trading'],
    sidebar: [
      { label: 'Overview', path: '/trading', icon: Gauge, exact: true },
      { label: 'Markets', path: '/trading/markets', icon: Layers3 },
      { label: 'Signals', path: '/trading/signals', icon: Sparkles },
      { label: 'Orders', path: '/trading/orders', icon: Bell },
      { label: 'Profile', path: '/profile', icon: UserRound, exact: true },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    description: 'Holdings, allocation, and performance tracking',
    icon: WalletCards,
    path: '/portfolio',
    enabled: false,
    matchers: ['/portfolio'],
    sidebar: [
      { label: 'Overview', path: '/portfolio', icon: LayoutDashboard, exact: true },
      { label: 'Holdings', path: '/portfolio/holdings', icon: WalletCards },
      { label: 'Allocation', path: '/portfolio/allocation', icon: Layers3 },
      { label: 'Alerts', path: '/alerts', icon: Bell, exact: true },
      { label: 'Profile', path: '/profile', icon: UserRound, exact: true },
    ],
  },
  {
    id: 'insights',
    label: 'AI Insights',
    description: 'Research summaries and market intelligence',
    icon: Sparkles,
    path: '/ai-insights',
    enabled: false,
    matchers: ['/ai-insights'],
    sidebar: [
      { label: 'Overview', path: '/ai-insights', icon: Sparkles, exact: true },
      { label: 'Signals', path: '/ai-insights/signals', icon: Gauge },
      { label: 'Alerts', path: '/alerts', icon: Bell, exact: true },
      { label: 'Notifications', path: '/notifications', icon: ShieldCheck, badgeKey: 'notifications' },
      { label: 'Profile', path: '/profile', icon: UserRound, exact: true },
    ],
  },
]

export function getModuleByPath(path: string) {
  return (
    appModules.find((module) =>
      module.matchers.some((matcher) => path === matcher || path.startsWith(`${matcher}/`))
    ) || appModules[0]
  )
}
