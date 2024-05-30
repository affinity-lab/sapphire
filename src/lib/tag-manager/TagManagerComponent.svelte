<script lang="ts">
    import SC_Popup from "$lib/popup/SC_Popup.svelte";
    import type {TagManagerPopup} from "$lib/tag-manager/tag-manager-popup.js";
    import {Icon} from "$lib/common-ui/icon.js";

    const {popup}: { popup: TagManagerPopup } = $props();

    let search = $state("");

    let tagManager = popup.data.tagManager;
</script>


<SC_Popup {popup}>
    <main>
        <header>
            <div class="tag">
                <i class="fa-duotone fa-magnifying-glass"></i>
                <input class="new-tag" type="text" bind:value={search}
                       placeholder="Keresés a címkék között"
                       icon={Icon.regular("magnifying-glass")}}>
            </div>
            <div class="tag">
            <i class="fa-thin fa-shield-plus"></i>
            <input class="new-tag" type="text" placeholder="Új címke" on:change={(e)=>{
                tagManager.addTag(e.target.value);
                e.target.value = "";
            }}>
        </div>
        </header>

        <section>
            {#each tagManager.tags as tag}
                {#if (!search) || tag.name.toLowerCase().includes(search.toLowerCase())}
                    <div class="tag">
                        <i class="fa-duotone" class:fa-shield={!tag.predefined} class:fa-shield-check={tag.predefined}
                           onclick={()=>{tagManager.updateTag(tag.name, tag.name, !tag.predefined)}}></i>

                        <input type="text" value={tag.name} on:change={(e) => {
                            tagManager.updateTag(tag.name, e.target.value, tag.predefined)
                    }}>

                        <i class="fa-light fa-trash-xmark trash"
                           style="color: orangered"
                           onclick={(e) => {
                           tagManager.removeTag(tag.name)
                           e.stopPropagation();
                       }}
                        ></i>
                    </div>
                {/if}
            {/each}
        </section>
    </main>
</SC_Popup>


<style lang="scss">
  @import "../lib/app.scss";

  main {
    header {
      position: sticky;
      top: -1px;
      padding: 8px;
      background-color: $color-gray-0;
      border-bottom: 1px solid $color-gray-3;
      z-index: 10;
    }
    section {
      margin: 8px;
    }
    position: relative;

    div.tag {
      display: flex;
      margin: 2px;
      border-radius: 4px;
      background-color: $color-gray-1;
      align-items: center;
      overflow: hidden;

      .new-tag {
        width: 100%;
      }

      input {
        border: none;
        outline: none;
        padding: 4px 8px;
        background-color: $color-gray-1;
        color: white;
      }
      .trash {
        opacity: 0;

      }
      i {
        padding: 0 8px;
        cursor: pointer;
      }
      &:hover .trash {
        opacity: 1;
        transition: .3s;
      }
    }
  }


</style>