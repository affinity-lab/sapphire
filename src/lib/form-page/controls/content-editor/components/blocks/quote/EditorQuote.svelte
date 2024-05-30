<script lang="ts">
    import autosize from "svelte-autosize";
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";


    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <textarea class="textarea"
              use:autosize
              bind:value={data.text}
              oninput={change}
    ></textarea>
    <input type="text" class="input"
           placeholder="Author"
           bind:value={data.author}
           oninput={change}
    >
</DefaultEditorComponent>


<style lang="scss">
</style>