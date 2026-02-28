<script>
  let seriesList = $state([
    { id: 'f1', name: 'Formula 1', followed: true },
    { id: 'wec', name: 'World Endurance Championship', followed: false },
    { id: 'imsa', name: 'IMSA', followed: false },
    { id: 'indy', name: 'IndyCar', followed: true },
  ]);

  function toggle(id) {
    const series = seriesList.find(s => s.id === id);
    if (series) series.followed = !series.followed;
  }
</script>

<div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
  <ul class="divide-y divide-gray-100 dark:divide-gray-700">
    {#each seriesList as series}
      <li class="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
        <span class="font-medium">{series.name}</span>
        <button 
          onclick={() => toggle(series.id)}
          class="px-4 py-1.5 rounded-lg text-sm font-bold transition-all
          {series.followed 
            ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600' 
            : 'bg-red-600 text-white hover:bg-red-700'}"
        >
          {series.followed ? 'Unfollow' : 'Follow'}
        </button>
      </li>
    {/each}
  </ul>
</div>