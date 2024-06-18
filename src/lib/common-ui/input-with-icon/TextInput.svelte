<script lang="ts">
    import type {Icon} from "../icon.js";
    import type {FocusEventHandler, MouseEventHandler} from "svelte/elements";

    let {value = $bindable(), icon, placeholder, onchange, onfocusout, onfocus, onclick}: {
        value: string, icon: Icon, placeholder?: string, onchange?: Function, onfocusout?:  FocusEventHandler<HTMLInputElement>,
        onfocus?:  FocusEventHandler<HTMLInputElement>, onclick?: MouseEventHandler<HTMLDivElement>} = $props();

    let debounceTimeout: number;

    let input = () => {
        clearTimeout(debounceTimeout);
        //TODO
        if( onchange ) debounceTimeout = setTimeout(() => onchange({detail: {value}}), 300);
    }
</script>

<div class="input" onclick={onclick}>
    <i class="{icon.toString()}"></i>
    <input type="text" bind:value={value} {placeholder} oninput={input} {onfocus} {onfocusout}/>
</div>

<style lang="scss">
    .input {
      display: flex;
      width: 100%;
      i {
        color: black;
        background-color: white;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        line-height: 22px;
        padding: 0 4px;
      }
      input {
        border: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        outline: 0;
        border: 0;
        flex-grow: 1;
        margin-left: -1px;
      }
    }
</style>

