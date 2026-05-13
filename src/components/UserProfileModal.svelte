<script lang="ts">
  let { profile, isProfileModalOpen, closeProfileModal } = $props();

  let userProfileModal: HTMLDialogElement;

  const avatarUrl = $derived(
    `https://ui-avatars.com/api/?name=${profile?.username}&size=128`
  );

  $effect(() => {
    isProfileModalOpen
      ? userProfileModal.showModal()
      : userProfileModal.close();
  });
</script>

<dialog
  bind:this={userProfileModal}
  onclose={closeProfileModal}
  onclick={(e) => { if (e.target === userProfileModal) closeProfileModal(); }}
  class="fixed inset-0 m-auto h-fit w-full max-w-sm rounded-2xl bg-[#111111] border border-white/10 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm p-0"
>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-bold text-white tracking-wide">PROFILE</h2>
      <button
        onclick={closeProfileModal}
        aria-label="Close modal"
        class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="flex flex-col items-center text-center">
      <div class="w-24 h-24 rounded-xl overflow-hidden mb-4 ring-2 ring-[#FF2800]/50 shadow-lg shadow-[#FF2800]/20">
        <img src={avatarUrl} alt="Profile" class="w-full h-full object-cover" />
      </div>

      <h3 class="text-2xl font-black text-white tracking-tight">
        {profile?.username}
      </h3>

      <div class="mt-6 w-full pt-6 border-t border-white/10">
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">Member since</span>
          <span class="text-white font-medium">2026</span>
        </div>
      </div>
    </div>
  </div>
</dialog>
