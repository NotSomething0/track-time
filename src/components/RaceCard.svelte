<script lang="ts">
  const { race, onToggleAlarm } = $props<{
    race: any;
    onToggleAlarm?: (id: number) => void;
  }>();

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  }
</script>

<div
  class="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-4
         hover:bg-zinc-800/70 transition-all duration-300
         hover:-translate-y-0.5 cursor-pointer shadow-md"
  onclick={() => onToggleAlarm?.(race.id)}
>

  <div class="absolute inset-y-0 left-0 w-1 bg-orange-600 rounded-l-xl opacity-80" />

  <div class="flex justify-between items-start gap-4">

    <div class="space-y-1">
      <h4 class="font-bold group-hover:text-orange-400 transition-colors">
        {race.event}
      </h4>

      <p class="text-sm text-zinc-500">
        {formatDate(race.date)}
      </p>
    </div>

    <button
      class="opacity-70 group-hover:opacity-100 transition-all
             text-zinc-500 hover:text-orange-500 text-lg"
      onclick={(e) => {
        e.stopPropagation();
        onToggleAlarm?.(race.id);
      }}
    >
      {race.alarm ? "🔔" : "🔕"}
    </button>

  </div>
</div>