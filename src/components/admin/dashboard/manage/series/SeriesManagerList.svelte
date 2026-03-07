<script lang="ts">
    import SeriesModal from "../../../SeriesModal.svelte";
    import DeleteConfirmationModal from "../../../DeleteConfirmationModal.svelte";
    
    let { series, onSeriesSaved } = $props();

    let editingSeries = $state(null);

    function closeModal() {
        editingSeries = null;
    }

    function handleDelete(id, e) {
        e.stopPropagation();

        console.log(id, e)
    }
</script>

<div class="space-y-3 h-64 overflow-y-auto pr-2">
    {#if series.length < 1}
        <p class="text-slate-400 text-sm text-center py-6">
            No series found.
        </p>
    {:else}
        {#each series as s (s.id)}
            <div class="relative group">
                <!-- Row -->
                <button
                    onclick={() => editingSeries = s}
                    class="w-full flex justify-between items-center
                            bg-slate-800/40 hover:bg-slate-700/60
                            border border-slate-700/60 hover:border-slate-500
                            px-4 py-3 rounded-xl
                            transition-all duration-200
                            cursor-pointer
                            text-white"
                >
                    <span>{s.name}</span>
                </button>

                <!-- Delete Action -->
                <button
                    onclick={(e) => handleDelete(s.id, e)}
                    class="absolute right-4 top-1/2 -translate-y-1/2
                    text-rose-400 text-sm opacity-0 group-hover:opacity-100 transition"
                >
                    Delete
                </button>
            </div>
        {/each}
    {/if}
</div>

<SeriesModal seriesData={editingSeries} show={editingSeries != null} isEdit={true} seriesSaved={onSeriesSaved} closeModal={closeModal}/>
