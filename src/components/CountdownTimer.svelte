<script lang="ts">
  import { onMount } from "svelte";

  let { targetTime } = $props();

  let remaining = $state("00d 00:00:00");

  function calculateCountdown() {
    const target = new Date(targetTime).getTime();
    const now = new Date().getTime();

    let diff = target - now;

    if (diff <= 0) {
      remaining = "00d 00:00:00";
      return;
    }

    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff %= 1000 * 60 * 60 * 24;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff %= 1000 * 60 * 60;

    const minutes = Math.floor(diff / (1000 * 60));
    diff %= 1000 * 60;

    const seconds = Math.floor(diff / 1000);

    remaining = `${String(day).padStart(2, "0")}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  onMount(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  });
</script>

<span class="text-3xl font-semibold text-indigo-300 tracking-wide">
  {remaining}
</span>