<script lang="ts">

    import FileDropZone from "$lib/form-page/controls/content-editor/components/FileDropZone.svelte";
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <!-- Very important to bind the value to the data -->
    <FileDropZone bind:files={data.files} on:change={change} maxFileCount={3}/>

    <svelte:fragment slot="closed-text">
        Uploaded {data.files.length} file{data.files.length===1?'':'s'}
    </svelte:fragment>

    <svelte:fragment slot="info">
        3 files can be uploaded at most!
    </svelte:fragment>
</DefaultEditorComponent>

