<script>
    import Control from "$lib/form-page/controls/Control.svelte";
    import ContentEditor from "$lib/form-page/controls/content-editor/components/ContentEditor.svelte";

    let {control, item, onChange} = $props();
    let field = control.field;
</script>

<Control {control}>
    <ContentEditor blocks={control.blocks}
                   value={item[field]}
                   files={control.files}
                   on:save={(e) => {item[field] = e.detail.content}}
    />
</Control>