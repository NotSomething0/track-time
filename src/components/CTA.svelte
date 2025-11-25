<!-- src/components/CTA.svelte -->
<script>
  import '../styles/global.css';
  let email = '';
  let submitted = false;

  const handleSubmit = () => {
    if (email.includes('@')) {
      submitted = true;
      setTimeout(() => submitted = false, 4000);
      email = '';
    }
  };
</script>

<section id="waitlist" class="py-32 px-6 bg-linear-to-t from-black to-neutral-900">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-5xl md:text-7xl font-black mb-6">
      Be the First When We Launch
    </h2>
    <p class="text-2xl text-gray-400 mb-12">
      Early supporters get lifetime <span class="text-[#FF8000] font-bold">20% off</span> + exclusive founder badge.
    </p>

    {#if !submitted}
      <form on:submit|preventDefault={handleSubmit} class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <input
          type="email"
          bind:value={email}
          placeholder="your@email.com"
          required
          class="flex-1 px-6 py-5 rounded-full text-black text-lg focus:outline-none focus:ring-4 focus:ring-[#FF2800]"
        />
        <button
          type="submit"
          class="bg-[#FF2800] hover:bg-[#ff451a] text-white font-bold px-10 py-5 rounded-full transition transform hover:scale-105 shadow-2xl"
        >
          Join Waitlist
        </button>
      </form>
    {:else}
      <p class="text-3xl font-bold text-[#00A0DE]">You're in! 🚀 Check your email soon.</p>
    {/if}

    <p class="mt-8 text-gray-500">No spam. Unsubscribe anytime. We respect your inbox.</p>
  </div>
</section>