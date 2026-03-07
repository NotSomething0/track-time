<script lang="ts">
    import { slide } from 'svelte/transition';
    import SeriesEventList from './SeriesEventList.svelte';

    let id = $state<string | null>(null);
    let name = $state('');
    let description = $state('');
    let { seriesData, show, closeModal, isEdit, seriesSaved }: { seriesData: SeriesData | null, show: any, closeModal: any, isEdit: boolean, seriesSaved: any } = $props();


    $effect(() => {
        if (seriesData?.id) {
            id = seriesData.id ?? null;
            name = seriesData.name ?? '';
            description = seriesData.description ?? '';
        }
    });

    async function createOrUpdateSeries() {
        if (!name) {
            alert("Name cannot be empty");
            return;
        }

        if (!description) {
            alert("Description cannot be empty");
            return;
        }

        if (isEdit) {
            if (!id) {
                alert(`Can't save series ${name} the id is missing. Are you sure this series has been created?`);
                return;
            }

            seriesSaved({ id, name, description, events });
        } else {
            seriesSaved(name, description, events);
        }

        closeModal();
    }
</script>

{#if show}
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <button class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick={closeModal} aria-label="Close modal" type="button"></button>

        <!-- panel -->
        <div class="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl p-8 shadow-2xl" transition:slide={{ duration: 200 }}>
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-white">Editing {seriesData?.name ?? "Unknown"}</h2>
                <button onclick={closeModal} class="text-red-700 hover:text-red-500" aria-label="Close Series Manager">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="text-slate-400 text-sm">Name
                        <input bind:value={name} class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500" />
                    </label>
                </div>

                <div>
                    <label class="text-slate-400 text-sm">Description
                        <textarea bind:value={description} class="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-orange-500"></textarea>
                    </label>
                </div>

                <!-- Events Section (Replaced table with EventSelectionCard) -->
                <h3 class="text-lg font-semibold text-white">Events</h3>
                <SeriesEventList series={seriesData} />

                <div class="flex justify-end gap-3 mt-4">
                    <button onclick={closeModal} class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-white">Cancel</button>
                    <button onclick={createOrUpdateSeries} class="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-xl text-white">{isEdit ? "Save" : "Add"}</button>
                </div>
            </div>
        </div>
    </div>
{/if}
