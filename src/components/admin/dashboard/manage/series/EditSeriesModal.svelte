<script lang="ts">


    let { series } = $props();
    let editSeriesModal: HTMLDialogElement;
    let editingSeries;

</script>

<button aria-label="Edit series {"seriesName"}" onclick={() => editSeriesModal.showModal()}>

</button>

<dialog bind:this={editSeriesModal}>
    <div class="fixed inset-0 flex items-center justify-center">
        <!-- Backdrop -->
        <button class="absolute inset-0 backdrop-blur-sm" onclick={() => (editSeriesModal.close())} aria-label="Close modal"></button>

        <div class="flex justify-between items-center bg-slate-800/50 px-4 py-3 rounded-xl">
        </div>
    </div>
</dialog>