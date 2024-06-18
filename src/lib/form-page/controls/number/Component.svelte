<script lang="ts">
    import {NumberControl} from "./number.js";
    import Control from "../Control.svelte"
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: {control: NumberControl, item: any, onChange: ChangeEventHandler<any>} = $props()
    let field = control.field;

</script>

<Control {control}>
    <input type="number" bind:value={item[field]} onchange={onChange}/>
</Control>

<style lang="scss">
  @import "../inputs-style";


</style>
