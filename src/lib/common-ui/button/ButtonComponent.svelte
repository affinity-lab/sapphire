<script lang="ts">
    import type {Button} from "./button.svelte.js";
    import {userStore} from "../../lib/user-store.svelte.js";
    import {createEventDispatcher} from "svelte";

    const {button}: {button: Button} = $props();

    let dispatch = createEventDispatcher();
</script>

{#if (!userStore.user) || userStore.hasRole(button.roles)}
    <button on:click={(e)=>{button.onClick(e)}} style:width={button._width} title={button._tooltip ? button._tooltip : ""} on:hover={()=>{dispatch("hover")}}>
        <div>
            {#if button.icon}
                <i class="icon fa-fa fa-fw {button.icon}" style="{button.icon?.colorStyle || ''}"></i>
            {/if}
            {#if button.label}
                <span>{button.label}</span>
            {/if}
        </div>
    </button>
{/if}

<style lang="scss">
  @import "../../lib/app.scss";
  button {
    background-color: $color-gray-2;
    box-sizing: border-box;
    cursor: pointer;
    span {
      color: white;
    }

    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    div {
      text-align: center;
    }
  }
</style>
