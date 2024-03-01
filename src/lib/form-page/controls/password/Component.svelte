<script lang="ts">
    import {PasswordControl} from "./password.js";
    import Control from "../Control.svelte"

    let {control, item, onChange}: { control: PasswordControl, item: any, onChange: Function } = $props()
    let field = control.field;
    let visible = $state(true);

</script>

<Control {control}>
    {#if visible}
        <input type="password" autocomplete="current-password" bind:value={item[field]} on:change={onChange}/>
    {:else}
        <input type="text" autocomplete="current-password" bind:value={item[field]} on:change={onChange}>
    {/if}
    <div class="icon-container">
        <i on:click={() => visible = !visible} class="fa-light" class:fa-eye={visible} class:fa-eye-slash={!visible}></i>
    </div>
</Control>

<style lang="scss">
  @import "../inputs-style";
  .icon-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
  }
  input{
    margin-right: -28px;
  }
</style>