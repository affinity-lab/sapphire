<script lang="ts">
    import {ColorControl} from "./color.js";
   import Control from "../Control.svelte"

    let {control, item, onChange}: {control: ColorControl, item: any, onChange: Function} = $props()
    let field = control.field;

</script>

<Control {control}>
    <input class="color" type="color" bind:value={item[field]} on:change={onChange}/>
</Control>

<style lang="scss">
  @import "../inputs-style";
</style>
