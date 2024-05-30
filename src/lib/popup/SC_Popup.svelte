<script lang="ts">
    import popupHandler from "./popup-handler.svelte.js";
    import {Popup} from "$lib/popup/popup.svelte";
    import type {Snippet} from "svelte";

    const {popup, children, footer}: {popup: Popup, children: Snippet, footer?: Snippet} = $props();

    async function close (e: MouseEvent) {
        if (await popup.beforeClose()) popupHandler.close();
        e.preventDefault();
    }

</script>

<div class="popup-wrapper" onclick={async (e)=>await close(e)}>
    <div class="popup" onclick={(e)=>e.stopPropagation()} class:content-size={popup.size==="content"} class:max-size={popup.size==="max"}>
        <header>
                <span>
                    {#if popup.icon}<i class="fa-fa fa-solid {popup.icon} icon"></i>{/if}
                    {popup.caption}
                </span>
            <i class="fa-solid fa-xmark close"
               onclick={async (e)=>await close(e)}
            ></i>
        </header>
        <section class="popup-body">
            {@render children()}

        </section>
        <footer>
            {#if footer}
                {@render footer()}
            {/if}
        </footer>
    </div>
</div>

<style lang="scss">
  @import "../lib/app.scss";
  $popup--backdrop-bg: #0009;
  $popup--bg: $color-gray-2;
  $popup--text-color: white;
  $popup--outline-vertical: 30px;
  $popup--outline-horizontal: 30px;
  $popup--close-color: orangered;
  $popup--separator-color: $color-gray-3;
  $popup--header-bg: $color-gray-0;
  $popup--footer-bg: $color-gray-0;
  $popup--min-outline: 20px;

  @keyframes appear {
    from {
      opacity: 0;
      backdrop-filter: none;
    }
    to {
      opacity: 1;
      backdrop-filter: blur(4px);
    }
  }

  .popup-wrapper {
    animation: appear;
    animation-duration: .3s;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $popup--backdrop-bg;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(4px);
    .popup {
      &.content-size {
        max-width: calc(100% - 2 * $popup--min-outline);
        max-height:  calc(100% - 2 * $popup--min-outline);
      }
      &.max-size {
        position: fixed;
        top: $popup--outline-horizontal;
        left: $popup--outline-vertical;
        width: calc(100% - 2 * $popup--outline-vertical);
        height: calc(100% - 2 * $popup--outline-horizontal);
      }

      padding: 0;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      color: $popup--text-color;
      overflow: hidden;
      header {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        padding: 8px 16px;
        border-bottom: 1px solid $popup--separator-color;
        background-color: $popup--header-bg;
        .icon {
          margin-right: 8px;
        }
        .close {
            color: $popup--close-color;
          transition: all .3s;
          cursor: pointer;
          &:hover {
            transform: rotate(.5turn);
          }
        }
      }
      section {
        flex-grow: 1;
        overflow-y: auto;
        background-color: $popup--bg;
      }
      footer {
        display: flex;
        justify-content: right;
        gap: 4px;
        background-color: $popup--footer-bg;
        border-top: 1px solid $popup--separator-color;

        padding: 8px;
        &:empty {
          display: none;
        }
      }
    }
  }
</style>