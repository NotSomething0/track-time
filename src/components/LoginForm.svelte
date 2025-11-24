<script lang="ts">
  const LOGIN_URL = "/api/auth/login";
  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let loginError = $state<string | null>(null);

  async function handleSubmit(event: Event) {
    event.preventDefault();

    loading = true;
    loginError = null;

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
          "password": password
        })
      });

      if (response.redirected) {
        window.location.href = response.url;
        return;
      }

      const message = await response.text();
      loginError = message;

    } catch (exception) {
      loginError = "A network error occured. Check your connection and try again."
    } finally {
      loading = false;
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  {#if loginError}
    <div class="animate-fade-in">
      <div class="mx-4 p-5 rounded-2xl bg-red-950/60 border border-red-500/50 backdrop-blur-sm shadow-2xl shadow-red-900/20">
        <div class="flex items-center justify-center gap-3">
          <svg class="w-6 h-6 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01"/>
          </svg>
          <p class="text-red-200 font-medium text-lg tracking-tight">
            {loginError}
          </p>
        </div>
      </div>
    </div>
  {/if}

  <div>
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      required
      class="w-full px-6 py-5 rounded-full bg-neutral-900/80 border border-neutral-700 focus:border-[#00A0DE] focus:outline-none text-white placeholder-gray-500 text-lg transition"
    />
  </div>

  <div>
    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      required
      class="w-full px-6 py-5 rounded-full bg-neutral-900/80 border border-neutral-700 focus:border-[#00A0DE] focus:outline-none text-white placeholder-gray-500 text-lg transition"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    class="w-full bg-[#FF2800] hover:bg-[#ff451a] disabled:opacity-70 text-white font-bold text-xl py-5 rounded-full transition transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
  >
    {#if loading}
      <svg class="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-dasharray="60" stroke-dashoffset="20"/></svg>
      Starting your engine...
    {:else}
      Log In
    {/if}
  </button>

  <div class="text-center">
    <a href="/forgot" class="text-[#FF8000] hover:text-[#ffb84d] text-sm font-medium">Forgot password?</a>
  </div>
</form>