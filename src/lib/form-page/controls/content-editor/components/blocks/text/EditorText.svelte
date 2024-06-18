<script lang="ts">
    import {wordCounter} from "../../../word-counter";
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

    let charCountText: string;
    $effect(()=>charCountText = `
        ${config.options.minLength === 0 ? '' : 'min. '+ config.options.minLength.toString()+' < '}
        <strong>${data.text.length}</strong>
        ${config.options.maxLength === Infinity ? '' : ' < max. ' + config.options.maxLength.toString()}`)

    let wordCountText: string;
    $effect(()=> wordCountText = `
        ${config.options.minWords === 0 ? '' : 'min. '+ config.options.minWords.toString()+' < '}
        <strong>${wordCounter(data.text)}</strong>
        ${config.options.maxWords === Infinity ? '' : ' < max. '+ config.options.maxWords.toString()}`)
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <textarea class="textarea" on:dragstart={(e)=>e.stopImmediatePropagation()}
              bind:value={data.text}
              oninput={change}
    ></textarea>

    <svelte:fragment slot="closed-text">{data.text}</svelte:fragment>

    <svelte:fragment slot="info">
        {config.options.markdown ? 'Using markdown' : ''}
        <p><i>Characters:</i> {@html charCountText}</p>
        <p><i>Words:</i> {@html wordCountText}</p>
    </svelte:fragment>

</DefaultEditorComponent>


<style lang="scss">
    @import "$lib/form-page/controls/inputs-style.scss";

    textarea {
      width: 100%;
    }
</style>