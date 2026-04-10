<template>
  <div class="flex items-center gap-2">
    <svg
      class="w-8 h-8"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #8b5cf6; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #3b82f6; stop-opacity: 1" />
        </linearGradient>
      </defs>

      <!-- Chain link -->
      <path
        d="M8 16C8 12.686 10.686 10 14 10H18C21.314 10 24 12.686 24 16C24 19.314 21.314 22 18 22H14C10.686 22 8 19.314 8 16Z"
        fill="url(#logoGradient)"
        opacity="0.3"
      />

      <!-- Bell/Alert symbol -->
      <g transform="translate(16, 8)">
        <!-- Bell body -->
        <path
          d="M0 -2C-2.2 -2 -4 -0.2 -4 2V3C-4 4.1 -3.1 5 -2 5H2C3.1 5 4 4.1 4 3V2C4 -0.2 2.2 -2 0 -2Z"
          fill="url(#logoGradient)"
        />
        <!-- Bell clapper -->
        <circle cx="0" cy="6" r="1" fill="url(#logoGradient)" />
      </g>

      <!-- Accent circle -->
      <circle cx="26" cy="6" r="2" fill="url(#logoGradient)" />
    </svg>
    <span class="font-bold text-lg bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
      AlertChain
    </span>
  </div>
</template>

<script setup lang="ts">
// Logo component for AlertChain
</script>

<style scoped>
/* Logo styles */
</style>
