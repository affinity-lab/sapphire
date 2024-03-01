<script lang="ts">
    import toastHandler from "$lib/common-ui/toast/toast-handler.svelte.js";
    import {copy} from "$lib/lib/clipboard.js";

    let {pageHandler} = $props();
</script>

<div class="json m-0">
            <pre title="Copy" on:click={()=>{
                copy(JSON.stringify(pageHandler.cleanData));
                toastHandler.addToast("success",'JSON copied to clipboard')
            }}>{JSON.stringify(pageHandler.cleanData, null, 2)}</pre>
</div>

<style lang="scss">
  @import "$lib/lib/app.scss";
  .json {
    background-color: $color-gray-0;
    border-radius: 8px;
    margin: 8px;
    padding: 8px;
  }
  pre {
    white-space: pre-wrap;
    word-break: break-word;
    cursor: pointer;
    font-family: "Lucida Console", Courier, monospace !important;
    font-size: 12px;

  }
</style>