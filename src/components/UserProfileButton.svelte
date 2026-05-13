<script lang="ts">
  import UserProfileModal from './UserProfileModal.svelte';

  let { profile } = $props();

  let isProfileModalOpen = $state(false);

  function openProfileModal() { isProfileModalOpen = true };
  function closeProfileModal() { isProfileModalOpen = false };


  const avatarUrl = $derived(
    `https://ui-avatars.com/api/?name=${profile?.username}&size=128`
  );
</script>

<button aria-label="Open User Profile Modal" onclick={openProfileModal} class="flex items-center space-x-2">
  <img src={avatarUrl} alt="Profile" class="w-12 h-12 rounded-md object-cover shadow-lg"/>
  <span class="text-base text-white/90 font-medium">
    {profile?.username}
  </span>
</button>

<UserProfileModal {profile} {isProfileModalOpen} {closeProfileModal} />