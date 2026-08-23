<script lang="ts">
  import type { Series } from "../../types/database";

  let {
    show,
    seriesToDelete,
    closeModal,
    confirmDelete,
  }: {
    show: boolean;
    seriesToDelete: Series | null;
    confirmDelete: () => void;
    closeModal: () => void;
  } = $props();

  let deleteConfirmationModal: HTMLDialogElement;

  $effect(() =>
    show ? deleteConfirmationModal.show() : deleteConfirmationModal.close(),
  );
</script>

<dialog bind:this={deleteConfirmationModal}>
  <div class="fixed inset-0 flex items-center justify-center">
    <button
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onclick={closeModal}
      aria-label="Close modal"
      type="button"
    ></button>

    <div
      class="relative bg-[#111111] border border-white/10 rounded-2xl p-8"
    >
      <h1 class="text-center text-red-600 text-2xl font-bold">Confirm Deletion</h1>
      <p class="text-white mt-4">
        Are you sure you want to delete <strong>{seriesToDelete?.name}</strong>?
      </p>
      <p class="text-center text-white uppercase">⚠️This action is irreversible⚠️</p>

      <div class="mt-6 flex justify-between">
        <button
          onclick={() => closeModal()}
          class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onclick={() => {
            confirmDelete();
            closeModal();
          }}
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</dialog>
