import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AssetOutFromDb, AssetOutFromSearch, PriceSnapshotOut, CoinDetailResponse, HistoricalPricePoint } from '@/types'
import api from '@/services/api'

export const useAssetsStore = defineStore('assets', () => {
  const trackedAssets = ref<AssetOutFromDb[]>([])
  const searchResults = ref<AssetOutFromSearch[]>([])
  const popularAssets = ref<AssetOutFromSearch[]>([])
  const currentAsset = ref<AssetOutFromDb | null>(null)
  const priceSnapshots = ref<PriceSnapshotOut[]>([])
  const coinDetails = ref<CoinDetailResponse | null>(null)
  const historicalPrices = ref<HistoricalPricePoint[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const getAssetById = computed(() => (id: string) => {
    return trackedAssets.value.find((a) => a.coingecko_id === id)
  })

  async function fetchTrackedAssets() {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get('/alertchain/assets/tracked')
      // Backend returns APIResponse<T> { status_code, message, data: T }
      trackedAssets.value = response.data.data || []
      console.log('📊 Tracked assets:', trackedAssets.value)
    } catch (err: any) {
      console.error('❌ Error fetching tracked assets:', err)
      error.value = err.response?.data?.detail || 'Failed to fetch tracked assets'
      trackedAssets.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function searchAssets(query: string) {
    if (!query.trim()) {
      searchResults.value = []
      return
    }

    isLoading.value = true
    error.value = null
    try {
      console.log('🔍 Searching for:', query)
      const response = await api.get('/alertchain/assets/search', {
        params: { crypto_name: query },
      })
      // Backend returns APIResponse<T> { status_code, message, data: T }
      searchResults.value = response.data.data || []
      console.log('🔍 Search results:', searchResults.value)
    } catch (err: any) {
      console.error('❌ Error searching assets:', err)
      error.value = err.response?.data?.detail || 'Failed to search assets'
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPopularAssets() {
    isLoading.value = true
    error.value = null
    try {
      const response = await api.get('/alertchain/assets/popular')
      // Backend returns APIResponse<T> { status_code, message, data: T }
      popularAssets.value = response.data.data || []
      console.log('🔥 Popular assets:', popularAssets.value)
    } catch (err: any) {
      console.error('❌ Error fetching popular assets:', err)
      error.value = err.response?.data?.detail || 'Failed to fetch popular assets'
      popularAssets.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function addAsset(assetId: string) {
    try {
      // Backend expects { ids: string[] } format
      await api.post('/alertchain/assets/add/', { ids: [assetId] })
      await fetchTrackedAssets()
      return true
    } catch (err: any) {
      error.value = 'Failed to add asset'
      return false
    }
  }

  async function addAssets(assetIds: string[]) {
    try {
      console.log('📦 Adding assets:', assetIds)
      // Backend expects { ids: string[] } format
      await api.post('/alertchain/assets/add/', { ids: assetIds })
      await fetchTrackedAssets()
      return true
    } catch (err: any) {
      console.error('❌ Error adding assets:', err)
      error.value = 'Failed to add assets'
      return false
    }
  }

  async function removeAsset(assetId: string) {
    try {
      // Backend endpoint is /alertchain/assets/tracked/{coingecko_id}
      await api.delete(`/alertchain/assets/tracked/${assetId}`)
      trackedAssets.value = trackedAssets.value.filter(
        (a) => a.coingecko_id !== assetId
      )
      return true
    } catch (err: any) {
      error.value = 'Failed to remove asset'
      return false
    }
  }

  async function fetchAssetWithPrice(assetId: string) {
    isLoading.value = true
    error.value = null
    try {
      console.log('🔍 Fetching asset:', assetId)
      const response = await api.get(`/alertchain/assets/detail/${assetId}`)
      // Backend returns APIResponse<T> { status_code, message, data: T }
      currentAsset.value = response.data.data || null
      console.log('✅ Asset fetched:', currentAsset.value)
    } catch (err: any) {
      console.error('❌ Error fetching asset:', err)
      error.value = err.response?.data?.detail || 'Failed to fetch asset'
      currentAsset.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function fetchPriceSnapshots(assetId: string, page = 1, pageSize = 50) {
    isLoading.value = true
    error.value = null
    try {
      console.log('📊 Fetching price snapshots for:', assetId)
      const response = await api.get(
        `/alertchain/assets/price/snapshot/${assetId}`,
        {
          params: { page, page_size: pageSize },
        }
      )
      // Backend returns { items: [...], pagination: {...} }
      priceSnapshots.value = response.data.data?.items || []
      console.log('📈 Price snapshots loaded:', priceSnapshots.value.length)
    } catch (err: any) {
      console.error('❌ Error fetching price snapshots:', err)
      error.value = 'Failed to fetch price snapshots'
      priceSnapshots.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCoinDetails(assetId: string, retryCount = 0) {
    const maxRetries = 6 // Maximum 6 retries (30 seconds total)
    
    try {
      console.log(`🔍 Fetching coin details for: ${assetId} (attempt ${retryCount + 1})`)
      
      // Only set loading on first attempt
      if (retryCount === 0) {
        isLoading.value = true
        error.value = null
      }
      
      const response = await api.get(`/alertchain/assets/details/${assetId}`)
      
      console.log('📦 Full response:', response.data)
      console.log('📦 HTTP status:', response.status, 'Success:', response.data.success)
      
      // Backend returns: { success: true, message: "...", data: {...} }
      // HTTP 200 = success or cache miss with 202
      // HTTP 202 = data is being fetched
      
      if (response.status === 200 && response.data.success && response.data.data) {
        // Check if data is valid coin details (has header) or "fetching" status
        const data = response.data.data
        
        if (data.header) {
          // Valid coin details response
          coinDetails.value = data
          console.log('✅ Coin details fetched successfully:', data.header.name)
          return // Success - exit early
        } else if (data.status === 'fetching') {
          // Backend returned 200 but data shows it's still fetching
          console.log('⏳ Data still being fetched, will retry')
          // Fall through to retry logic
        } else {
          // Unexpected data format
          console.warn('⚠️ Unexpected data format:', data)
          error.value = 'Invalid response format'
          coinDetails.value = null
          return
        }
      }
      
      // HTTP 202 or still fetching - need to retry
      if (response.status === 202 || (response.data.data && response.data.data.status === 'fetching')) {
        if (retryCount < maxRetries) {
          console.log(`⏳ Coin details being fetched, retrying in 5 seconds... (attempt ${retryCount + 1}/${maxRetries})`)
          await new Promise(resolve => setTimeout(resolve, 5000))
          await fetchCoinDetails(assetId, retryCount + 1) // Retry with incremented count
        } else {
          // Max retries reached
          error.value = 'Failed to fetch coin details after multiple attempts. Please try again later.'
          console.error('❌ Max retries reached for coin details')
          coinDetails.value = null
        }
      } else if (response.status === 200 && !response.data.success) {
        // Request failed
        error.value = response.data.message || 'Request failed'
        coinDetails.value = null
      }
    } catch (err: any) {
      console.error('❌ Error fetching coin details:', err)
      error.value = err.response?.data?.detail || err.response?.data?.message || 'Failed to fetch coin details'
      coinDetails.value = null
    } finally {
      // Only set loading to false if this is the top-level call (not a retry)
      if (retryCount === 0) {
        isLoading.value = false
      }
    }
  }

  async function fetchHistoricalPrices(assetId: string, duration: number) {
    isLoading.value = true
    error.value = null
    try {
      console.log(`📊 Fetching historical prices for ${assetId} (${duration} days)`)
      const response = await api.post(`/alertchain/assets/price/historical/${assetId}`, null, {
        params: { duration },
      })
      
      console.log('📦 Historical prices response:', response.data)
      
      // Check if response has the expected structure
      if (response.data.data && response.data.data.price_data) {
        historicalPrices.value = response.data.data.price_data
        console.log(`📈 Historical prices loaded: ${historicalPrices.value.length} points`)
      } else {
        console.warn('⚠️ Unexpected response format:', response.data)
        historicalPrices.value = []
      }
      
      return historicalPrices.value
    } catch (err: any) {
      console.error('❌ Error fetching historical prices:', err)
      console.error('❌ Error response:', err.response?.data)
      error.value = err.response?.data?.detail || err.response?.data?.message || 'Failed to fetch historical prices'
      historicalPrices.value = []
      return []
    } finally {
      isLoading.value = false
    }
  }

  return {
    trackedAssets,
    searchResults,
    popularAssets,
    currentAsset,
    priceSnapshots,
    coinDetails,
    historicalPrices,
    isLoading,
    error,
    getAssetById,
    fetchTrackedAssets,
    searchAssets,
    fetchPopularAssets,
    addAsset,
    addAssets,
    removeAsset,
    fetchAssetWithPrice,
    fetchPriceSnapshots,
    fetchCoinDetails,
    fetchHistoricalPrices,
  }
})
