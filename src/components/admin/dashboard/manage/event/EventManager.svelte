<script lang="ts">
  import { actions } from "astro:actions";
  import { onMount } from "svelte";
  import type { Events } from "../../../../../database/events";

  let loading = $state(false);
  let loadingError = $state(false);
  let events: Events = $state([]);
  let searchQuery = $state("");

  onMount(async () => {
    console.log("Mounted event manager");
    loading = true;

    const { data, error } = await actions.administration.getAllEvents();

    if (error) {
      loadingError = true;
      return;
    }

    events = data;
    loading = false;
  });
</script>

<div class="bg-[#111111] border border-white/10 w-screen p-6">
  <h1 class="text-xl font-bold text-white mb-2">Events Manager</h1>

  <input
    type="text"
    name="seriesSearch"
    placeholder="Search events..."
    bind:value={searchQuery}
    class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 mb-4 focus:outline-none"
  />

  <table class="w-full border border-separate border-white/10 rounded-2xl">
    <thead>
      <tr class="text-white uppercase font-semibold">
        <th class="p-4">Name</th>
        <th class="p-4">Starts</th>
        <th class="p-4">Ends</th>
        <th class="p-4">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#if loading}
        <tr>
          <td
            colspan="4"
            class="border-t border-white/10 p-3 text-center text-white"
          >
            Loading Events...
          </td>
        </tr>
      {:else if loadingError}
        <tr>
          <td colspan="4" class="p-3 text-center text-zinc-400">
            An error occured while loading.
          </td>
        </tr>
      {:else}
        {#each events as event }
          <tr class="border-t border-white/5">
              <th scope="row" class="font-medium text-white">
                {event.name}
              </th>
              <td class="text-center">
                <span
                  class="px-2 py-1 rounded-md bg-[#00A0DE]/10 text-[#00A0DE] border border-[#00A0DE]/20"
                >
                  {event.start_at}
                </span>
              </td>
              <td class="text-center text-white">{event.end_at}</td>
              <td class="flex flex-col items-center">
                <button
                  onclick={() =>
                    (console.log("I want to edit", event))}
                  class="text-white cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md px-8 py-2 m-2"
                >
                  Edit
                </button>
                <button
                  onclick={() => console.log("I want to delete", event)}
                  class="text-white cursor-pointer bg-red-500 hover:bg-red-600 rounded-md px-5 py-2 mb-2"
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
