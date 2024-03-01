<script lang="ts">
    import {onMount} from "svelte";
    import {copy} from "../../clipboard-handler";
    import ButtonComponent from "$lib/common-ui/button/ButtonComponent.svelte";
    import {Button} from "$lib/common-ui/button/button.svelte.js";
    import {Icon} from "$lib/common-ui/icon.js";
    import toastHandler from "$lib/common-ui/toast/toast-handler.svelte";

    let {pageHandler, index, visible, valid, change} = $props();


    let contentData = pageHandler.content[index];
    let config = pageHandler.blocks[contentData.type];
    let data = contentData.data

    let errors: string[] = [];

    function toggleOpened() {
        visible = !visible;
    }


    change = function () {
        let validCheck = config.validate(data);
        if (validCheck === true) {
            errors = [];
            valid = true;
        } else {
            errors = validCheck;
            valid = false;
        }
        contentData.valid = valid;
        pageHandler.refreshContent();
        pageHandler.refreshCleanData();
    }

    onMount(change);

    function copyComponent() {
        copy(JSON.stringify([pageHandler.cleanData[index]]));
        toastHandler.addToast("success", "Component copied successfully")
    }
</script>


<main>
    <header>
        <h2>
            <i class="fa-regular fa-fw fa-grip-dots-vertical drag-handle"></i>
            <i class="{config.icon}"></i> {config.label}
        </h2>

        {#if !visible}
            <div class="abbr">
                <slot name="closed-text"/>
            </div>
        {/if}

        <div>
            {#if visible}
                <ButtonComponent button={new Button(Icon.regular("eye").color("white"), ()=>{toggleOpened()})}/>
            {:else}
                <ButtonComponent button={new Button(Icon.regular("eye-slash").color("white"), ()=>{toggleOpened()})}/>
            {/if}
            <ButtonComponent button={new Button(Icon.regular("copy").color("white"), ()=>{copyComponent()})}/>
            <ButtonComponent button={new Button(Icon.regular("trash").color("white"), ()=>{pageHandler.remove(index)})}/>
        </div>
    </header>

    {#if visible}
        <div>
            <slot/>
        </div>


        <div>
            <slot name="info"/>
        </div>

        <div>
            <slot name="custom-errors"/>
            {#each errors as error}
                <p>{error}</p>
            {/each}
        </div>
    {/if}
</main>

<style lang="scss">
  @import "$lib/lib/app.scss";

  .drag-handle {
    cursor: pointer;
  }

  main {
    background-color: $color-gray-0;
    margin: 0 8px;
    border-radius: 8px;
    overflow: hidden;

    > div {
      font-size: 12px;
      padding: 8px;
      &:last-child {
        padding-top: 0;
      }
    }
    header + div {
      padding-bottom: 0;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: $color-gray-1;
      padding: 8px;
      gap: 16px;

      h2 {
        margin: 0;
        font-size: 14px;
        flex-shrink: 0;
        i {
          margin-right: 8px;
        }
      }

      div:last-child {
        display: flex;
        gap: 4px;
      }
    }
  }

  div.abbr {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    clear: both;
    white-space: nowrap;
  }
</style>
