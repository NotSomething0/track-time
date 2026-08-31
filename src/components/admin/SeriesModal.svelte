<script lang="ts">
  import SeriesEventList from "./SeriesEventList.svelte";

  let dialog: HTMLDialogElement;
  let mouseDownTarget: EventTarget | null = null;

  let {
    seriesData,
    show,
    closeModal,
    isEdit,
    seriesSaved,
  }: {
    seriesData: SeriesData | null;
    show: any;
    closeModal: any;
    isEdit: boolean;
    seriesSaved: any;
  } = $props();

  $effect(() => (show ? dialog.showModal() : dialog.close()));

  let id = $state<string | null>(null);
  let name = $state("");
  let description = $state("");

  $effect(() => {
    if (seriesData?.id) {
      id = seriesData.id ?? null;
      name = seriesData.name ?? "";
      description = seriesData.description ?? "";
    }
  });

  async function createOrUpdateSeries() {
    if (!name) {
      alert("Name cannot be empty");
      return;
    }

    if (!description) {
      alert("Description cannot be empty");
      return;
    }

    if (isEdit) {
      if (!id) {
        alert(
          `Can't save series ${name} the id is missing. Are you sure this series has been created?`,
        );
        return;
      }

      seriesSaved({ id, name, description });
    } else {
      seriesSaved(name, description );
    }

    closeModal();
  }
</script>

<dialog
  bind:this={dialog}
  onclose={closeModal}
  class="m-auto bg-[#111111] rounded-2xl min-w-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
  onclick={(e) => {
    if (e.target == dialog && mouseDownTarget == dialog) closeModal();
  }}
  onmousedown={(e) => (mouseDownTarget = e.target)}
>
  <h1 class="text-white text-2xl font-bold p-4">Editing {name}</h1>

  <form action="" class="bg-white/5 rounded-2xl mx-6 mb-6 p-4">
    <fieldset class="flex flex-col">
      <legend class="text-white font-bold text-center text-xl"
        >Series Information</legend
      >

      <label for="" class="text-white flex flex-col mb-1">
        Name:
        <input
          type="text"
          class="w-full px-4 py-2 rounded-xl bg-white/5 text-white focus:outline-none mt-1"
          bind:value={name}
        />
      </label>

      <label for="" class="text-white flex flex-col mb-1">
        Description:
        <textarea
          name=""
          id=""
          class="w-full px-4 py-2 rounded-xl bg-white/5 text-white focus:outline-none mt-1"
          bind:value={description}></textarea>
      </label>

      <label for="" class="text-white">
        Status:
        <select
          name=""
          id=""
          class="w-full px-4 py-2 rounded-xl bg-white/5 text-white focus:outline-none mt-1"
        >
          <option value="" class="text-black">Test</option>
          <option value="" class="text-black">Test</option>
          <option value="" class="text-black">Test</option>
          <option value="" class="text-black">Test</option>
        </select>
      </label>

      <label for="" class="text-white">
        Category:
        <select
          name=""
          id=""
          class="w-full px-4 py-2 rounded-xl bg-white/5 text-white focus:outline-none mt-1"
        >
          <option value="" class="text-black">Test</option>
          <option value="" class="text-black">Test</option>
          <option value="" class="text-black">Test</option>
          <option value="" class="text-black">Test</option>
        </select>
      </label>
    </fieldset>

    <div class="flex justify-end gap-3 pl-2 pt-3">
      <button
        type="button"
        onclick={closeModal}
        class="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-md text-white cursor-pointer"
        >Cancel</button
      >
      <button
        type="button"
        onclick={createOrUpdateSeries}
        class="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-md text-white cursor-pointer"
        >{isEdit ? "Save" : "Add"}</button
      >
    </div>
  </form>

  <!-- Events Section (Replaced table with EventSelectionCard) -->
  <!-- <SeriesEventList series={seriesData} /> -->
</dialog>
