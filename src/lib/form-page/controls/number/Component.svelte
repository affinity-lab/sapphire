<script lang="ts">
    import {NumberControl} from "./number.js";
   import Control from "../Control.svelte"

    let {control, item, onChange}: {control: NumberControl, item: any, onChange: Function} = $props()
    let field = control.field;

</script>

<Control {control}>
    <input type="number" bind:value={item[field]} on:change={onChange}/>
</Control>

<style lang="scss">
  @import "../inputs-style";


</style>
