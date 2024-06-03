<script lang="ts">
    import {MarkdownControl} from "./markdown.js";
    import * as marked from "marked";
    //TODO import
    import autosize from "svelte-autosize";
    import Control from "../Control.svelte"

    let {control, item = $bindable(), onChange}: { control: MarkdownControl, item: any, onChange: Function } = $props()
    let field = control.field;
    if (!item[field]) item[field] = "";

</script>
<Control {control}>
    <div class="markdown">
        <textarea bind:value={item[field]} oninput={onChange} use:autosize/>
        <div>
            {@html marked.parse(item[field], {breaks: true})}
        </div>
    </div>
</Control>
<style lang="scss">
  @import "../inputs-style";

  .markdown {
    display: grid;
    gap: 8px;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    div {
      font-size: 14px;
      color: #fff9;
    }
  }

  :global(p) {
    padding: 0;
    margin: 0;
  }
  textarea {
    resize: vertical;
    outline: none;
    overflow-y: auto;
    transition: height .3s;
    font-family: "Lucida Console", Courier, monospace !important;
    line-height: 16px;
    font-size: 12px;
    &:not(:focus), &:not(:focus) + div {
      max-height: 150px !important;
      overflow-y: auto;
    }
  }
</style>
