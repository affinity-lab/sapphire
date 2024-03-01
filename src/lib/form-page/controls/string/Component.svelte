<script lang="ts">
    import {StringControl} from "./string.js";
   import Control from "../Control.svelte"

    let {control, item, onChange}: {control: StringControl, item: any, onChange: Function} = $props()
    let field = control.field;


</script>

<Control {control}>
    <input type="text" bind:value={item[field]} on:input={onChange}/>
</Control>


<style lang="scss">
    @import "../inputs-style";
</style>