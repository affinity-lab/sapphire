<script lang="ts">
    import {flip} from 'svelte/animate';

    let {pageHandler} = $props();
</script>

<main>
    {#each pageHandler.content as block (block.id)}
        <div animate:flip={{duration:300}}>
            <div class="is-divider my-5" data-content={block.config.label}></div>
            <svelte:component
                    this={pageHandler.blocks[block.type].renderer}
                    data={block.data}
                    preview={false}
            />
        </div>
    {/each}
</main>

<style lang="scss">
    main {
        margin: 8px;
    }
</style>