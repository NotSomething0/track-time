<!-- src/lib/components/admin/StatsGrid.svelte -->
<script lang="ts">
  import '../styles/global.css';

  // Using runes (Svelte 5)
  let stats = $state({
    totalUsers: 0,
    activeToday: 0,
    totalTracked: '0h 0m',
    avgDaily: '0h 0m'
  });

  let isLoading = $state(true);
  let error = $state<string | null>(null);

  // Example: fetch data when component mounts
  $effect(() => {
    async function fetchStats() {
      try {
        isLoading = true;
        error = null;

        // Replace with your actual endpoint
        const response = await fetch('/api/admin/stats', {
          headers: {
            // Add your auth header if needed
            // 'Authorization': `Bearer ${getToken()}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch stats');

        const data = await response.json();
        
        stats = {
          totalUsers: data.totalUsers ?? 0,
          activeToday: data.activeToday ?? 0,
          totalTracked: data.totalTracked ?? '0h 0m',
          avgDaily: data.avgDaily ?? '0h 0m'
        };
      } catch (err) {
        error = err instanceof Error ? err.message : 'Something went wrong';
        console.error('Stats fetch error:', err);
      } finally {
        isLoading = false;
      }
    }

    fetchStats();

    // Optional: auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
  <!-- Total Users -->
  <div class="stat-card">
    <div class="stat-label">Total Users</div>
    {#if isLoading}
      <div class="stat-value skeleton h-10 w-3/4"></div>
    {:else if error}
      <div class="stat-value text-red-400">Error</div>
    {:else}
      <div class="stat-value">{stats.totalUsers.toLocaleString()}</div>
    {/if}
  </div>

  <!-- Active Today -->
  <div class="stat-card highlight-emerald">
    <div class="stat-label">Active Today</div>
    {#if isLoading}
      <div class="stat-value skeleton h-10 w-2/3"></div>
    {:else if error}
      <div class="stat-value text-red-400">Error</div>
    {:else}
      <div class="stat-value">{stats.activeToday.toLocaleString()}</div>
    {/if}
  </div>

  <!-- Total Tracked Time -->
  <div class="stat-card highlight-amber">
    <div class="stat-label">Total Tracked</div>
    {#if isLoading}
      <div class="stat-value skeleton h-10 w-4/5"></div>
    {:else if error}
      <div class="stat-value text-red-400">Error</div>
    {:else}
      <div class="stat-value">{stats.totalTracked}</div>
    {/if}
  </div>

  <!-- Average Daily -->
  <div class="stat-card">
    <div class="stat-label">Avg / User / Day</div>
    {#if isLoading}
      <div class="stat-value skeleton h-10 w-3/4"></div>
    {:else if error}
      <div class="stat-value text-red-400">Error</div>
    {:else}
      <div class="stat-value">{stats.avgDaily}</div>
    {/if}
  </div>
</div>

<style>
</style>