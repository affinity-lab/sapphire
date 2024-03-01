<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let {value, icon, placeholder} = $props();

    let dispatch = createEventDispatcher();
    let debounceTimeout;

    let input = () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => dispatch("change", {value}), 300);
    }
</script>

<div class="input" on:click={() => dispatch("click")}>
    <i class="{icon}"></i>
    <input type="text" bind:value={value} {placeholder} on:input={input} on:focus={() => dispatch("focus")} on:focusout={() => dispatch("focusout")}/>
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

