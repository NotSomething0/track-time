<script lang="ts">

    let { followedSeries, upcomingRaces } = $props();

    function getNextRace() {
        return upcomingRaces
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
    }

    function getCountdown(date: string) {
        const diff = new Date(date).getTime() - Date.now();
        if (diff <= 0) return "Live Now";
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        return `${d}d ${h}h`;
    }

    const nextRace = $derived(getNextRace());
</script>

<div class="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
    <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
        <h1 class="text-2xl font-bold">Track Time Dashboard</h1>
        <p class="text-zinc-500 text-sm">
            Following {followedSeries.length} series · {upcomingRaces.length} upcoming races
        </p>
        </div>

        {#if nextRace}
        <div class="text-right">
            <p class="text-xs uppercase tracking-widest text-zinc-500">Next Event</p>
            <p class="text-orange-500 font-bold">
            {nextRace.event} – {getCountdown(nextRace.date)}
            </p>
        </div>
        {/if}
    </div>
</div>