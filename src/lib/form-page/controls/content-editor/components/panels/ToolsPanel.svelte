<script lang="ts">
    // export let pageHandler: PageHandler;
    // export let onDisplay;
    // export let exportPage: () => boolean;
    // export let closePage: () => void;

    import {
        handleFileChange,
        loadFromClipboard,
        saveToFile, selectedFile
    } from "$lib/form-page/controls/content-editor/load-content.js";
    import ButtonComponent from "$lib/common-ui/button/ButtonComponent.svelte";
    import {Button} from "$lib/common-ui/button/button.svelte.js";

    let {pageHandler, onDisplay, exportPage, closePage} = $props()

    function setVisible (to: boolean): void {
        for (let i of pageHandler.content) i.visible = to;
        pageHandler.refreshContent();
    }

    function showInvalid () {
        for (let i of pageHandler.content) i.visible = !i.valid;
        pageHandler.refreshContent();
    }
</script>

<aside>
    <p>Folding</p>
    <ul>
        <ButtonComponent button={new Button("Hide all", ()=>{setVisible(false)}).width("100%")} />
        <ButtonComponent button={new Button("Show all", ()=>{setVisible(true)}).width("100%")} />
        <ButtonComponent button={new Button("Show invalid", ()=>{showInvalid()}).width("100%")} />
    </ul>

    <p>View</p>
    <ul class="checkboxes">
        <li>
            <label>
                <input type="checkbox" bind:checked={onDisplay.files} />
                Files
            </label>
        </li>
        <li>
            <label>
                <input type="checkbox" bind:checked={onDisplay.editor} />
                Editor
            </label>
        </li>
        <li>
            <label>
                <input type="checkbox" bind:checked={onDisplay.render} />
                Render
            </label>
        </li>
        <li>
            <label>
                <input type="checkbox" bind:checked={onDisplay.json} />
                JSON
            </label>
        </li>
    </ul>

    <p>Import/Export</p>
    <div class="file">
        <label>
            <input class="file-input" type="file" on:change={(e)=>{handleFileChange(e,pageHandler)}}/>
            <span><i class="fa-regular fa-upload"></i></span>
        </label>
    </div>

    <ul>
        <ButtonComponent button={new Button("From Clipboard", ()=>{loadFromClipboard(pageHandler)}).width("100%")} />
        <ButtonComponent button={new Button("Save as...", ()=>{saveToFile(pageHandler)}).width("100%")} />
        <ButtonComponent button={new Button("Close", ()=>{exportPage()}).width("100%")} />
        <ButtonComponent button={new Button("Cancel", ()=>{closePage()}).width("100%")} />
    </ul>
</aside>


<style lang="scss">
  @import "$lib/lib/app.scss";
    aside {
      padding: 8px;
      background-color: $color-gray-0;
      max-width: 150px;
      height: 100%;
      p {
        font-variant: small-caps;
        margin: 0 0 8px 0;
        border-bottom: 1px solid white;
      }
      ul {
        padding: 0;
        margin: 0;
        > :global(*:not(:last-child)) {
          margin-bottom: 4px;
        }
      }
      div.file {
        width: 100%;
        border: 1px solid $color-gray-2;
        text-align: center;
        border-radius: 8px;
        label {
          padding: 8px;
          display: block;
          width: 100%;
          cursor: pointer;
        }
        input {
          display: none;
        }
      }
    }
</style>
