<!-- EditSeriesEventModal.svelte -->
<script>
  export let isOpen = false;  // Prop to control modal visibility
  export let closeModal;      // Function to close the modal
  let activeTab = 'series';   // State to switch between 'series' and 'events'

  const saveSeries = () => {
    // Handle save series logic here
  };

  const saveEvent = () => {
    // Handle save event logic here
  };
</script>

{#if isOpen}
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Edit Series & Events</h2>
        <button
          class="text-gray-600 hover:text-gray-900"
          on:click={closeModal}
        >
          X
        </button>
      </div>

      <!-- Tabs to switch between Series and Events -->
      <div class="mb-4 flex gap-4">
        <button
          class={`px-4 py-2 rounded-lg ${activeTab === 'series' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          on:click={() => activeTab = 'series'}
        >
          Series
        </button>
        <button
          class={`px-4 py-2 rounded-lg ${activeTab === 'events' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          on:click={() => activeTab = 'events'}
        >
          Events
        </button>
      </div>

      <!-- Series Form (when 'series' tab is active) -->
      {#if activeTab === 'series'}
        <div>
          <h3 class="font-semibold mb-2">Edit Series</h3>
          <form>
            <label class="block mb-2">Title</label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4" placeholder="Series Title" />
            
            <label class="block mb-2">Description</label>
            <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4" placeholder="Series Description"></textarea>
            
            <button
              type="button"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
              on:click={saveSeries}
            >
              Save Series
            </button>
          </form>
        </div>
      {/if}

      <!-- Event Form (when 'events' tab is active) -->
      {#if activeTab === 'events'}
        <div>
          <h3 class="font-semibold mb-2">Edit Event</h3>
          <form>
            <label class="block mb-2">Event Title</label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4" placeholder="Event Title" />
            
            <label class="block mb-2">Event Date</label>
            <input type="date" class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4" />
            
            <label class="block mb-2">Description</label>
            <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4" placeholder="Event Description"></textarea>

            <button
              type="button"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
              on:click={saveEvent}
            >
              Save Event
            </button>
          </form>
        </div>
      {/if}
    </div>
  </div>
{/if}