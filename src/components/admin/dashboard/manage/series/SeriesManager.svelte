<script lang="ts">
    import type { Series } from "../../../../../types/database";
    import { onMount } from "svelte";
    import { actions } from "astro:actions";
    import SeriesModal from "../../../SeriesModal.svelte";
    import DeleteConfirmationModal from "../../../DeleteConfirmationModal.svelte";

    let loadingSeries = $state(true);
    let showAddSeriesModal = $state(false);
    let showDeleteConfirmationModal = $state(false);

    let allSeries = $state<Series[]>([]);
    let filteredSeries = $state<Series[]>([]);
    let seriesToDelete = $state<Series|null>(null);
    let editingSeries: Series|null = $state(null);
    let addingSeries = $state<Series|null>(null);

    let searchTerm = $state("");

    $effect(() => {
        filteredSeries = allSeries.filter((series) =>
            series.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    });

    async function createNewSeries(name: string, description: string) {
        const { data, error } = await actions.series.createSeries({
            name,
            description,
        });

        if (error) {
            console.error("Failed to create series:", error);
            return;
        }

        allSeries = [...allSeries, data];
    }

    async function onSeriesDeleted() {
        if (!seriesToDelete) return;

        const { error } = await actions.series.deleteSeriesById(seriesToDelete.id);

        if (error) {
            console.error("Failed to delete series:", error);
            return;
        }

        allSeries = allSeries.filter((series) => series.id !== seriesToDelete?.id);
        seriesToDelete = null;
    }

    async function updateSeries(seriesData: any) {
        const { data, error } = await actions.series.updateSeries(seriesData);

        if (error) {
            console.error("Failed to update series:", error);
            return;
        }

        allSeries = allSeries.map((s) => (s.id === data.id ? { ...s, ...data } : s));
    }

    onMount(async () => {
        const { data, error } = await actions.series.getAllSeries();

        if (error) {
            loadingSeries = false;
            console.error("Failed to get series data");
            return;
        }

        allSeries = data;
        loadingSeries = false;
    });
</script>

<div class="bg-[#111111] border border-white/10 h-screen">
    <div class="p-6 max-h-[85vh] flex flex-col">
        <h1 class="text-xl font-bold text-white mb-2">Series Manager</h1>

        <input
            bind:value={searchTerm}
            placeholder="Search series..."
            class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 mb-4 focus:outline-none focus:border-[#FF8000]/50 transition"
        />

        <div class="space-y-3 h-64 overflow-y-auto pr-2">
            {#if loadingSeries}
                <p class="text-slate-400 text-sm text-center py-6">
                    Loading Series...
                </p>
            {:else if allSeries.length < 1 && !loadingSeries}
                <p class="text-slate-400 text-sm text-center py-6">
                    No series found.
                </p>
            {:else}
                {#each filteredSeries as series (series.id)}
                    <div class="relative group">
                        <!-- Row -->
                        <button
                            onclick={() => editingSeries = series}
                            class="w-full flex justify-between items-center
                                    bg-slate-800/40 hover:bg-slate-700/60
                                    border border-slate-700/60 hover:border-slate-500
                                    px-4 py-3 rounded-xl
                                    transition-all duration-200
                                    cursor-pointer
                                    text-white"
                        >
                            <span>{series.name}</span>
                        </button>

                        <button
                            onclick={() => {
                                seriesToDelete = series;
                                showDeleteConfirmationModal = true;
                            }}
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-rose-400 text-sm opacity-0 group-hover:opacity-100 transition"
                        >
                            Delete
                        </button>
                    </div>
                {/each}
            {/if}
        </div>

        <button
            onclick={() => { showAddSeriesModal = true; }}
            aria-label="Add new series"
            class="w-full py-3 rounded-xl bg-linear-to-r from-[#FF2800] to-[#FF8000] hover:from-[#ff451a] hover:to-[#ff9f33] text-white font-bold transition shadow-lg shadow-[#FF2800]/20"
        >
            + Add Series
        </button>
    </div>
</div>

<DeleteConfirmationModal 
    show={showDeleteConfirmationModal} 
    seriesToDelete={seriesToDelete} 
    confirmDelete={onSeriesDeleted} 
    closeModal={() => showDeleteConfirmationModal = false} 
/>

<SeriesModal 
    seriesData={editingSeries} 
    isSeriesModalOpen={editingSeries != null} 
    isEdit={true} 
    seriesSaved={updateSeries} 
    closeModal={() => editingSeries = null}
/>

<SeriesModal
    seriesData={addingSeries}
    isSeriesModalOpen={showAddSeriesModal}
    closeModal={() => (showAddSeriesModal = false)}
    isEdit={false}
    seriesSaved={createNewSeries}
/>
