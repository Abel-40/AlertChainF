<template>
  <div class="min-h-screen bg-background overflow-hidden">
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-2xl border-b border-border/50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3 group cursor-pointer" @click="$router.push('/')">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span class="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">AlertChain</span>
        </div>
        <div class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#how-it-works" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
          <a href="#pricing" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div class="flex items-center gap-3">
          <RouterLink to="/login" class="hidden sm:block px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sign In
          </RouterLink>
          <RouterLink to="/register" class="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105">
            Get Started Free
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-6 overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-background via-[#111638] to-[#1a1f4a]" />
        <div class="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px] animate-pulse" style="animation-delay: 1.5s" />
        
        <!-- Grid Pattern -->
        <div class="absolute inset-0 bg-grid opacity-20" />
        
        <!-- Floating Crypto Icons -->
        <div class="absolute top-1/4 left-10 animate-float opacity-30">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">₿</div>
        </div>
        <div class="absolute top-1/3 right-20 animate-float opacity-30" style="animation-delay: 0.5s">
          <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">Ξ</div>
        </div>
        <div class="absolute bottom-1/4 left-1/4 animate-float opacity-30" style="animation-delay: 1s">
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">◎</div>
        </div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-fade-in">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8">
            <span class="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span class="text-sm font-medium text-primary">Real-Time Crypto Alerts</span>
          </div>

          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Track Crypto.<br />
            <span class="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent animate-gradient">
              Get Alerted.
            </span>
            <br />
            Trade Smarter.
          </h1>
          
          <p class="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Set intelligent price alerts for your favorite cryptocurrencies. 
            Get instant notifications when the market moves. 
            Never miss a trading opportunity again.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <RouterLink to="/register" class="group relative px-8 py-4 bg-primary text-white font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105">
              <span class="relative z-10 flex items-center gap-2">
                Start Tracking Free
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </RouterLink>
            <a href="#features" class="px-8 py-4 border border-border bg-card/50 backdrop-blur-xl text-foreground font-semibold rounded-2xl hover:bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105">
              See How It Works
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <p class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">50+</p>
              <p class="text-sm text-muted-foreground">Cryptocurrencies</p>
            </div>
            <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <p class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-accent to-success bg-clip-text text-transparent mb-2">24/7</p>
              <p class="text-sm text-muted-foreground">Monitoring</p>
            </div>
            <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <p class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-2">&lt;1s</p>
              <p class="text-sm text-muted-foreground">Alert Speed</p>
            </div>
            <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <p class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent mb-2">100%</p>
              <p class="text-sm text-muted-foreground">Free to Use</p>
            </div>
          </div>
        </div>

        <!-- Hero Image / Dashboard Preview -->
        <div class="relative max-w-5xl mx-auto animate-fade-in" style="animation-delay: 0.3s">
          <div class="bg-card/80 backdrop-blur-2xl border border-border/50 rounded-3xl p-2 shadow-2xl shadow-primary/20">
            <div class="bg-gradient-to-br from-secondary to-background rounded-2xl overflow-hidden">
              <div class="p-8 md:p-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">₿</div>
                      <div>
                        <p class="font-semibold">Bitcoin</p>
                        <p class="text-xs text-muted-foreground">BTC</p>
                      </div>
                    </div>
                    <p class="text-2xl font-bold font-mono">$67,234.50</p>
                    <p class="text-sm text-success mt-1">↑ +2.4%</p>
                  </div>
                  <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">Ξ</div>
                      <div>
                        <p class="font-semibold">Ethereum</p>
                        <p class="text-xs text-muted-foreground">ETH</p>
                      </div>
                    </div>
                    <p class="text-2xl font-bold font-mono">$3,456.78</p>
                    <p class="text-sm text-success mt-1">↑ +1.8%</p>
                  </div>
                  <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-green-400 flex items-center justify-center text-white font-bold shadow-lg">◎</div>
                      <div>
                        <p class="font-semibold">Solana</p>
                        <p class="text-xs text-muted-foreground">SOL</p>
                      </div>
                    </div>
                    <p class="text-2xl font-bold font-mono">$178.90</p>
                    <p class="text-sm text-destructive mt-1">↓ -0.5%</p>
                  </div>
                </div>
                <div class="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h3 class="font-semibold">Active Alerts</h3>
                    <span class="badge badge-success">3 Active</span>
                  </div>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                      <div class="flex items-center gap-3">
                        <span class="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span class="text-sm">BTC → Alert when price > $70,000</span>
                      </div>
                      <span class="badge badge-primary">Active</span>
                    </div>
                    <div class="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                      <div class="flex items-center gap-3">
                        <span class="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span class="text-sm">ETH → Alert when price < $3,000</span>
                      </div>
                      <span class="badge badge-primary">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            Everything You Need to<br />
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trade Smarter</span>
          </h2>
          <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to keep you ahead of the market
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1h6z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">Smart Price Alerts</h3>
            <p class="text-muted-foreground leading-relaxed">
              Set custom alerts above or below your target price. Get notified instantly via email when conditions are met.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-success/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">Real-Time Tracking</h3>
            <p class="text-muted-foreground leading-relaxed">
              Monitor up to 10 cryptocurrencies simultaneously with live price updates and market data.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-accent/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">Instant Notifications</h3>
            <p class="text-muted-foreground leading-relaxed">
              Receive email notifications in under a second when your alerts are triggered. Never miss a move.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">Price History</h3>
            <p class="text-muted-foreground leading-relaxed">
              Access historical price data with interactive charts to analyze trends and make informed decisions.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-orange-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">Secure & Private</h3>
            <p class="text-muted-foreground leading-relaxed">
              Your data is encrypted and secure. We use industry-standard security practices to protect your information.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="group relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/30">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-3">Easy to Use</h3>
            <p class="text-muted-foreground leading-relaxed">
              Clean, intuitive interface designed for both beginners and experienced traders. Get started in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="how-it-works" class="py-24 px-6 bg-card/30 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div class="relative z-10 max-w-7xl mx-auto">
        <div class="text-center mb-20">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            Get Started in<br />
            <span class="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
          <p class="text-lg text-muted-foreground max-w-3xl mx-auto">
            From signup to alerts in under 2 minutes
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Step 1 -->
          <div class="relative text-center group">
            <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-primary/40">
              1
            </div>
            <h3 class="text-3xl font-bold mb-4">Create Account</h3>
            <p class="text-lg text-muted-foreground leading-relaxed">
              Sign up for free in seconds. No credit card required, no hidden fees.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="relative text-center group">
            <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-success flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-accent/40">
              2
            </div>
            <h3 class="text-3xl font-bold mb-4">Select Assets</h3>
            <p class="text-lg text-muted-foreground leading-relaxed">
              Choose 1-10 cryptocurrencies from our extensive list of 50+ supported coins.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="relative text-center group">
            <div class="w-24 h-24 rounded-3xl bg-gradient-to-br from-success to-primary flex items-center justify-center text-white text-4xl font-bold mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-success/40">
              3
            </div>
            <h3 class="text-3xl font-bold mb-4">Set Alerts</h3>
            <p class="text-lg text-muted-foreground leading-relaxed">
              Create price alerts and get instant notifications when the market moves.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" />
      
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-6xl font-bold mb-6">
          Ready to Start<br />
          <span class="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">Trading Smarter?</span>
        </h2>
        <p class="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join AlertChain today and never miss a crypto price movement again
        </p>
        <RouterLink to="/register" class="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-white text-lg font-semibold rounded-3xl hover:bg-primary/90 transition-all duration-300 shadow-2xl shadow-primary/40 hover:shadow-primary/60 hover:scale-105">
          Create Your Free Account
          <svg class="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </RouterLink>
        <p class="text-sm text-muted-foreground mt-6">No credit card required • Free forever</p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-border/50 py-12 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span class="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AlertChain</span>
          </div>
          <p class="text-muted-foreground text-sm">
            © 2024 AlertChain. All rights reserved.
          </p>
          <div class="flex gap-6 text-sm text-muted-foreground">
            <a href="#" class="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" class="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
