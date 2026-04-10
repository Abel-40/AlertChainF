import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AssetOutFromDb, AssetOutFromSearch, PriceSnapshotOut } from '@/types'
import api from '@/services/api'

export const useAssetsStore = defineStore('assets', () => {
  const trackedAssets = ref<AssetOutFromDb[]>([])
  const searchResults = ref<AssetOutFromSearch[]>([])
  const popularAssets = ref<AssetOutFromSearch[]>([])
  const currentAsset = ref<AssetOutFromDb | null>(null)
  const priceSnapshots = ref<PriceSnapshotOut[]>([])
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

  return {
    trackedAssets,
    searchResults,
    popularAssets,
    currentAsset,
    priceSnapshots,
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
  }
})
