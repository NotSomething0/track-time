<script lang="ts">
  import "../styles/global.css";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let { username } = $props();
  let time = $state<string|null>(null);


  // Mock data – replace with your real API later
  let allSeries = [
    {
      id: 1,
      name: "Formula 1",
      short: "F1",
      color: "from-red-600 to-orange-600",
      emoji: "🏎️",
      racesThisYear: 24,
      followed: true,
    },
    {
      id: 2,
      name: "MotoGP",
      short: "MotoGP",
      color: "from-purple-600 to-pink-600",
      emoji: "🏍️",
      racesThisYear: 20,
      followed: true,
    },
    {
      id: 3,
      name: "IndyCar",
      short: "IndyCar",
      color: "from-blue-600 to-cyan-500",
      emoji: "🇺🇸",
      racesThisYear: 17,
      followed: true,
    },
    {
      id: 4,
      name: "World Endurance Championship",
      short: "WEC",
      color: "from-amber-500 to-yellow-600",
      emoji: "⏱️",
      racesThisYear: 7,
      followed: false,
    },
    {
      id: 5,
      name: "Formula E",
      short: "Formula E",
      color: "from-teal-500 to-green-500",
      emoji: "⚡️",
      racesThisYear: 16,
      followed: false,
    },
    {
      id: 6,
      name: "NASCAR Cup Series",
      short: "NASCAR",
      color: "from-yellow-400 to-orange-700",
      emoji: "🏁",
      racesThisYear: 36,
      followed: false,
    },
    {
      id: 7,
      name: "IMSA WeatherTech",
      short: "IMSA",
      color: "from-indigo-600 to-purple-700",
      emoji: "🌧️",
      racesThisYear: 11,
      followed: false,
    },
    {
      id: 8,
      name: "Super Formula",
      short: "Super Formula",
      color: "from-rose-600 to-pink-500",
      emoji: "🇯🇵",
      racesThisYear: 9,
      followed: false,
    },
  ];

  let followedCount = allSeries.filter((s) => s.followed).length;

  function toggleFollow(seriesId: number) {
    const series = allSeries.find((s) => s.id === seriesId);
    if (series) {
      series.followed = !series.followed;
      followedCount = allSeries.filter((s) => s.followed).length;
      // TODO: persist to backend / localStorage
    }
  }

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<div
  class="min-h-screen bg-linear-to-b from-black via-neutral-900 to-black text-white"
>
  <!-- Fixed Header (same as your dashboard) -->
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-neutral-800"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-8">
        <h1 class="text-2xl font-black tracking-tighter">
          <a href="/"
            ><span class="text-[#FF2800]">TRACK</span><span
              class="text-[#FF8000]">TIME</span
            ></a
          >
        </h1>
        <div class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/dashboard" class="hover:text-[#FF8000] transition"
            >Dashboard</a
          >
          <a href="/schedule" class="hover:text-[#FF8000] transition"
            >Schedule</a
          >
          <a href="/series" class="text-[#00A0DE]">Series</a>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right text-sm">
          <div class="font-mono text-[#FF8000] text-lg">{time}</div>
          <div class="text-xs text-gray-500">Your local time</div>
        </div>
        <div
          class="w-10 h-10 rounded-full bg-linear-to-br from-[#FF2800] to-[#FF8000] flex items-center justify-center font-bold"
        >
          {username}
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="pt-24 pb-20 px-6 max-w-7xl mx-auto">
    <!-- Hero -->
    <section transition:fade class="mb-12">
      <h2 class="text-5xl md:text-6xl font-black mb-4">Choose Your Series</h2>
      <p class="text-xl text-gray-400 max-w-2xl">
        Follow the championships that get your heart racing. Never miss a
        session from the series you love.
      </p>
      <div class="mt-6 text-2xl font-bold text-[#00A0DE]">
        You follow <span class="text-[#FF8000]">{followedCount}</span> series
      </div>
    </section>

    <!-- Series Grid -->
    <section class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {#each allSeries as series (series.id)}
        <div
          in:fly={{
            y: 50,
            duration: 600,
            delay: series.id * 100,
            easing: quintOut,
          }}
          class="group relative bg-neutral-900/50 backdrop-blur border {series.followed
            ? 'border-[#00A0DE]'
            : 'border-neutral-800'} rounded-2xl overflow-hidden transition-all hover:border-[#FF8000] hover:shadow-2xl hover:shadow-[#FF8000]/20"
        >
          <!-- Gradient Top Bar -->
          <div class="h-2 bg-linear-to-r {series.color}"></div>

          <div class="p-8">
            <div class="flex items-start justify-between mb-6">
              <div class="text-6xl">{series.emoji}</div>
              <button
                onclick={() => toggleFollow(series.id)}
                class="w-12 h-12 rounded-full border-2 {series.followed
                  ? 'bg-[#00A0DE] border-[#00A0DE]'
                  : 'border-neutral-600'} flex items-center justify-center transition-all hover:scale-110"
                aria-label={series.followed ? "Unfollow" : "Follow"}
              >
                {#if series.followed}
                  <svg
                    class="w-6 h-6 text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                {:else}
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                {/if}
              </button>
            </div>

            <h3 class="text-2xl font-black mb-2">{series.name}</h3>
            <p class="text-sm text-gray-500 mb-6">
              {series.racesThisYear} races in 2025
            </p>

            <!-- Followed badge when active -->
            {#if series.followed}
              <div
                class="inline-flex items-center gap-2 bg-[#00A0DE]/20 text-[#00A0DE] px-4 py-2 rounded-full text-sm font-bold"
              >
                <span class="w-2 h-2 bg-[#00A0DE] rounded-full animate-pulse"
                ></span>
                FOLLOWING
              </div>
            {/if}
          </div>

          <!-- Hover glow effect -->
          <div
            class="absolute inset-0 border-2 border-transparent rounded-2xl bg-linear-to-r {series.color} opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
          ></div>
        </div>
      {/each}
    </section>

    <!-- Bonus: Keep the "Next On Track" mini section at the bottom (optional) -->
    <section class="mt-20">
      <h3 class="text-3xl font-black mb-8 flex items-center gap-3">
        <span class="text-[#FF2800]">Next On Track</span>
        <span class="text-5xl animate-pulse">Engine</span>
      </h3>
      <!-- You can import your existing UpcomingCards component here or copy 2–3 cards -->
      <div class="grid gap-6 md:grid-cols-3">
        <!-- Example card (copy from your dashboard) -->
        <div
          class="group relative bg-neutral-900/50 backdrop-blur border border-red-600 shadow-2xl shadow-red-600/20 rounded-2xl p-6 overflow-hidden"
        >
          <div
            class="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse"
          >
            LIVE
          </div>
          <div class="flex items-center gap-3 mb-4">
            <span class="text-4xl">🇪🇸</span>
            <div>
              <div class="text-sm text-gray-500">MotoGP</div>
              <div class="font-bold text-lg">Valencia Grand Prix</div>
            </div>
          </div>
          <div class="text-3xl font-black text-[#FF8000]">Race</div>
          <div class="text-2xl font-bold text-red-500 mt-3">Live now</div>
        </div>
        <!-- Add 1–2 more if you want -->
      </div>
    </section>
  </main>
</div>
