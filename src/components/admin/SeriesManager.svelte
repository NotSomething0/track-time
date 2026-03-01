<script lang="ts">
    import { onMount } from "svelte";
    import { actions } from "astro:actions";
    import SeriesModal from "./SeriesModal.svelte";
    import DeleteConfirmationModal from "./DeleteConfirmationModal.svelte";

    let showManageModal = $state(false);
    let showAddModal = $state(false);
    let showEditModal = $state(false);
    let searchTerm = $state("");

    let series = $state<SeriesData[]>([]);
    let seriesFiltered = $state<SeriesData[] | []>([]);
    let seriesToDelete = $state<string | null>(null);

    let editingSeries = $state<SeriesData | null>(null);
    let addingSeries = $state({ id: null, name: "", description: "" });

    $effect(() => {
        seriesFiltered = series.filter((series) =>
            series.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    });

    // Confirm the delete of a series
    async function confirmDelete() {
        if (!seriesToDelete) return;

        const { data, error } = await actions.series.deleteSeries(seriesToDelete);

        if (error) {
            console.error("Failed to delete series:", error);
            return;
        }

        // Remove deleted series from the list - create new array reference
        series = series.filter((s) => s.id !== seriesToDelete);
        seriesToDelete = null; // Reset seriesToDelete after deletion
    }

    // Create a new series
    async function createNewSeries(name: string, description: string) {
        const { data, error } = await actions.series.createSeries({
            name,
            description,
        });

        if (error) {
            console.error("Failed to create series:", error);
            return;
        }

        // Create new array reference instead of mutating
        series = [...series, data];
    }

    // Update an existing series
    async function updateSeries(seriesData: any) {
        const { data, error } = await actions.series.updateSeries(seriesData);

        if (error) {
            console.error("Failed to update series:", error);
            return;
        }

        // Update the series in the list - create new array reference
        series = series.map((s) => (s.id === data.id ? { ...s, ...data } : s));
    }

    // On mount, fetch all series
    onMount(async () => {
        const { data, error } = await actions.series.getAllSeries();

        if (error) {
            console.error("Failed to get series data");
            return;
        }

        console.log(data, 'here')

        series = data; // Set the fetched series data
    });
</script>



<button
    onclick={() => (showManageModal = true)}
    class="relative z-10 group block w-full h-full p-1 rounded-2xl border-white
            bg-linear-to-b from-white/10
            hover:from-orange-500/20 text-left"
    >
    <div
        class="bg-slate-950 p-6 rounded-[calc(1rem-1px)] h-full flex flex-col justify-center"
    >
        <h3 class="text-lg font-bold text-white">Manage Series 🏁</h3>
        <p class="text-slate-500 text-sm mt-1">
        Manage motorsports series & events.
        </p>
    </div>
</button>

{#if showManageModal}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <button
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onclick={() => (showManageModal = false)}
            aria-label="Close modal"
            type="button"
        ></button>

        <!-- Panel -->
        <div
        class="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl p-8 shadow-2xl"
        >
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-white">Manage Series</h2>
            <button
            onclick={() => (showManageModal = false)}
            class="text-slate-400 hover:text-white text-xl">✕</button
            >
        </div>

        <!-- SEARCH -->
        <input
            bind:value={searchTerm}
            placeholder="Search series..."
            class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500 mb-4"
        />

        <!-- SERIES LIST -->
        <div class="space-y-2 h-64 overflow-y-auto pr-2 mb-6">
            {#if seriesFiltered.length === 0}
                <p class="text-slate-400 text-sm">No series found.</p>
            {:else}
            {#each seriesFiltered as s (s.id)}
                <div class="flex justify-between items-center bg-slate-800/50 px-4 py-3 rounded-xl">
                    <span class="font-semibold text-white">{s.name}</span>
                    <div class="flex gap-3">
                        <button onclick={() => { editingSeries = s; showEditModal = true; }}
                            class="text-blue-400 text-sm">Edit</button
                        >
                        <button
                        onclick={() => (seriesToDelete = s.id)}
                        class="text-rose-400 text-sm">Delete</button
                        >
                    </div>
                </div>
            {/each}
            {/if}
        </div>

        <!-- ADD SERIES BUTTON -->
        <button
            onclick={() => { showAddModal = true; }}
            class="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-xl font-semibold text-white"
        >
            Add Series
        </button>
        </div>
    </div>
{/if}

<!-- Add Series Modal -->
<SeriesModal
    title="Add Series"
    seriesData={addingSeries}
    show={showAddModal}
    closeModal={() => (showAddModal = false)}
    isEdit={false}
    save={createNewSeries}
/>

<!-- Edit Series Modal -->
<SeriesModal
    show={showEditModal}
    closeModal={() => (showEditModal = false)}
    title="Edit Series"
    seriesData={editingSeries}
    isEdit={true}
    save={updateSeries}
/>

<!-- Delete Confirmation Modal -->
<DeleteConfirmationModal
    show={!!seriesToDelete}
    closeModal={() => (seriesToDelete = null)}
    {confirmDelete}
    seriesName={seriesFiltered.find((s) => s.id === seriesToDelete)?.name || ""}
/>
