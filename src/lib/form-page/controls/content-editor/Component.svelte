<script lang="ts">
    import Control from "$lib/form-page/controls/Control.svelte";
    import {onMount} from "svelte";
    import { ContentEditor} from "$lib/form-page/controls/content-editor/content-editor.js";

    let {control, item = $bindable(), onChange}: {control: ContentEditor, item: any, onChange: Function}= $props();
    let field = control.field;

    let files: any = $state();
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
        <!--TODO: Argument of type typeof ContentEditor is not assignable to parameter of type ConstructorOfATypedSvelteComponent-->
        <ContentEditor blocks={control.blocks}
                       value={item[field]}
                       files={files}
                       onsave={(e) => {item[field] = e.detail.content}}
        />
    {/if}
</Control>