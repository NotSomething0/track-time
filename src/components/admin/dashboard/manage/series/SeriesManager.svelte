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
  let seriesToDelete = $state<Series | null>(null);
  let editingSeries: Series | null = $state(null);
  let addingSeries = $state<Series | null>(null);

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

    allSeries = allSeries.map((s) =>
      s.id === data.id ? { ...s, ...data } : s,
    );
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

<div class="bg-[#111111] border border-white/10 h-screen p-6">
  <h1 class="text-xl font-bold text-white mb-2">Series Manager</h1>

  <input
    type="text"
    name="seriesSearch"
    placeholder="Search series..."
    bind:value={searchTerm}
    class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 mb-4 focus:outline-none"
  />

  <div class="border border-white/10 rounded-2xl bg-white/2">
    <table class="w-full">
      <thead>
        <tr class="text-gray-400 uppercase font-semibold">
          <th class="p-4">Name</th>
          <th class="p-4">Category</th>
          <th class="p-4">Status</th>
          <th class="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#if loadingSeries}
          <tr>
            <td colspan="4" class="p-3 text-center text-zinc-400">
              Loading Series...
            </td>
          </tr>
        {:else if filteredSeries.length < 1}
          <tr>
            <td colspan="4" class="p-3 text-center text-zinc-400">
              No Series found maybe you should create some?
            </td>
          </tr>
        {:else}
          {#each filteredSeries as series (series.id)}
            <tr class="border-t border-white/5">
              <th scope="row" class="font-medium text-white">
                {series.name}
              </th>
              <td class="text-center">
                <span
                  class="px-2 py-1 rounded-md bg-[#00A0DE]/10 text-[#00A0DE] border border-[#00A0DE]/20"
                >
                  {series.category}
                </span>
              </td>
              <td class="text-center text-white"
                >{series.status}</td
              >
              <td class="flex flex-col">
                <button
                  onclick={() => editingSeries = series}
                  class="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onclick={() => showDeleteConfirmationModal = true}
                  class="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <button
    onclick={() => {
      showAddSeriesModal = true;
    }}
    aria-label="Add new series"
    class="w-full mt-3 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold cursor-pointer"
  >
    + Create Series
  </button>
</div>

<DeleteConfirmationModal
  show={showDeleteConfirmationModal}
  {seriesToDelete}
  confirmDelete={onSeriesDeleted}
  closeModal={() => (showDeleteConfirmationModal = false)}
/>

<SeriesModal
  seriesData={editingSeries}
  isSeriesModalOpen={editingSeries != null}
  isEdit={true}
  seriesSaved={updateSeries}
  closeModal={() => (editingSeries = null)}
/>

<SeriesModal
  seriesData={addingSeries}
  isSeriesModalOpen={showAddSeriesModal}
  closeModal={() => (showAddSeriesModal = false)}
  isEdit={false}
  seriesSaved={createNewSeries}
/>
