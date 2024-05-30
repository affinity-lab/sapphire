<script lang="ts">
    import {IconControl} from "./icon-picker.js";

    let {control, item = $bindable(), onChange}: { control: IconControl, item: any, onChange: Function } = $props()
    let field = control.field;
    let options = {
        "solid": "fa-solid",
        "regular": "fa-regular",
        "light": "fa-light",
        "thin": "fa-thin",
        "duotone": "fa-duotone",
        "brands": "fa-brands",
        "solid sharp": "fa-solid fa-sharp",
        "regular sharp": "fa-regular fa-sharp",
        "light sharp": "fa-light fa-sharp",
        "thin sharp": "fa-thin fa-sharp"
    };
</script>

<div class="container" class:row={control.layout==="row"} class:column={control.layout==="column"}>
    <i class="{item[field].family} {item[field].icon}" style="color: {item[field].color}"></i>

    <label>{control.label}</label>

    <span>Search icons <a href="https://fontawesome.com/search" target="_blank">here</a>.</span>
    <input type="text" placeholder="fa-house" bind:value={item[field]["icon"]} on:change={onChange}/>

    <label>Select icon family from the list:</label>
    <select bind:value={item[field]["family"]}>
        {#each Object.entries(options) as [key, value]}
            <option value={value}>{key}</option>
        {/each}
    </select>

    {#if control.isColorPicker}
        <label>Select color:</label>
        <input type="color" bind:value={item[field]["color"]} on:change={onChange}/>
    {/if}
</div>

<style lang="scss">
  @import "../inputs-style";
  .container {
    position: relative;

    i {
      position: absolute;
      top: 16px;
      right: 16px;
      font-size: 2rem;
    }
  }

</style>