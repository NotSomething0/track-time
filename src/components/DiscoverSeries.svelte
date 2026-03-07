<script lang="ts">
    let { series = [] } = $props();

    let search = $state("");

    function toggleFollow(item) {
        item.following = !item.following;
    }

    const filteredSeries = $derived(
        series.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
        )
    );
    </script>

    <section class="space-y-6">

    <!-- Search -->
    <div>
        <input
        type="text"
        placeholder="Search series..."
        bind:value={search}
        class="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition"
        />
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-5">

        {#each filteredSeries as item (item.id)}
        <div class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:bg-white/10 transition">

            <div class="flex justify-between items-start">

            <div>
                <h4 class="text-white font-semibold text-lg">
                {item.name}
                </h4>

                <p class="text-sm text-gray-400 mt-2">
                {item.description}
                </p>

                <p class="text-xs text-gray-500 mt-3">
                {item.followers.toLocaleString()} followers
                </p>
            </div>

            <button
                onclick={() => toggleFollow(item)}
                class={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                item.following
                    ? "bg-indigo-500 text-white"
                    : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
            >
                {item.following ? "Following" : "Follow"}
            </button>

            </div>

        </div>
        {/each}

    </div>

</section>