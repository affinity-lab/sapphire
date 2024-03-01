<script lang="ts">

    let {blocks, content} = $props();
</script>

<div>
    {#each content as block}
        <svelte:component
                this={blocks[block.type].previewRenderer || blocks[block.type].renderer}
                data={block.data}
                preview={true}
        />
    {/each}
</div>

<style lang="scss">
    div {
      min-height: 100px;
      max-height: 300px;
    }
</style>