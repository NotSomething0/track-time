<script lang="ts">
  import { onMount } from 'svelte';

  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => { scrolled = window.scrollY > 50; };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header class="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-red-700 via-black to-blue-900">
  <!-- Background grid pattern -->
  <div class="absolute inset-0 bg-black opacity-50">
    <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
  </div>

  <!-- Navigation -->
  <nav class="absolute top-0 left-0 right-0 z-50 px-6 py-5 transition-all {scrolled ? 'bg-black/80 backdrop-blur-lg' : ''}">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <div class="text-2xl font-black tracking-tighter">
        <span class="text-[#FF2800]">TRACK</span><span class="text-[#FF8000]">TIME</span>
      </div>
      <a href="#waitlist" class="bg-[#FF2800] hover:bg-[#ff451a] text-white font-bold px-8 py-3 rounded-full transition shadow-lg">
        Join Waitlist
      </a>
    </div>
  </nav>

  <!-- Hero Content -->
  <div class="relative z-10 text-center px-6 max-w-5xl mx-auto">
    <h1 class="text-6xl md:text-8xl font-black text-[#FF8000] tracking-tighter mb-6">
      Never Miss<br />
      <span class="bg-linear-to-r from-[#FF2800] via-[#FF8000] to-[#00A0DE] bg-clip-text text-transparent">
        Another Race
      </span>
    </h1>
    <p class="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
      One app for every motorsport series on 🌎
      <br />
      F1 • MotoGP • IndyCar • WEC • NASCAR • Formula E and more.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="#waitlist" class="bg-[#FF2800] hover:bg-[#ff451a] text-white font-bold text-lg px-10 py-5 rounded-full transition transform hover:scale-105 shadow-2xl">
        Get Early Access
      </a>
      <a href="#features" class="border-2 border-[#00A0DE] text-[#00A0DE] hover:bg-[#00A0DE]/10 font-bold text-lg px-10 py-5 rounded-full transition">
        See Features ↓
      </a>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
    <svg class="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</header>