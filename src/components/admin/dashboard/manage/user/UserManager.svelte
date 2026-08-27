<script lang="ts">
  import type { Profile } from "../../../../../types/database";
  import { onMount } from "svelte";
  import { actions } from "astro:actions";

  let loadingProfiles = $state(true);
  let profiles: Profile[] = $state([]);
  let editUserModal: HTMLDialogElement;
  let searchQuery = $state("");
  let currentPage = $state(1);
  let editingUser = $state<any>({
    user_id: "",
    username: "",
    is_admin: false,
    permissions: "admin",
  });
  let totalPages = $state(1);

  function openEditUserModal(user: any) {
    console.log("opening");
    editingUser = { ...user };
    editUserModal.showModal();
  }

  function saveUserChanges() {
    console.error("Not implemented");
  }

  function deleteUser(id: string) {
    console.error("Not implemented");
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  onMount(async () => {
    const { data, error } = await actions.administration.getAllProfiles({
      username: "",
    });

    if (error) {
      loadingProfiles = false;
      return;
    }

    profiles = data;
    loadingProfiles = false;
  });
</script>

<div class="bg-[#111111] border border-white/10 p-6 w-screen">
  <h1 class="text-xl font-bold text-white mb-2">User Manager</h1>

  <input
    type="text"
    name="searchUsers"
    placeholder="Search users..."
    bind:value={searchQuery}
    class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 mb-4 focus:outline-none"
  />

  <div class="border border-white/10 rounded-2xl bg-white/2">
    <table class="w-full">
      <thead>
        <tr class="text-gray-400 uppercase font-semibold">
          <th class="p-4">Username</th>
          <th class="p-4">Admin</th>
          <th class="p-4">User ID</th>
          <th class="p-4">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-200">
        {#if loadingProfiles}
          <tr>
            <td
              colspan="4"
              class="p-3 text-center text-white border-t border-white/5"
            >
              Loading profiles...
            </td>
          </tr>
        {:else if profiles.length < 1}
          <tr>
            <td
              colspan="4"
              class="p-3 text-center text-white border-t border-white/5"
            >
              No profiles could be found, try adjusting your filter settings.
            </td>
          </tr>
        {:else}
          {#each profiles as user (user.user_id)}
            <tr class="border-t border-white/5">
              <th class="font-medium text-white">
                {user.username}
              </th>
              <td class="text-center">
                <span
                  class="px-2 py-1 rounded-md bg-[#00A0DE]/10 text-[#00A0DE] text-xs border border-[#00A0DE]/20"
                >
                  {user.is_admin ? "Yes" : "No"}
                </span>
              </td>
              <td class="text-center">{user.user_id}</td>
              <td class="flex flex-col items-center">
                <button
                  onclick={() => openEditUserModal(user)}
                  class="text-white cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md px-8 py-2 m-2"
                >
                  Edit
                </button>
                <button
                  onclick={() => deleteUser(user.user_id)}
                  class="text-white cursor-pointer bg-red-500 hover:bg-red-600 rounded-md px-5 py-2 mb-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  <div class="flex justify-between items-center mt-6">
    <p class="text-gray-500 text-sm">
      Page {currentPage} of {totalPages || 1}
    </p>
    <div class="flex gap-3">
      <button
        onclick={prevPage}
        disabled={currentPage === 1}
        class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>
      <button
        onclick={nextPage}
        disabled={currentPage >= totalPages}
        class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Next
      </button>
    </div>
  </div>
</div>

<dialog
  bind:this={editUserModal}
  onclick={(e) => {
    if (e.target === editUserModal) editUserModal.close();
  }}
  class="fixed inset-0 m-auto h-fit w-full max-w-md rounded-2xl bg-[#111111] border border-white/10 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm p-0"
>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-bold text-white tracking-wide">EDIT USER</h2>
      <button
        onclick={() => editUserModal.close()}
        aria-label="Close modal"
        class="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div class="space-y-4">
      <div>
        <label class="block text-gray-500 text-sm mb-2">
          Username
          <input
            bind:value={editingUser.username}
            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF8000]/50 transition"
            name="newUsername"
          />
        </label>
      </div>
      <div>
        <label class="block text-gray-500 text-sm mb-2">
          Admin
          <select
            name="newAdminValue"
            bind:value={editingUser.is_admin}
            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#FF8000]/50 transition"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </label>
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-8">
      <button
        onclick={() => editUserModal.close()}
        class="px-4 py-2 text-gray-400 hover:text-white transition"
      >
        Cancel
      </button>
      <button
        onclick={saveUserChanges}
        class="px-6 py-2 bg-linear-to-r from-[#FF2800] to-[#FF8000] text-white rounded-xl font-bold hover:from-[#ff451a] hover:to-[#ff9f33] transition shadow-lg shadow-[#FF2800]/20"
      >
        Save Changes
      </button>
    </div>
  </div>
</dialog>
