<script lang="ts">
  import UserProfileDialog from "./UserProfileModal.svelte";

  let {
    name = "User",
    email = "",
    avatar = ""
  } = $props();

  let open = $state(false);

  function openDialog() {
    open = true;
  }

  function closeDialog() {
    open = false;
  }

  const avatarUrl = $derived(
    avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128`
  );
</script>

<div class="flex items-center gap-4 flex-wrap md:flex-nowrap">
  <button
    onclick={openDialog}
    class="flex items-center gap-3 p-1.5 pr-4 rounded-xl hover:bg-white/10 transition-all duration-300 w-full sm:w-auto active:scale-98"
  >
    <img
      src={avatarUrl}
      alt="Profile"
      class="w-9 h-9 rounded-lg object-cover shadow-lg"
    />

    <div class="hidden md:flex flex-col text-left leading-tight">
      <span class="text-sm text-white/90 font-medium">
        {name}
      </span>
      <span class="text-xs text-white/40">
        {email}
      </span>
    </div>
  </button>
</div>

<UserProfileDialog
  {name}
  {email}
  {avatar}
  {open}
  onClose={closeDialog}
/>