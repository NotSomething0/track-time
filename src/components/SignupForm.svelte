<script lang="ts">
  let username = $state('');
  let password = $state('');
  let loading = $state(false);

  async function handleSubmit(event: Event) {
    event.preventDefault();
    loading = true;
    setTimeout(() => { loading = false; }, 2500);
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  <div>
    <input
      type="text"
      bind:value={username}
      placeholder="username"
      required
      class="w-full px-6 py-5 rounded-full bg-neutral-900/80 border border-neutral-700 focus:border-[#00A0DE] focus:outline-none text-white placeholder-gray-500 text-lg transition"
    />
  </div>

  <div>
    <input
      type="password"
      bind:value={password}
      placeholder="Password (6+ characters)"
      minlength="6"
      required
      class="w-full px-6 py-5 rounded-full bg-neutral-900/80 border border-neutral-700 focus:border-[#00A0DE] focus:outline-none text-white placeholder-gray-500 text-lg transition"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    class="w-full bg-linear-to-r from-[#FF2800] to-[#FF8000] hover:from-[#ff451a] hover:to-[#ff9d33] disabled:opacity-70 text-white font-black text-xl py-6 rounded-full transition transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
  >
    {#if loading}
      <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="60" stroke-dashoffset="20"/></svg>
      Revving up your account...
    {:else}
      Create Free Account
    {/if}
  </button>

  <p class="text-xs text-gray-500 text-center">
    By signing up, you agree to our <a href="/terms" class="text-[#00A0DE] hover:underline">Terms</a> and <a href="/privacy" class="text-[#00A0DE] hover:underline">Privacy Policy</a>.
  </p>
</form>