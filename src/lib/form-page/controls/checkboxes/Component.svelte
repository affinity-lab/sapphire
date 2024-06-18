<script lang="ts">
    import {CheckboxControl} from "./checkbox.js";
    import Control from "../Control.svelte"
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: { control: CheckboxControl, item: any, onChange: ChangeEventHandler<any> } = $props()
    let field = control.field;
    let name = control.field + Math.random();
</script>

<Control {control}>
    {#await control.getOptionsRecord() then options}
        {#each Object.entries(options) as [key, value]}
            <div>
                <input
                        type="checkbox"
                        bind:group={item[field]}
                        value={key}
                        name={name}
                        onchange={onChange}
                />
                <label>{value}</label>
            </div>
        {/each}
    {/await}
</Control>

<style lang="scss">
  @import "../inputs-style";
</style>