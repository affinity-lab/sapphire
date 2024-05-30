<script lang="ts">
    import {flip} from 'svelte/animate';
    import RenderedImage from "$lib/form-page/controls/content-editor/components/blocks/image/RenderedImage.svelte";

    let {data, preview} = $props();

</script>

<div class="box">
    <h1 class="subtitle">{data.title}</h1>
    <div class="gallery">
        {#if !preview}
            {#each data.images as img (img.id)}
                <div class="image" animate:flip={{duration: 300}}>
                    <RenderedImage data={img} />
                </div>
            {/each}
        {:else}
            {#each data.images as img}
                <div class="image">
                    <RenderedImage data={img} />
                </div>
            {/each}
        {/if}
    </div>
</div>

<style lang="scss">
    .gallery {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      align-content: space-evenly;
      gap: 10px;
    }
    .image {
      min-width: 150px;
      max-width: 200px;
      flex-shrink: 1;
    }
</style>