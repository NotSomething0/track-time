<script lang="ts">
    let { show, closeModal, confirmDelete, seriesName }:
        {show:boolean, confirmDelete: () => void, closeModal: () => void, seriesName: string } 
    = $props();

    let modal: HTMLDialogElement;
</script>

<dialog bind:this={modal}>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <button
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onclick={closeModal}
            aria-label="Close modal"
            type="button"
        ></button>

        <!-- Panel -->
        <div class="relative bg-slate-900 border border-white/10 rounded-3xl w-full max-w-xs p-8 shadow-2xl">
            <h3 class="text-xl font-bold text-white">Confirm Deletion</h3>
            <p class="text-slate-400 mt-4">Are you sure you want to delete the series <strong>{seriesName}</strong>?</p>
            
            <div class="mt-6 flex justify-between">
                <button
                    onclick={closeModal}
                    class="px-4 py-2 bg-slate-600 text-white rounded-lg"
                >
                    Cancel
                </button>
                <button
                    onclick={() => { confirmDelete(); closeModal(); }}
                    class="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                    Confirm
                </button>
            </div>
        </div>
    </div>
</dialog>
