<script lang="ts">
    import {PageHandler} from "./page-handler.svelte";
    import {createEventDispatcher} from "svelte";
    import ToolsPanel from "$lib/form-page/controls/content-editor/components/panels/ToolsPanel.svelte";
    import FilesPanel from "$lib/form-page/controls/content-editor/components/panels/FilesPanel.svelte";
    import EditorPanel from "$lib/form-page/controls/content-editor/components/panels/EditorPanel.svelte";
    import RenderPanel from "$lib/form-page/controls/content-editor/components/panels/RenderPanel.svelte";
    import JsonPanel from "$lib/form-page/controls/content-editor/components/panels/JsonPanel.svelte";
    import SC_Popup from "$lib/popup/SC_Popup.svelte";
    import type {ContentEditorPopup} from "$lib/form-page/controls/content-editor/content-editor-popup";


    let {popup}: { popup: ContentEditorPopup } = $props();
    let blocks = popup.data.blocks;
    let content = popup.data.content || [];
    let files = popup.data.files || {};


    let pageHandler: PageHandler = popup.pageHandler

    const dispatch = createEventDispatcher();


    let onDisplay: { editor: boolean, render: boolean, json: boolean, files: boolean } = $state({
        editor: true,
        render: true,
        json: false,
        files: false
    });

    function exportPage() {
        if (pageHandler.isAllValid) {
            dispatch("export", {
                content: pageHandler.cleanData
            })
        } else {
            let decision = confirm("Not all components are valid! You can't export now! Check it with 'Show invalid'! Use 'Save as...' to save your temporary work! Do you want to cancel and discard changes?")
            if (decision) {
                closePage();
            }
        }
    }

    function closePage() {
        dispatch("close");
    }

</script>

<SC_Popup {popup}>
    <main>
        <section class="narrow">
            <ToolsPanel {pageHandler} bind:onDisplay {exportPage} {closePage}/>
        </section>

        {#if onDisplay.files}
            <section class="narrow">
                <FilesPanel {files}/>
            </section>
        {/if}

        {#if onDisplay.editor}
            <section>
                <EditorPanel {pageHandler}/>
            </section>
        {/if}

        {#if onDisplay.render}
            <section>
                <RenderPanel {pageHandler}/>
            </section>
        {/if}

        {#if onDisplay.json}
            <section>
                <JsonPanel {pageHandler}/>
            </section>
        {/if}
    </main>
</SC_Popup>

<style lang="scss">
  @import "$lib/lib/app.scss";

  main {
    display: flex;
    height: 100%;
    max-height: 100%;
    overflow: hidden;

    section:not(.narrow) {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0;
    }

    section {
      overflow-y: auto;
      flex: none;
    }
  }
</style>

