<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    import PreviewRender from "$lib/form-page/controls/content-editor/components/PreviewRender.svelte";
    import {ContentEditorPopup} from "$lib/form-page/controls/content-editor/content-editor-popup.js";
    import popupHandler from "$lib/popup/popup-handler.svelte.js";

    // export let blocks;
    // export let value: CleanDataType[];
    // export let title: string = "";
    // export let files: DataSource = {};

    let {blocks, value, files = {}} = $props()

    let popup = new ContentEditorPopup({
        blocks, content:value, files, save: ()=> save()
    })

    const dispatch = createEventDispatcher();
    function save(): void {
        dispatch('save', {
            content: popup.pageHandler.cleanData
        });
    }

</script>


<main onclick={()=>{popupHandler.open(popup)}}>
    <PreviewRender {blocks} content={value}/>
</main>


<style lang="scss">
  @import "$lib/lib/app.scss";

  main {
    background-color: $color-gray-0;
    border-radius: 8px;
    overflow: auto;
    width: 100%;
    cursor: pointer;
  }
</style>