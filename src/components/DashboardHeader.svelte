<script>
  let user = {
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "https://ui-avatars.com/api/?name=AC&size=128"
  };
</script>

<header class="w-full max-w-6xl mx-auto px-6 md:px-10 mt-10 relative">

  <!-- Floating gradient light -->
  <div class="absolute -top-20 left-1/4 w-72 h-72 bg-purple-500/20 blur-3xl pointer-events-none" />

  <div class="relative overflow-hidden rounded-2xl border border-white/10
              bg-white/5 backdrop-blur-2xl shadow-2xl
              transition-all duration-500 hover:border-white/20">

    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 px-6 py-6">

      <!-- Title Cluster -->
      <div class="space-y-1">
        <h1 class="text-2xl font-bold tracking-tight text-white">
          Track Time
        </h1>

        <p class="text-sm text-white/40 max-w-lg">
          Monitor productivity, manage entries, and analyze your daily activity with real-time insights.
        </p>
      </div>

      <!-- Control Cluster -->
      <div class="flex items-center gap-4 flex-wrap md:flex-nowrap">

        <!-- Command Palette Trigger Pattern -->
        <button
          class="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl
                 border border-white/10 bg-white/5 hover:bg-white/10
                 text-sm text-white/60 hover:text-white/90
                 transition-all duration-300 group"
        >
          <span class="opacity-60 group-hover:opacity-100 transition">⌘K</span>
          <span>Search / Commands</span>
        </button>

        <!-- Primary Action -->
        <button
          class="w-full sm:w-auto px-4 py-2.5 rounded-xl
                 bg-gradient-to-r from-purple-500/20 to-indigo-500/20
                 hover:from-purple-500/30 hover:to-indigo-500/30
                 border border-white/10 hover:border-white/20
                 text-sm font-medium text-white transition-all duration-300
                 active:scale-95 shadow-lg"
        >
          New Entry
        </button>

        <!-- Notification -->
        <button
          class="relative p-2.5 rounded-xl hover:bg-white/10 transition group"
        >
          <span class="text-lg opacity-70 group-hover:opacity-100 transition">
            🔔
          </span>

          <span class="absolute top-2 right-2 w-2 h-2 rounded-full
                     bg-red-500 ring-2 ring-black animate-pulse" />
        </button>

        <!-- Profile Cluster -->
        <button
          class="flex items-center gap-3 p-1.5 pr-4 rounded-xl
                 hover:bg-white/10 transition-all duration-300
                 w-full sm:w-auto active:scale-98"
        >
          <img
            src={user.avatar}
            alt="Profile"
            class="w-9 h-9 rounded-lg object-cover shadow-lg"
          />

          <div class="hidden md:flex flex-col text-left leading-tight">
            <span class="text-sm text-white/90 font-medium">
              {user.name}
            </span>
            <span class="text-xs text-white/40">
              {user.email}
            </span>
          </div>
        </button>

      </div>
    </div>
  </div>
</header>