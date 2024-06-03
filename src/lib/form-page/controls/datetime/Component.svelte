<script lang="ts">
    import Control from "../Control.svelte"
    import type {DateTimeControl} from "$lib/form-page/controls/datetime/datetime.js";
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}:
        {control: DateTimeControl, item: any, onChange: ChangeEventHandler<HTMLInputElement>} = $props()
    let field = control.field;

    const pad = (n: number) => n.toString().padStart(2, "0")

    function formatDate(d: string) {
        const date = new Date(d)
        return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }
    function onInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }){
            item[field] = (e.target as HTMLInputElement).value;
    }

</script>

<Control {control}>
    <input type="datetime-local" value={formatDate(item[field])} oninput={onInput} onchange={onChange}/>
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
