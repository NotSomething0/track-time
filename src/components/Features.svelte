<!-- src/components/Features.svelte -->
<script>
  const features = $state([
    {
      title: "All Series. One Place.",
      desc: "F1, MotoGP, IndyCar, WEC, IMSA, NASCAR, Formula E, Super GT — no more jumping between 10 different apps.",
      icon: "🏁"
    },
    {
      title: "Your Time Zone. Always.",
      desc: "Automatically converts every session to your local time. No more mental math at 3 AM.",
      icon: "🌍"
    },
    {
      title: "Filter What You Love",
      desc: "Follow only the series and drivers you care about. Hide the rest. Clean and simple.",
      icon: "🎯"
    },
    {
      title: "Smart Notifications",
      desc: "Get reminded only for races you follow — qualifying, sprint, main race — exactly when you want.",
      icon: "🔔"
    },
    {
      title: "New Fan Friendly",
      desc: "Confused where to watch? We show streaming/live TV options per country. Welcome to motorsport.",
      icon: "👋"
    },
    {
      title: "Blazing Fast",
      desc: "Built for speed. Offline support, tiny bundle size, instant loading — even on slow connections.",
      icon: "⚡"
    }
  ]);
</script>

<section id="features" class="py-24 px-6 bg-white dark:bg-neutral-900">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-5xl md:text-6xl font-black mb-4">
        Why Fans Are Using <span class="text-[#FF2800]">Track Time</span>
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-400">No more scattered schedules. No more confusion.</p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="group bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-[#00A0DE] transition-all hover:shadow-2xl hover:-translate-y-2">
          <div class="text-5xl mb-4">{feature.icon}</div>
          <h3 class="text-2xl font-bold mb-3 bg-gradient-to-r from-[#FF2800] to-[#FF8000] bg-clip-text text-transparent">
            {feature.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            {feature.desc}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>