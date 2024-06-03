<script lang="ts">
    import {SelectControl} from "./select.js";
    import Control from "../Control.svelte"
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: { control: SelectControl, item: any, onChange:  ChangeEventHandler<HTMLSelectElement> } = $props()
    let field = control.field;
    let name = control.field + Math.random();
</script>


<Control {control}>
    {#await control.getOptionsRecord() then options}
        <select onchange={onChange} class:row={control.layout==="row"} class:column={control.layout==="column"} bind:value={item[field]} required>
            {#each Object.entries(options) as [key, value]}
                <option value={key}>{value}</option>
            {/each}
        </select>
    {/await}
</Control>
<style lang="scss">
  @import "../inputs-style";

  .container {
    padding: 16px;
  }

  select {
    outline: none;
  }
</style>