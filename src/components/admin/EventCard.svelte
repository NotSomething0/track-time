<script lang="ts">
    import EditEventModal from "./dashboard/manage/event/EditEventModal.svelte";
    import { type Event } from '../../types/database';

    let {eventData, onRemove, onEdit } = $props();

    let isEditModalOpen = $state(false)

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    async function eventModalSaved(event: Event) {
        isEditModalOpen = false;
        onEdit(event)
    }

    function handleClick(event: MouseEvent) {
        event.stopPropagation();

        isEditModalOpen = true;
    }
</script>

<EditEventModal event={eventData} onSave={eventModalSaved} isOpen={isEditModalOpen} onCancel={eventModalSaved}/>

<button
    class="event-card w-full text-left p-4 rounded-xl mb-2 flex flex-col cursor-pointer"
    aria-label={`Event: ${eventData.name}`}
    tabindex="0"
    onclick={handleClick} 
>
    <div class="flex flex-col w-full">
        <h4 class="text-lg font-semibold text-white">{eventData.name}</h4>

        <!-- Event Start Date (only once) -->
        <span class="text-sm text-slate-400">{formatDate(eventData.start_at)}</span>
    </div>
</button>

<style lang="css">
    .event-card {
        background-color: #2c3e50;
        padding: 1rem;
        border-radius: 1rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        cursor: pointer;
        transition: background-color 0.2s ease;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  /* Subtle shadow */
    }

    .event-card:hover,
    .event-card:focus {
        background-color: #374151;  /* Darker hover/focus effect */
    }

    .event-card h4 {
        font-size: 1.125rem;
        font-weight: 600;
    }

    .event-card .text-sm {
        color: #b0b0b0;
    }

    .event-card:focus {
        outline: none;
        box-shadow: 0 0 0 2px #e67e22;  /* Focus outline for accessibility */
    }

    .event-card .flex {
        display: flex;
        flex-direction: column; /* Stack content vertically */
    }
</style>