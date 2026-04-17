<template>
  <div class="relative w-full h-full">
    <canvas ref="chartRef" class="w-full h-full"></canvas>
    
    <!-- Price Change Badge -->
    <div v-if="priceChange !== 0" class="absolute top-6 right-6 px-5 py-3 rounded-2xl backdrop-blur-xl border shadow-xl transition-all duration-500 hover:scale-105"
         :class="priceChange >= 0 ? 'bg-emerald-500/15 border-emerald-500/40' : 'bg-red-500/15 border-red-500/40'">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center"
             :class="priceChange >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'">
          <span class="text-2xl">{{ priceChange >= 0 ? '↗' : '↘' }}</span>
        </div>
        <div>
          <p class="text-xl font-bold" :class="priceChange >= 0 ? 'text-emerald-400' : 'text-red-400'">
            {{ Math.abs(priceChange).toFixed(2) }}%
          </p>
          <p class="text-xs text-muted-foreground/80 font-medium">{{ timeRangeLabel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import type { HistoricalPricePoint } from '@/types'

// Register Chart.js components
Chart.register(...registerables)

const props = defineProps<{
  snapshots: HistoricalPricePoint[]
  timeRange?: { label: string; value: number; isHours: boolean }
}>()

const chartRef = ref<HTMLCanvasElement | null>(null)
const priceChange = ref(0)
let chart: Chart | null = null

// Compute time range label for display
const timeRangeLabel = computed(() => {
  if (!props.timeRange) return 'Last 5 min'
  if (props.timeRange.value === 0) return 'Last 5 min'
  if (props.timeRange.value < 1) {
    const hours = Math.round(props.timeRange.value * 24)
    return `Last ${hours}h`
  }
  if (props.timeRange.value >= 365) {
    return `Last ${Math.round(props.timeRange.value / 365)}y`
  }
  return `Last ${props.timeRange.value}d`
})

// Format price for display
function formatPrice(price: number): string {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  } else if (price >= 0.01) {
    return price.toFixed(4)
  } else {
    return price.toFixed(6)
  }
}

// Smart time formatting based on time range
function formatTime(timestamp: string, index: number, total: number): string {
  const date = new Date(timestamp)
  const timeRangeValue = props.timeRange?.value || 0
  
  // For 5 minute data - show hours:minutes:seconds
  if (timeRangeValue === 0) {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }
  
  // For hourly data (less than 1 day) - show hours only
  if (timeRangeValue < 1) {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    })
  }
  
  // For multiple days - show date
  if (timeRangeValue <= 30) {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    })
  }
  
  // For longer periods - show month/year
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    year: '2-digit'
  })
}

// Smart point display - only show points for smaller datasets
function shouldShowPoints(total: number): boolean {
  // Only show points if we have less than 50 data points
  return total <= 50
}

// Smart point radius based on data count
function getPointRadius(total: number): number {
  if (total <= 20) return 4
  if (total <= 50) return 3
  return 0 // Hide points for large datasets
}

