<script lang="ts">
    let {
        raceName = "Monaco Grand Prix",
        session = "Practice Session",
        progress = 0.67,
        progressText = "Race Progress",
        leader = "Max Verstappen",
        lapsLeft = 12,
        fastestLap = { driver: "Max Verstappen", lapTime: "1:22:35.00" }
    } = $props();
</script>

<div class="col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 max-w-6xl ">
    <!-- Header -->
    <div class="flex justify-between items-center">
        <div>
        <h2 class="text-lg font-semibold text-white">Live Race Status</h2>
        <p class="text-sm text-gray-400 mt-1">{raceName} — {session}</p>
        </div>

        <div class="flex items-center gap-2 text-sm text-gray-400">
        <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        Live
        </div>
    </div>

    <!-- Progress -->
    <div class="mt-6 space-y-3">
        <div class="text-4xl font-bold text-white tracking-wide">
            {Math.round(progress * 100)}%
        </div>

        <p class="text-sm text-gray-400">{progressText}</p>

        <div class="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
            class="h-full bg-linear-to-r from-indigo-500 to-purple-500 animate-pulse transition-all duration-500"
            style={`width: ${progress * 100}%`}
        ></div>
        </div>

    </div>

    <!-- Stats Grid -->
    <ul class="mt-6 grid grid-cols-3 gap-4 text-center text-sm text-gray-400">
        <li class="rounded-xl bg-white/5 p-3 space-y-1 hover:bg-white/10 transition">
            <span class="text-xs">Current Leader</span>
            <p class="text-white font-semibold truncate">{leader}</p>
        </li>

        <li class="rounded-xl bg-white/5 p-3 space-y-1 hover:bg-white/10 transition">
            <span class="text-xs">Laps Left</span>
            <p class="text-white font-semibold truncate">{lapsLeft}</p>
        </li>

        <li class="rounded-xl bg-white/5 p-3 space-y-1 hover:bg-white/10 transition">
            <span class="text-xs">Fastest lap:</span>
            <p class="text-white font-semibold truncate">{fastestLap.driver} | {fastestLap.lapTime}</p>
        </li>
    </ul>
</div>