<script lang="ts">
    let { event, onSave, onCancel, isOpen } = $props();

    console.log(event.series_id)

    function parseDateParts(isoString: string, timezone?: string) {
        if (!isoString) return null;

        const date = new Date(isoString);

        return {
            date: date.toISOString().split("T")[0],
            time: date.toISOString().split("T")[1].slice(0, 5),
            timezone:
                timezone ||
                event?.timezone ||
                Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    }

    const startParts = parseDateParts(event?.start_at, event?.timezone);
    const endParts = parseDateParts(event?.end_at, event?.timezone);

    let newName = event?.name ?? "";

    let newStartDate = startParts?.date ?? "";
    let newStartTime = startParts?.time ?? "";
    let newEndDate = endParts?.date ?? "";
    let newEndTime = endParts?.time ?? "";

    let newTimezone =
        event?.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timezones =
        Intl.supportedValuesOf?.("timeZone") ?? [
            "UTC",
            "America/New_York",
            "America/Los_Angeles",
            "Europe/London",
            "Asia/Tokyo"
        ];

    function buildIso(date: string, time: string, timezone: string) {
        const dt = new Date(`${date}T${time}:00`);

        return new Date(
            dt.toLocaleString("en-US", { timeZone: timezone })
        ).toISOString();
    }

    function handleSave() {
        onSave({
            id: event.id,
            name: newName,
            timezone: newTimezone,
            start_at: buildIso(newStartDate, newStartTime, newTimezone),
            series_id: event.series_id,
            end_at: buildIso(newEndDate, newEndTime, newTimezone)
        });
    }
</script>

{#if isOpen}
<div class="fixed inset-0 z-50 flex items-center justify-center">
    <button class="absolute inset-0 backdrop-blur-sm" onclick={onCancel} aria-label="Close modal"></button>

    <div class="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-xl p-8 shadow-2xl">
        <h3 class="text-2xl font-bold text-white mb-6">
            {#if event?.name}
                Editing {event.name}
            {:else}
                Creating new event
            {/if}
        </h3>

        <div class="space-y-5">

            <!-- Name -->
            <div>
                <label class="text-slate-400 text-sm block mb-1">Event Name
                    <input
                        bind:value={newName}
                        class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                    />
                </label>
            </div>

            <!-- Start -->
            <div class="space-y-3">
                <h4 class="text-white font-semibold">Start Time</h4>

                <input
                    type="date"
                    bind:value={newStartDate}
                    class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                    type="time"
                    bind:value={newStartTime}
                    class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
            </div>

            <!-- End -->
            <div class="space-y-3">
                <h4 class="text-white font-semibold">End Time</h4>

                <input
                    type="date"
                    bind:value={newEndDate}
                    class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />

                <input
                    type="time"
                    bind:value={newEndTime}
                    class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
            </div>

            <div class="space-y-3">
                <h4 class="text-white font-semibold">Event Timezone</h4>

                <select
                    bind:value={newTimezone}
                    class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                >
                    {#each timezones as tz}
                        <option value={tz}>{tz}</option>
                    {/each}
                </select>
            </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
            <button
                class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition"
                onclick={onCancel}
            >
                Cancel
            </button>

            <button
                class="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-xl text-white transition"
                onclick={handleSave}
            >
                Save
            </button>
        </div>
    </div>
</div>
{/if}