<script lang="ts">
  import { onMount } from "svelte";

    const { races } = $props<{ races: any[] }>();

    const nextRace = $derived.by(() => {
        if (!races.length) return null;

        return [...races].sort(
        (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        )[0];
    });

    function formatTimeUntil(targetDate: Date) {
        const now = new Date();
        const target = new Date(targetDate);

        if (target <= now) return "Event has started";

        // 1. Calculate Months
        let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
        let tempDate = new Date(now);
        tempDate.setMonth(tempDate.getMonth() + months);

        if (tempDate > target) {
            months--;
            tempDate = new Date(now);
            tempDate.setMonth(tempDate.getMonth() + months);
        }

        // 2. Calculate Days and Hours from the remainder
        const diffMs = target - tempDate;
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        // 3. Build the String
        const parts = [];
        
        if (months > 0) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`);
        if (days > 0)   parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
        if (hours > 0)  parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);

        // Join with commas and an "and" for the last item
        if (parts.length === 0) return "Less than an hour remaining";
        if (parts.length === 1) return parts[0];
        
        const lastPart = parts.pop();
        return `${parts.join(", ")} and ${lastPart}`;
    }

    let timeUntilEvent = $state(formatTimeUntil(nextRace.date));

    onMount(() => {
        setInterval(() => {
            timeUntilEvent = formatTimeUntil(nextRace.date);
        }, 1000)
    });
</script>

{#if nextRace}
<div class="lg:col-span-1 bg-zinc-900 p-6 rounded-xl border border-orange-600/30 shadow-xl space-y-4">
    <h2 class="text-2xl font-bold">{nextRace.event}</h2>
    <p class="text-zinc-500">{nextRace.series}</p>

    <div class="text-4xl font-black text-orange-500">
        {timeUntilEvent}
    </div>

</div>
{/if}