<script lang="ts">
    import type { Profile } from '../../../types/database';

    let { profiles }: { profiles: Profile[] } = $props(); 

    let userManager: HTMLDialogElement;
    let userModal: HTMLDialogElement;

    let showEditUserModal = $state(false);
    let searchQuery = $state('');
    let currentPage = $state(1);
    const usersPerPage = 5;

    // We'll track which user is currently being edited
    let editingUser = $state<any>({
        user_id: "",
        username: "",
        is_admin: false,
        permissions: "admin"
    });

    // Derived filtering logic
    let filteredUsers = $derived(
        profiles.filter(profile => profile.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    let paginatedUsers = $derived(
        filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
    );

    let totalPages = $derived(Math.ceil(filteredUsers.length / usersPerPage));

    function openEditUserModal(user: any) {
        // Create a shallow copy so changes don't apply until we "Save"
        editingUser = { ...user };
        userModal.showModal();
    }

    function saveUserChanges() {
        const index = profiles.findIndex(u => u.id === editingUser.id);
        if (index !== -1) {
            profiles[index] = editingUser;
        }
        userModal.close();
    }

    function deleteUser(id: number) {
        profiles = profiles.filter(u => u.id !== id);
    }
</script>

<button onclick={() => userManager.showModal()} class="p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
    <h1 class="text-lg font-bold text-white">Manage Users 👥</h1>
    <p class="text-slate-400 text-sm mt-1">View and edit user permissions in a table view.</p>
</button>


<dialog bind:this={userManager}>
    <div class="fixed inset-0 flex items-center justify-center z-1">
        <!-- Backdrop -->
        <button class="absolute inset-0 backdrop-blur-sm" aria-label="Close modal" onclick={() => userManager.close()}></button>

        <!-- Modal -->
        <div class="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl p-8 shadow-2xl flex flex-col">
            <header class="flex justify-between items-center mb-5">
                <h1 class="text-2xl text-white font-bold">User Manager</h1>
                <button onclick={() => userManager.close()} class="text-red-700 hover:text-red-500" aria-label="Close User Manager">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                </button>
            </header>

            <input 
                type="text" 
                placeholder="Search by name" 
                bind:value={searchQuery}
                class="w-full mb-6 p-3 rounded-xl border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div class="border border-slate-700 rounded-xl bg-slate-800/50">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-800 text-slate-300 uppercase text-xs font-semibold">
                            <th class="p-4">User</th>
                            <th class="p-4">Permissions</th>
                            <th class="p-4">Status</th>
                            <th class="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-slate-200">
                        {#each paginatedUsers as user (user.user_id)}
                            <tr class="border-t border-slate-700 hover:bg-slate-700/30 transition-colors">
                                <td class="p-4">
                                    <div class="font-medium text-white">{user.username}</div>
                                </td>
                                <td class="p-4">
                                    <span class="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs border border-blue-500/20">
                                        {user.is_admin}
                                    </span>
                                </td>
                                <td class="p-4 text-sm">{user.user_id}</td>
                                <td class="p-4 text-right space-x-3">
                                    <button onclick={() => openEditUserModal(user)} class="text-blue-400 hover:underline">Edit</button>
                                    <button onclick={() => deleteUser(user.id)} class="text-red-400 hover:underline">Delete</button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>

            <div class="flex justify-between items-center mt-6">
                <p class="text-slate-400 text-sm">Showing page {currentPage} of {totalPages || 1}</p>
                <div class="flex gap-2">
                    <button 
                        onclick={() => currentPage--} 
                        disabled={currentPage === 1}
                        class="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 hover:bg-slate-700 transition-colors">
                        Back
                    </button>
                    <button 
                        onclick={() => currentPage++} 
                        disabled={currentPage >= totalPages}
                        class="px-4 py-2 bg-slate-800 text-white rounded-lg disabled:opacity-50 hover:bg-slate-700 transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</dialog>

<dialog bind:this={userModal}>
    <div class="fixed inset-0 z-2 flex items-center justify-center p-4 bg-black/80">
        <div class="bg-slate-800 border border-slate-700 p-8 rounded-3xl w-full max-w-md shadow-2xl">
            <h3 class="text-xl font-bold text-white mb-6">Edit User Profile</h3>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-slate-400 text-sm mb-1">Username
                        <input bind:value={editingUser.username} class="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
                    </label>
                </div>
                <div>
                    <label class="block text-slate-400 text-sm mb-1">Admin
                        <input bind:value={editingUser.is_admin} class="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white" />
                    </label>
                </div>
                <div>
                    <!--@todo: Make sure we can't edit our own permissions  -->
                    <label class="block text-slate-400 text-sm mb-1">Admin
                        <select
                            bind:value={editingUser.permissions} class="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white">
                            <option selected={editingUser.is_admin || null} value={true}>true</option>
                            <option selected={!editingUser.is_admin || null} value={false}>false</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="flex justify-end mt-8 gap-3">
                <button onclick={() => {userModal.close()}} class="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                <button onclick={saveUserChanges} class="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500">Save Changes</button>
            </div>
        </div>
    </div>
</dialog>