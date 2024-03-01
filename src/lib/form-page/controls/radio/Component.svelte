<script lang="ts">
    import {RadioControl} from "./radio.js";
   import Control from "../Control.svelte"

    let {control, item, onChange}: { control: RadioControl, item: any, onChange: Function } = $props()
    let field = control.field;
    let name = control.field + Math.random();
</script>

<Control {control}>
    {#await control.getOptionsRecord() then options}
        {#each Object.entries(options) as [key, value]}
            <div>
                <input type="radio" bind:group={item[field]} value={key} name={name} on:change={onChange}/>
                <label>{value}</label>
            </div>
        {/each}
    {/await}
</Control>

<style lang="scss">
  @import "../inputs-style";
</style>