<script lang="ts">
    import {CodeControl} from "./code.js";
    import Control from "../Control.svelte"
    import {onMount} from "svelte";
    //TODO
    import autosize from "svelte-autosize";

    let {control, item = $bindable(), onChange}: { control: CodeControl, item: any, onChange: Function } = $props()
    let field = control.field;
    let name = control.field + Math.random();

    let codeArea: HTMLTextAreaElement;

    onMount(() => codeArea.addEventListener('keydown', (e) => {
        if (e.key == 'Tab') {
            e.preventDefault();
            let start = codeArea.selectionStart;
            let end = codeArea.selectionEnd
            codeArea.value = codeArea.value.substring(0, start) + "\t" + codeArea.value.substring(end);
            codeArea.selectionStart = codeArea.selectionEnd = start + 1;
        }}))
</script>

<Control {control}>
    <textarea bind:this={codeArea} bind:value={item[field]} onchange={onChange} use:autosize/>
</Control>
<style lang="scss">
  @import "../inputs-style";
  textarea {
    outline: none;
    width: 100%;
    font-size: 12px;
    padding: 8px;
    overflow-y: auto !important;
    transition: height .3s;
    font-family: "Lucida Console", Courier, monospace !important;
    line-height: 16px;
    tab-size: 4;
    resize: none;
    &:not(:focus){
      max-height: 150px !important;
    }
  }
</style>