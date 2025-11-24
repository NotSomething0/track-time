<script lang="ts">
  const REGISTER_URL = "/api/auth/register";
  let email = $state('');
  let password = $state('');
  let loading = $state(false);
  let registrationError = $state<string | null>(null);

  async function handleSubmit(event: Event) {
    event.preventDefault();

    loading = true;
    registrationError = null;

    try {
      const response = await fetch(REGISTER_URL, {
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
      registrationError = message;

    } catch (exception) {
      registrationError = "A network error occured. Check your connection and try again."
    } finally {
      loading = false;
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-6">
  {#if registrationError}
    <div class="animate-fade-in">
      <div class="mx-4 p-5 rounded-2xl bg-red-950/60 border border-red-500/50 backdrop-blur-sm shadow-2xl shadow-red-900/20">
        <div class="flex items-center justify-center gap-3">
          <svg class="w-6 h-6 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01"/>
          </svg>
          <p class="text-red-200 font-medium text-lg tracking-tight">
            {registrationError}
          </p>
        </div>
      </div>
    </div>
  {/if}

  <div>
    <input
      type="email"
      bind:value={email}
      placeholder="email"
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
      Reving up your account...
    {:else}
      Create Free Account
    {/if}
  </button>

  <p class="text-xs text-gray-500 text-center">
    By signing up, you agree to our <a href="/terms" class="text-[#00A0DE] hover:underline">Terms</a> and <a href="/privacy" class="text-[#00A0DE] hover:underline">Privacy Policy</a>.
  </p>
</form>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 0.4s ease-out forwards;
  }
</style>