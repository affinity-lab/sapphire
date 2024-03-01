<script lang="ts">
    import {SelectControl} from "./select.js";
   import Control from "../Control.svelte"

    let {control, item, onChange}: { control: SelectControl, item: any, onChange: Function } = $props()
    let field = control.field;
    let name = control.field + Math.random();
</script>


<Control {control}>
    {#await control.getOptionsRecord() then options}
        <select on:change={onChange} class:row={control.layout==="row"} class:column={control.layout==="column"} bind:value={item[field]} required>
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