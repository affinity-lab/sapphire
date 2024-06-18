<script lang="ts">
    import {ColorControl} from "./color.js";
    import Control from "../Control.svelte"
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: {control: ColorControl, item: any, onChange:  ChangeEventHandler<HTMLInputElement>} = $props()
    let field = control.field;

</script>

<Control {control}>
    <input class="color" type="color" bind:value={item[field]} onchange={onChange}/>
</Control>

<style lang="scss">
  @import "../inputs-style";
</style>
