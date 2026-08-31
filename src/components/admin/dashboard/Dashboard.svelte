<script lang="ts">
  import UserManager from "./manage/user/UserManager.svelte";
  import SeriesManager from "./manage/series/SeriesManager.svelte";

  let currentView = $state("users");
</script>

<main class="flex h-screen">
  <aside class="bg-[#111111] border border-white/10 w-64">
    <h1 class="text-white uppercase m-4 text-center">Admin Controls</h1>
    <nav class="flex flex-col items-center">
      <button
        onclick={() => (currentView = "users")}
        class="flex items-center px-3 py-2.5 mb-1 rounded-md cursor-pointer
                    {currentView === 'users'
          ? 'bg-orange-600 text-white'
          : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}"
      >
        <span class="mr-2">👤</span> User Manager
      </button>

      <button
        onclick={() => (currentView = "series")}
        class="flex items-center px-3 py-2.5 rounded-md cursor-pointer
                    {currentView === 'series'
          ? 'bg-orange-600 text-white'
          : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'}"
      >
        <span class="mr-2">📁</span> Series Manager
      </button>
    </nav>
  </aside>

  {#if currentView == "users"}
    <UserManager />
  {:else if currentView == "series"}
    <SeriesManager />
  {/if}
</main>
