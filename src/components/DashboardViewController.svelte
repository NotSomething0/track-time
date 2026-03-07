<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import type { Snippet } from "svelte";

    // Define the props to include your named slots as Snippets
    // This tells TypeScript: "I expect these specific pieces of content"
    let { dashboard, discover }: { dashboard: Snippet, discover: Snippet } = $props();

    let current = $state("dashboard"); // Using Svelte 5 $state rune
    const views = ["dashboard", "discover"];

    function updateView() {
        const hash = window.location.hash.replace("#", "") || "dashboard";
        current = views.includes(hash) ? hash : "dashboard";
    }

    onMount(() => {
        updateView();
        window.addEventListener("hashchange", updateView);
        return () => window.removeEventListener("hashchange", updateView);
    });
</script>

<div class="w-full relative min-h-[60vh]">
    <div class="absolute inset-0">
        {#if current === "dashboard"}
        <div transition:fade={{ duration: 180 }} class="absolute inset-0">
            {@render dashboard()}
        </div>
        {/if}

        {#if current === "discover"}
        <div transition:fade={{ duration: 180 }} class="absolute inset-0">
            {@render discover()}
        </div>
        {/if}
    </div>
</div>