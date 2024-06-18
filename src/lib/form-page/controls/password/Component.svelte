<script lang="ts">
    import {PasswordControl} from "./password.js";
    import Control from "../Control.svelte"
    import type {ChangeEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: { control: PasswordControl, item: any, onChange: ChangeEventHandler<HTMLInputElement> } = $props()
    let field = control.field;
    let visible = $state(true);

</script>

<Control {control}>
    {#if visible}
        <input type="password" autocomplete="current-password" bind:value={item[field]} onchange={onChange}/>
    {:else}
        <input type="text" autocomplete="current-password" bind:value={item[field]} onchange={onChange}>
    {/if}
    <div class="icon-container">
<!--TODO-->
        <i onclick={() => visible = !visible} class="fa-light" class:fa-eye={visible} class:fa-eye-slash={!visible}></i>
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
    width: calc(100% - 28px);
  }
</style>