<script lang="ts">
    import DefaultEditorComponent from "$lib/components/blocks/DefaultEditorComponent.svelte";
    import {type PageHandler} from "../../page-handler.svelte";

    import {type EditorData} from "./template";
    import type Template from "./template";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <!-- Very important to bind the value to the data -->
    <input type="text" class="input"
          bind:value={data.text}
          on:input={change}
    >

    <svelte:fragment slot="closed-text">
        This is the closed-text fragment
        {data.text}
    </svelte:fragment>

    <svelte:fragment slot="info">
        Any custom info you want to display
    </svelte:fragment>

    <svelte:fragment slot="custom-errors">
        Any custom error feedbacks you want to display on top of config.valid return
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
</style>