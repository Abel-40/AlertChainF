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
