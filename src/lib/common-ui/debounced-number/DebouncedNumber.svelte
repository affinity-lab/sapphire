<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let {value, max} = $props();
    let realValue: number;
    $effect(()=>{ realValue = value - 1})

    let dispatch = createEventDispatcher();
    let debounceId;

    let input = () => {
        clearTimeout(debounceId)
        debounceId = setTimeout(()=>{dispatch("change", {
            value: realValue
        })}, 500)
    }
</script>

<input type="number" bind:value on:input={()=>{input()}}/>

<style lang="scss">
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>