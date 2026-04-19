// User Types
export interface UserCreate {
  email: string
  full_name: string
  password: string
}

export interface UserOut {
  id: string
  email: string
  full_name: string
  assets_selected?: boolean
  created_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  bio: string | null
  avatar_url: string | null
  location: string | null
  website: string | null
  preferred_currency: string
  risk_tolerance: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  trading_experience: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  email_notifications: boolean
  price_alert_notifications: boolean
  market_update_notifications: boolean
  newsletter_subscription: boolean
  theme: 'LIGHT' | 'DARK' | 'SYSTEM'
  default_chart_timeframe: string
  show_portfolio_on_dashboard: boolean
  default_alert_condition: 'ABOVE' | 'BELOW'
  alert_cooldown_minutes: number
  max_active_alerts: number
  created_at: string
  updated_at: string
}

export interface UserProfileUpdate {
  bio?: string | null
  avatar_url?: string | null
  location?: string | null
  website?: string | null
  preferred_currency?: string
  risk_tolerance?: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  trading_experience?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  email_notifications?: boolean
  price_alert_notifications?: boolean
  market_update_notifications?: boolean
  newsletter_subscription?: boolean
  theme?: 'LIGHT' | 'DARK' | 'SYSTEM'
  default_chart_timeframe?: string
  show_portfolio_on_dashboard?: boolean
  default_alert_condition?: 'ABOVE' | 'BELOW'
  alert_cooldown_minutes?: number
  max_active_alerts?: number
}

export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user?: UserOut
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  new_password: string
}

export interface ThirdPartyLogin {
  provider: string
  email: string
  provider_account_id: string
}

// Asset Types
export interface AssetOutFromDb {
  id: string
  coingecko_id: string
  symbol: string
  name: string
  image: string
  current_price: number
}

export interface AssetOutFromSearch {
  coingecko_id: string
  symbol: string
  name: string
  image: string
  current_price?: number
}

export interface AssetWithPrice {
  coingecko_id: string
  symbol: string
  name: string
  image: string
  current_price: number
}

export interface AssetIds {
  ids: string[]
}

export interface PriceSnapshotOut {
  id: string
  asset_id: string
  price_usd: number
  timestamp: string
}

export interface HistoricalPricePoint {
  timestamp: string
  price_usd: number
}

export interface HistoricalPriceResponse {
  coingecko_id: string
  duration_days: number
  snapshots_count: number
  price_data: HistoricalPricePoint[]
  source: 'cache' | 'fresh'
  task_result?: number
}

export interface CoinDetailHeader {
  name: string
  symbol: string
  image: string
  rank: number | null
}

export interface CoinDetailPricePanel {
  current_price: number | null
  changes: {
    '1h': number | null
    '24h': number | null
    '7d': number | null
    '14d': number | null
    '30d': number | null
    '1y': number | null
  }
  high_24h: number | null
  low_24h: number | null
}

export interface CoinDetailMarketStats {
  market_cap: number | null
  fdv: number | null
  volume_24h: number | null
  circulating_supply: number | null
  total_supply: number | null
  max_supply: number | null
}

export interface CoinDetailATH {
  price: number | null
  date: string | null
  change_percentage: number | null
}

export interface CoinDetailATL {
  price: number | null
  date: string | null
  change_percentage: number | null
}

export interface CoinDetailHistoricalHighlights {
  ath: CoinDetailATH
  atl: CoinDetailATL
}

export interface CoinDetailAbout {
  description: string
  genesis: string | null
  algorithm: string | null
  categories: string[]
}

export interface CoinDetailLinks {
  homepage: string | null
  whitepaper: string | null
  blockchain_site: string | null
  subreddit: string | null
  twitter: string | null
  github: string | null
  official_forum: string | null
}

export interface CoinDetailCommunity {
  reddit_subscribers: number | null
  sentiment_up_percentage: number | null
  sentiment_down_percentage: number | null
  watchlist_users: number | null
}

export interface CoinDetailResponse {
  header: CoinDetailHeader
  price_panel: CoinDetailPricePanel
  market_stats: CoinDetailMarketStats
  historical_highlights: CoinDetailHistoricalHighlights
  about: CoinDetailAbout
  links: CoinDetailLinks
  community: CoinDetailCommunity
}

export interface PaginatedPriceSnapshot {
  items: PriceSnapshotOut[]
  pagination: {
    page: number
    page_size: number
    total: number
    total_pages: number
  }
}

// Alert Types
export interface CreateAlert {
  asset_id: string
  target_price: number
  condition_type: 'ABOVE' | 'BELOW'
}

export interface AlertOut {
  id: string
  user_id: string
  asset_id: string
  asset_name: string | null
  symbol: string | null
  target_price: number
  condition_type: string
  is_active: boolean
  last_triggered_at: string | null
  updated_at: string
  created_at: string | null
}

export interface BulkDeleteAlerts {
  alert_ids: string[]
}

// Notification Types
export interface NotificationOut {
  id: string
  user_id: string
  alert_rule_id: string
  message: string
  status: 'PENDING' | 'SENT' | 'FAILED'
  is_read: boolean
  created_at: string
}

export interface NotificationBulkAction {
  notification_ids: string[]
}

export interface UnreadCountResponse {
  unread_count: number
}

export interface MarkAllReadResponse {
  updated_count: number
}

export interface BulkDeleteResponse {
  deleted_count: number
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[]
  meta: {
    page: number
    page_size: number
    total: number
    total_pages: number
  }
}

// API Response Wrapper - Matches backend APIResponse[T]
export interface APIResponse<T> {
  status_code: number
  message: string
  data: T
}

// Token Response
export interface TokenResponse {
  access_token: string
  token_type: string
}

// Error Response
export interface ErrorResponse {
  detail: string | Array<{
    loc: (string | number)[]
    msg: string
    type: string
  }>
}
