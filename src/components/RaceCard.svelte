<script lang="ts">
  const { race, onToggleAlarm } = $props<{
    race: {
      id: number;
      event: string;
      date: string;
      location?: string;
      alarm: boolean;
      category?: string;
    };
    onToggleAlarm?: (id: number) => void;
  }>();

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
</script>

<button
  type="button"
  class="group relative w-full text-left bg-zinc-900 border border-zinc-800/50 rounded-xl p-5 
         hover:bg-zinc-800/40 transition-all duration-300 hover:border-zinc-700
         hover:shadow-xl hover:shadow-orange-950/10 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-orange-500/50"
  onclick={() => onToggleAlarm?.(race.id)}
>
  <div
    class="absolute inset-y-0 left-0 w-1 bg-orange-600 rounded-l-xl opacity-40 
           group-hover:opacity-100 group-hover:shadow-[0_0_15px_rgba(234,88,12,0.5)] transition-all"
  />

  <div class="flex justify-between items-start gap-4">
    <div class="space-y-2">
      <div class="flex items-center gap-2">
        {#if race.category}
          <span class="text-[10px] uppercase tracking-widest font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
            {race.category}
          </span>
        {/if}
        <p class="text-xs font-medium text-zinc-500 uppercase tracking-tight">
          {race.location || 'Circuit'}
        </p>
      </div>

      <div>
        <h4 class="text-lg font-black italic text-zinc-100 group-hover:text-white transition-colors leading-none mb-1">
          {race.event.toUpperCase()}
        </h4>
        <div class="flex items-center gap-2 text-sm text-zinc-400">
          <span class="inline-block w-4 h-[1px] bg-zinc-700"></span>
          {formatDate(race.date)}
        </div>
      </div>
    </div>

    <div 
      class="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-all"
    >
      <span class="text-xl leading-none">
        {race.alarm ? "🔔" : "🔕"}
      </span>
    </div>
  </div>

  <div class="absolute bottom-2 right-3 opacity-5 group-hover:opacity-20 transition-opacity">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/>
    </svg>
  </div>
</button>