<script lang="ts">

    let {value = $bindable(), max = Infinity, onchange}: {value: number, max: number, onchange: (x: {detail: {value: any}})=>void} = $props();
    let realValue: number = $derived(value - 1);

    let debounceId: number;

    let input = () => {
        clearTimeout(debounceId)
        debounceId = setTimeout(()=>{onchange({detail:{value:realValue}})}, 500)
    }

    // function input () {
    //     $host().dispatchEvent(new CustomEvent<{value: any}>('hover', {
    //         detail: {value: realValue}
    //     }));
    // }
</script>

<input type="number" bind:value oninput={input}/>

<style lang="scss">
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>