<script lang="ts">
    import DefaultEditorComponent from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Image URL</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field">
                <input class="input is-size-7" type="text" bind:value={data.imageUrl} on:input={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Title</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field">
                <input class="input is-size-7" type="text" bind:value={data.title} on:input={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Subtitle</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field">
                <input class="input is-size-7" type="text" bind:value={data.subtitle} on:input={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Content</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field">
                <textarea class="textarea" bind:value={data.text} on:input={change}></textarea>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Colors</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="color" placeholder="Background" bind:value={data.colors.background} on:input={change}/>
                <input class="input is-size-7" type="color" placeholder="Primary Text" bind:value={data.colors.primary} on:input={change}/>
                <input class="input is-size-7" type="color" placeholder="Secondary Text" bind:value={data.colors.secondary} on:input={change}/>
            </div>
        </div>
    </div>
</DefaultEditorComponent>



<style lang="scss">
    p.light {
      color: white;
    }
</style>