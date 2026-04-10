<template>
  <div class="min-h-screen relative overflow-hidden bg-background">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-background via-[#111638] to-[#1a1f4a]" />
    
    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        v-for="i in 20" 
        :key="i"
        class="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }"
      />
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 bg-grid opacity-30" />

    <!-- Glow Orbs -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s" />

    <!-- Content -->
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout wrapper with animated background
</script>
