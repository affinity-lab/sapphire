<script lang="ts">
    import {flip} from 'svelte/animate'
    // import {dndzone} from "svelte-dnd-action";
    import {v4 as uuidv4} from 'uuid';
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";
    import ImageComponent from "$lib/form-page/controls/content-editor/components/blocks/image/ImageComponent.svelte";


    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

    function handleDnd (e): void {
        data.images = e.detail.items;
        pageHandler.refreshContent();
    }

    function addImage () {
        let newImg = structuredClone(config.emptyGalleryImage);
        newImg.id = uuidv4();
        data.images = [...data.images, newImg];
        change();
    }
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="field m-0 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-small">Title </label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input class="input is-small" type="text" bind:value={data.title} oninput={change}/>
                </div>
            </div>
        </div>
    </div>

    <div class="images"
         use:dndzone={{items: data.images, type: "gallery"}}
         on:consider={handleDnd}
         on:finalize={handleDnd}
    >
        {#each data.images as img, index (img.id)}
            <div class="image-item-container" animate:flip={{duration:300}}>
                <ImageComponent data={img} {change} short={true}/>
                <button class="button is-small is-outlined delete-button is-fullwidth" onclick={()=>{data.images.splice(index, 1);change()}}>
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        {/each}
    </div>
    <button class="button is-small is-outlined my-2" onclick={addImage}>
        <i class="bi bi-plus"></i>
    </button>

    <svelte:fragment slot="closed-text">
        {data.title} - {data.images.length} images
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
  p {
    color: red;
  }
  .image-item-container {
    position: relative;
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 10px;
  }
  .images {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
    justify-content: space-evenly;
  }
</style>