// Create or update chart
function updateChart() {
  if (!chartRef.value || props.snapshots.length === 0) return

  // Sort snapshots by timestamp (oldest first)
  const sortedSnapshots = [...props.snapshots].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  const totalPoints = sortedSnapshots.length

  // Calculate price change
  const oldestPrice = sortedSnapshots[0].price_usd
  const newestPrice = sortedSnapshots[sortedSnapshots.length - 1].price_usd
  priceChange.value = ((newestPrice - oldestPrice) / oldestPrice) * 100

  // Determine color based on price change
  const isPositive = priceChange.value >= 0
  const lineColor = isPositive ? '#10B981' : '#EF4444' // Green or Red
  const fillColor = isPositive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'

  // Destroy existing chart
  if (chart) {
    chart.destroy()
  }

  // Smart label sampling for large datasets
  const labels = sortedSnapshots.map((s, index) => {
    // For large datasets, only show every Nth label to prevent overlap
    const sampleRate = totalPoints > 100 ? Math.ceil(totalPoints / 10) : 1
    if (totalPoints > 100 && index % sampleRate !== 0 && index !== totalPoints - 1) {
      return '' // Hide label
    }
    return formatTime(s.timestamp, index, totalPoints)
  })

  // Create new chart with enhanced styling
  chart = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Price (USD)',
        data: sortedSnapshots.map(s => s.price_usd),
        borderColor: lineColor,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx
          const chartArea = context.chart.chartArea
          if (!chartArea) return fillColor
          
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          if (isPositive) {
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.3)')
            gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.1)')
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)')
          } else {
            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)')
            gradient.addColorStop(0.5, 'rgba(239, 68, 68, 0.1)')
            gradient.addColorStop(1, 'rgba(239, 68, 68, 0.0)')
          }
          return gradient
        },
        fill: true,
        tension: 0.4, // Smooth curves
        borderWidth: 4,
        pointRadius: getPointRadius(totalPoints),
        pointHoverRadius: 10,
        pointBackgroundColor: lineColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,
        pointHitRadius: 15, // Easier to hover
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: lineColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(15, 23, 42, 0.98)',
          titleColor: '#f1f5f9',
          bodyColor: '#f8fafc',
          borderColor: lineColor,
          borderWidth: 2,
          padding: 20,
          cornerRadius: 16,
          displayColors: false,
          caretPadding: 15,
          caretSize: 8,
          titleFont: {
            size: 15,
            weight: 'bold',
            family: 'system-ui, -apple-system, sans-serif'
          },
          bodyFont: {
            size: 18,
            weight: 'bold',
            family: 'system-ui, -apple-system, sans-serif'
          },
          callbacks: {
            title: (items) => {
              const index = items[0].dataIndex
              const date = new Date(sortedSnapshots[index].timestamp)
              
              // Format date based on time range
              const timeRangeValue = props.timeRange?.value || 0
              if (timeRangeValue < 1) {
                return date.toLocaleString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit', 
                  minute: '2-digit'
                })
              }
              return date.toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit', 
                minute: '2-digit'
              })
            },
            label: (context) => {
              const price = context.parsed.y
              return price !== null ? `  $${formatPrice(price)}` : '  Price: N/A'
            },
            afterLabel: (context) => {
              // Show price change from start
              if (context.dataIndex > 0) {
                const startPrice = sortedSnapshots[0].price_usd
                const currentPrice = sortedSnapshots[context.dataIndex].price_usd
                const change = ((currentPrice - startPrice) / startPrice) * 100
                const sign = change >= 0 ? '+' : ''
                return `  ${sign}${change.toFixed(2)}% from start`
              }
              return ''
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.06)',
            drawTicks: false,
            lineWidth: 1
          },
          border: {
            display: false
          },
          ticks: {
            color: 'rgba(148, 163, 184, 0.8)',
            font: {
              size: 12
            },
            maxRotation: 0,
            minRotation: 0,
            padding: 12,
            // Auto-skip labels to prevent overlap
            autoSkip: true,
            autoSkipPadding: 20,
            maxTicksLimit: 10
          }
        },
        y: {
          position: 'right',
          beginAtZero: false,
          grid: {
            color: 'rgba(148, 163, 184, 0.08)',
            drawTicks: false,
            lineWidth: 1
          },
          border: {
            display: false
          },
          ticks: {
            color: 'rgba(148, 163, 184, 0.9)',
            font: {
              size: 13
            },
            padding: 16,
            callback: (value) => '$' + formatPrice(value as number),
            maxTicksLimit: 8,
            count: 8
          }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeInOutQuart'
      },
      layout: {
        padding: {
          top: 20,
          bottom: 10,
          left: 10,
          right: 20
        }
      }
    }
  })
}

// Watch for snapshot changes
watch(
  () => props.snapshots,
  () => {
    updateChart()
  },
  { deep: true }
)

// Cleanup on unmount
onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
  }
})

// Initialize on mount
onMounted(() => {
  updateChart()
})
</script>
