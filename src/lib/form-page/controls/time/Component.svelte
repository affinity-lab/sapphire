<script lang="ts">
    import {TimeControl} from "./time.js";
    import Control from "../Control.svelte"
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: {control: TimeControl, item: any, onChange: ChangeEventHandler<HTMLInputElement>} = $props()
    let field = control.field;


</script>

<Control {control}>
    <input type="time" bind:value={item[field]} onchange={onChange}/>
</Control>

<style lang="scss">
  @import "../inputs-style";
  input{
    color-scheme: dark;
    position: relative;
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      right: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
