<script lang="ts">
    export let show: boolean;
    export let closeModal: () => void;
    export let eventData: EventData;
    export let isEdit: boolean;
    export let save: (eventData: EventData) => void;

    let name = eventData?.name;
    let date = eventData?.date;

    function handleSave() {
        save({ ...eventData, name, date });
        closeModal();
    }
</script>

<div class="modal" class:open={show}>
    <div class="modal-content">
        <h3>{isEdit ? 'Edit Event' : 'Add Event'}</h3>
        <input type="text" bind:value={name} placeholder="Event Name" />
        <input type="date" bind:value={date} />
        <button on:click={handleSave}>Save</button>
        <button on:click={closeModal}>Cancel</button>
    </div>
</div>