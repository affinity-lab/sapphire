<script lang="ts">
    import {StringControl} from "./string.js";
    import Control from "../Control.svelte"
    import type {FormEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: {control: StringControl, item: any, onChange: FormEventHandler<any>} = $props()
    let field = control.field;

</script>

<Control {control}>
    <input type="text" bind:value={item[field]} oninput={onChange}/>
</Control>


<style lang="scss">
    @import "../inputs-style";
</style>