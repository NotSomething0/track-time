<script lang="ts">
    import { slide } from "svelte/transition";

    let { events = [], pageSize = 3 } = $props();

    let currentPage = $state(1);

    const totalPages = $derived(
        Math.ceil(events.length / pageSize)
    );

    const paginatedEvents = $derived(
        events.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
        )
    );

    function formatDateTime(isoString: string) {
        return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
        }).format(new Date(isoString));
    }

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }
</script>

<section class="mb-16 space-y-6">
    <h3 class="text-xl font-semibold text-white">
        Upcoming Events
    </h3>

    <div class="relative h-[520px] overflow-hidden">
        {#if events.length < 1}
            <div class="flex flex-col items-center justify-center h-full text-center p-8 border border-dashed border-white/20 rounded-2xl bg-white/5 backdrop-blur-md">
                <div class="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 ring-1 ring-indigo-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>

                <h3 class="text-xl font-medium text-white mb-2">No upcoming races</h3>
                <p class="text-gray-400 max-w-[240px] text-sm leading-relaxed">
                    It looks like the track is clear for now. Check back later for new events.
                </p>
                
                <button class="mt-6 px-5 py-2 text-sm font-medium text-indigo-300 border border-indigo-500/30 rounded-full hover:bg-indigo-500/10 transition">
                    Refresh Schedule
                </button>
            </div>
        {:else}
            {#each paginatedEvents as event (event.name)}
                <div
                    transition:slide={{ duration: 180 }}
                    class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:-translate-y-1 transition duration-300 hover:bg-white/10 mb-5"
                >
                    <div class="flex justify-between items-start">
                        <div class="space-y-1">
                            <h4 class="text-white font-semibold">
                            {event.name}
                            </h4>

                            <p class="text-sm text-gray-400">
                            {event.track}
                            </p>
                        </div>

                        <span class="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                            {event.series}
                        </span>
                    </div>

                    <div class="mt-5 flex justify-between items-center text-sm">
                        <div class="flex flex-col text-gray-400">
                            <span class="text-xs uppercase tracking-wider">
                            Race Start
                            </span>

                            <span class="text-indigo-300 font-medium">
                            {formatDateTime(event.start_at)}
                            </span>
                        </div>

                        <button class="text-indigo-400 hover:text-indigo-200 transition active:scale-95">
                            View Event →
                        </button>
                    </div>
                </div>
            {/each}
        {/if}
    </div>

    {#if totalPages > 1}
        <div class="flex justify-between items-center pt-2 text-sm text-white">
            <button
                class="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 transition"
                onclick={prevPage}
                disabled={currentPage === 1}
            >
                ← Previous
            </button>

            <span class="text-gray-400">
                Page {currentPage} of {totalPages}
            </span>

            <button
                class="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-40 transition"
                onclick={nextPage}
                disabled={currentPage === totalPages}
            >
                Next →
            </button>
        </div>
    {/if}
</section>