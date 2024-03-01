<script lang="ts">

    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";
    import ImageComponent
        from "$lib/form-page/controls/content-editor/components/blocks/image/ImageComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <ImageComponent bind:data {change}/>

    <svelte:fragment slot="closed-text">
        Title: {data.title}, Alt: {data.alt}, Url: {data.url}
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
    p {color: red;}
</style>