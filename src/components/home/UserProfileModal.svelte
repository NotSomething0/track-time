<script lang="ts">
    let {
        name = "User",
        email = "",
        avatar = "",
        phone = "",
        address = "",
        birthday = "",
        open = false,
        onClose = () => {}
    } = $props();

    let userProfileModal: HTMLDialogElement;

    function closeModal() {
        onClose();
    }

    const avatarUrl = $derived(
        avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128`
    );

    $effect(() => {
        if (!userProfileModal) return;
        open 
            ? !userProfileModal.open && userProfileModal.showModal() 
            : userProfileModal.open && userProfileModal.close();
    });

    function handleDialogClose() {
        closeModal();
    }
</script>

<dialog
  bind:this={userProfileModal}
  onclose={handleDialogClose}
  class="modal-depth p-0 rounded-2xl border-0 overflow-hidden"
>
  <div class="main-container flex flex-col gap-6 p-8 min-w-[320px]">
    
    <h2 class="text-xl font-bold text-slate-100 tracking-tight">User Profile</h2>

    <div class="avatar-card flex items-center gap-4 p-4 rounded-xl">
      <div class="avatar-ring">
        <img src={avatarUrl} alt="Profile" class="w-16 h-16 rounded-lg object-cover" />
      </div>
      <div>
        <p class="text-lg font-bold text-white leading-tight">{name}</p>
        <p class="text-xs text-slate-400 font-medium uppercase tracking-wider">{email}</p>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="field-group">
        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" bind:value={phone} placeholder="Enter phone..." />
      </div>

      <div class="field-group">
        <label for="address">Address</label>
        <input type="text" id="address" bind:value={address} placeholder="Enter address..." />
      </div>
    </div>

    <div class="flex justify-end gap-3 mt-4">
      <button onclick={closeModal} class="btn-secondary">
        Cancel
      </button>
      <button onclick={closeModal} class="btn-primary">
        Save Changes
      </button>
    </div>
  </div>
</dialog>

<style>
  /* Base elevation - The darkest shade */
  .modal-depth {
    background: #0f172a; /* Slate 950 */
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    color: #f8fafc;
  }

  /* Raised card effect for the header area */
  .avatar-card {
    background: #1e293b; /* Slate 800 - Lighter than background */
    border-top: 1px solid #334155; /* Highlight on the top edge */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
  }

  /* Avatar border depth */
  .avatar-ring {
    padding: 2px;
    background: linear-gradient(to bottom, #475569, #0f172a);
    border-radius: 10px;
  }

  /* In-set input effect (Sunken) */
  .field-group label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 0.5rem;
    margin-left: 0.25rem;
  }

  .field-group input {
    width: 100%;
    background: #020617; /* Darkest shade - looks hollowed out */
    border: 1px solid #1e293b;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: white;
    transition: border-color 0.2s;
  }

  .field-group input:focus {
    outline: none;
    border-color: #38bdf8; /* Sky blue highlight on focus */
    box-shadow: 0 0 0 1px #38bdf8;
  }

  /* Buttons */
  .btn-primary {
    background: #38bdf8;
    color: #0f172a;
    font-weight: 700;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    box-shadow: 0 4px 0px 0px #0369a1; /* 3D bottom edge */
    transition: transform 0.1s;
  }

  .btn-primary:active {
    transform: translateY(2px);
    box-shadow: 0 2px 0px 0px #0369a1;
  }

  .btn-secondary {
    background: transparent;
    color: #94a3b8;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
  }

  .btn-secondary:hover {
    background: #1e293b;
    color: white;
  }

  /* Dialog Backdrop */
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
  }
</style>