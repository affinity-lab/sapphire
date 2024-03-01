<script lang="ts">
    import ComponentAdder from "$lib/form-page/controls/content-editor/components/ComponentAdder.svelte";
    import {onMount} from "svelte";
    import Sortable from "sortablejs";

    let {pageHandler} = $props();
    let sorted: HTMLDivElement;

    onMount(() => {
        new Sortable(sorted, {
            animation: 300,
            // onEnd: (event) => {
            //     pageHandler.swap(event.oldIndex, event.newIndex);
            // },
            onEnd: (event) => {
                pageHandler.swap(event.oldIndex, event.newIndex);
            },
            handle: ".drag-handle"
        })
    })

</script>


<div class="reorder" bind:this={sorted}>
    {#each pageHandler.content as block, index (block.id)}
        <div>
            <ComponentAdder {pageHandler} {index}/>
            <div>
                <svelte:component
                        this={pageHandler.blocks[block.type].editor}
                        bind:data={block.data}
                        config={block.config}
                        {index}
                        {pageHandler}
                        bind:visible={block.visible}
                        bind:valid={block.valid}
                />
            </div>
        </div>
    {/each}
</div>
<ComponentAdder {pageHandler}/>

<style lang="scss">

</style>