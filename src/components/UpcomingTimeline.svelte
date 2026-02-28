<script lang="ts">
    import RaceCard from "./RaceCard.svelte";

    const { races, onToggleAlarm } = $props<{
        races: any[];
        onToggleAlarm?: (id: number) => void;
    }>();
</script>

<div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-6">
    <div class="flex justify-between border-b border-zinc-800 pb-4">
        <h2 class="text-lg font-bold tracking-wide">
            Upcoming Races
        </h2>
    </div>

    <div class="space-y-8">
        {#each races as race}
            <div class="space-y-3">
                <h3 class="text-xs uppercase tracking-widest text-orange-500 font-semibold">
                    {race.series}
                </h3>

                <div class="space-y-3">
                    <RaceCard race={race} onToggleAlarm={onToggleAlarm} />
                </div>
            </div>
        {/each}
    </div>
</div>