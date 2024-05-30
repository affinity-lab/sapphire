<script>
    import Control from "$lib/form-page/controls/Control.svelte";
    import ContentEditor from "$lib/form-page/controls/content-editor/components/ContentEditor.svelte";
    import {onMount} from "svelte";

    let {control, item = $bindable(), onChange} = $props();
    let field = control.field;

    let files;
    let loaded = $state(false);

    async function loadData () {
        if (!control.files) files = {};
        else if (typeof control.files === "function") files = await control.files();
        else files = control.files;
        loaded = true;
    }

    onMount(() => loadData());
</script>

<Control {control}>
    {#if loaded}
        <ContentEditor blocks={control.blocks}
                       value={item[field]}
                       files={files}
                       on:save={(e) => {item[field] = e.detail.content}}
        />
    {/if}
</Control>