<script lang="ts">
  // Mock data of all available series
  const allSeries = [
    { id: 'f1', name: 'Formula 1', category: 'Open Wheel' },
    { id: 'f2', name: 'Formula 2', category: 'Open Wheel' },
    { id: 'wec', name: 'WEC', category: 'Endurance' },
    { id: 'imsa', name: 'IMSA', category: 'Sports Car' },
    { id: 'indy', name: 'IndyCar', category: 'Open Wheel' },
    { id: 'nascar', name: 'NASCAR', category: 'Stock Car' },
    { id: 'motogp', name: 'MotoGP', category: 'Bikes' }
  ];

  // Svelte 5 Runes
  let searchQuery = $state('');
  let followedIds = $state(['f1', 'wec']); // Initial followed series

  // Derived: Filter the list based on search input
  let filteredResults = $derived(
    searchQuery.trim() === '' 
      ? [] 
      : allSeries.filter(s => 
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
  );

  function toggleFollow(id: string) {
    if (followedIds.includes(id)) {
      followedIds = followedIds.filter(i => i !== id);
    } else {
      followedIds = [...followedIds, id];
    }
  }
</script>

<div class="relative w-full max-w-md group">
  <div class="relative">
    <span class="absolute inset-y-0 left-3 flex items-center text-zinc-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </span>
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search series (e.g. IndyCar)..."
      class="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
    />
  </div>

  {#if filteredResults.length > 0}
    <div class="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden">
      {#each filteredResults as series}
        <div class="flex items-center justify-between p-3 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-0">
          <div>
            <p class="font-bold text-sm">{series.name}</p>
            <p class="text-xs text-zinc-500">{series.category}</p>
          </div>
          <button 
            onclick={() => toggleFollow(series.id)}
            class="px-3 py-1 rounded text-xs font-bold transition-all {followedIds.includes(series.id) 
              ? 'bg-zinc-700 text-zinc-300' 
              : 'bg-orange-600 text-white hover:bg-orange-500'}"
          >
            {followedIds.includes(series.id) ? 'Following' : 'Follow'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>