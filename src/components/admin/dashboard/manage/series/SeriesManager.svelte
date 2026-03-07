<script lang="ts">
    import { onMount } from "svelte";
    import { actions } from "astro:actions";
    import SeriesManagerList from './SeriesManagerList.svelte';
    import SeriesModal from "../../../SeriesModal.svelte";
    import DeleteConfirmationModal from "../../../DeleteConfirmationModal.svelte";

    let seriesManagerDialog: HTMLDialogElement;

    let showAddModal = $state(false);
    let searchTerm = $state("");

    let series = $state<SeriesData[]>([]);
    let seriesFiltered = $state<SeriesData[] | []>([]);
    let seriesToDelete = $state<string | null>(null);

    let addingSeries = $state({ id: null, name: "", description: "" });

    $effect(() => {
        seriesFiltered = series.filter((series) =>
            series.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    });

    // Confirm the delete of a series
    async function confirmDelete() {
        if (!seriesToDelete) return;

        const { error } = await actions.series.deleteSeries(seriesToDelete);

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

        series = data; // Set the fetched series data
    });

    function seriesSaved(series) {
        updateSeries(series)
    }
</script>

<button
    onclick={() => (seriesManagerDialog.showModal())}
    class="w-full h-full p-1 rounded-2xl border-white
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

<dialog bind:this={seriesManagerDialog}>
    <!-- Container -->
    <div class="fixed inset-0 flex items-center justify-center">
        <!-- Backdrop -->
        <button class="absolute inset-0 backdrop-blur-sm" onclick={() => (seriesManagerDialog.close())} aria-label="Close Seires Manager"></button>
        <!-- Panel -->
        <div class="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl p-8 shadow-2xl">
            <!-- Panel Header -->
            <div class="flex justify-between mb-6">
                <!-- Panel Header Title -->
                <h2 class="text-2xl font-bold text-white">Series Manager</h2>
                <!-- Panel Header Close Button -->
                <button onclick={() => seriesManagerDialog.close()} class="text-red-700 hover:text-red-500" aria-label="Close Series Manager">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <!-- Series Search -->
            <input bind:value={searchTerm} placeholder="Search series..." class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white mb-4"/>

            <!-- Series List -->
            <SeriesManagerList series={seriesFiltered} onSeriesSaved={seriesSaved}></SeriesManagerList>

            <!-- Add Series Button -->
            <button onclick={() => { showAddModal = true; }} class="mt-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl font-semibold text-white">
                Add Series
            </button>
        </div>
    </div>
</dialog>

<!-- Add Series Modal -->
<SeriesModal
    seriesData={addingSeries}
    show={showAddModal}
    closeModal={() => (showAddModal = false)}
    isEdit={false}
    seriesSaved={createNewSeries}
/>
