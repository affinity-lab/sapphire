<script lang="ts">

    // export let index: number | undefined = undefined; // undefined if last, pageHandler handles it
    //
    // export let pageHandler;

    import {loadFromClipboard} from "$lib/form-page/controls/content-editor/load-content.js";
    import ButtonComponent from "$lib/common-ui/button/ButtonComponent.svelte";
    import {Button} from "$lib/common-ui/button/button.svelte.js";
    import {Icon} from "$lib/common-ui/icon.js";

    let {index = undefined, pageHandler} = $props();

    let innerHeight: number;
    let isUp = $state(false);
</script>

<svelte:window bind:innerHeight/>

<main>
    <div class="appearing">
        <div class="dropdown" on:mouseenter={(e) => {isUp = e.y > innerHeight / 2}} class:is-up={isUp}>
            <ButtonComponent button={new Button(Icon.regular("plus").color("white"), () => {})} on:hover={()=>{}}/>
            <div>
                {#each Object.entries(pageHandler.blocks) as [key, value]}
                    <div on:click={()=>{pageHandler.add(key, {insertIndex: index})}}>
                        <i class="{value.icon}"></i>
                        {value.label}
                    </div>
                {/each}
            </div>
        </div>
        <div>
            <ButtonComponent button={(new Button(
            Icon.regular("copy").color("white"),
            ()=>{loadFromClipboard(pageHandler, index===undefined ? pageHandler.itemCount : index)}
        )).tooltip("Insert items from clipboard")}/>
        </div>

    </div>
</main>


<style lang="scss">
  @import "$lib/lib/app.scss";

  main {
    margin: auto;
    display: flex;
    justify-content: center;
  }

  div.appearing {
    display: flex;
    justify-content: center;
    gap: 4px;
    background-color: $color-gray-3;
    padding: 4px;
    height: 16px;
    width: 200px;
    position: relative;

    &:hover {
      height: 40px;
      transition: .2s;
    }
  }

  :global(div.appearing > *) {
    opacity: 0;
  }

  :global(div.appearing:hover > *) {
    opacity: 1;
    transition: .2s;
  }

  div.dropdown > div {
    display: none;
    max-height: 40vh;
    min-width: 150px;
    overflow-y: auto;

    div {
      padding: 2px 8px;

      &:nth-child(odd) {
        background-color: $color-gray-1
      }

      &:nth-child(even) {
        background-color: $color-gray-3
      }
    }

    div:hover {
      background-color: $color-gray-0
    }
  }

  :global(div.dropdown:has(button:hover, div:hover) > div) {
    display: block;
    position: absolute;
    z-index: 1000;
  }

  :global(div.dropdown.is-up:has(button:hover, div:hover) > div) {
    bottom: 0;
  }
</style>
