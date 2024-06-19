<script lang="ts">
    import {emitter} from "../lib/event.js";
    import ButtonComponent from "../common-ui/button/ButtonComponent.svelte";
    import TextInput from "../common-ui/input-with-icon/TextInput.svelte";
    import {Icon} from "../common-ui/icon.js";
    import DebouncedNumber from "../common-ui/debounced-number/DebouncedNumber.svelte";
    import {Button} from "../common-ui/button/button.svelte.js";
    import {CardList} from "./card-list.svelte";
    import {onMount} from "svelte";
    import {listHandler} from "./list-handler.svelte.js";

    const {list}: { list: CardList } = $props();

    let quickSearch: string = "";
    let order: string = $state(list.orderTypes ? Object.keys(list.orderTypes)[0] : "");
    let currentPage = $state(0);
    let filterData = $state({});

    let data: {items: Array<Record<string, any>>; page: number; count: number, pageSize: number } | Record<PropertyKey, never> = $state({});

    // $effect(refreshItems());

    function refreshItems() {
        list.api.get(
            quickSearch,
            list.isFiltering ? filterData : {},
            order,
            currentPage,
            list.pageSize
        ).then(res => {
            data = res;
            currentPage = data.page;
        });
    }

    if (list.filterComponent) {
        list.buttons.unshift(
            (new Button(Icon.solid("filter-list").color("white"), () => {
                list.isFiltering = !list.isFiltering;
            })).tooltip("Filter the list"))
    }
    for (let eventType of list.refreshOnEvents) emitter.subscribe(eventType, () => refreshItems());

    onMount(()=>{
        refreshItems();
    })
</script>


<main>
    <header>
        <div class="wrapper">
            <div class="header-top-row">
                <ButtonComponent button={new Button(Icon.solid("xmark").color("red"), ()=>{listHandler.closeList()})}/>
                <div class="text-with-icon">
                    {#if list.icon}
                        <i class="{list.icon.toString()}" style="{list.icon.colorStyle}"></i>
                    {/if}
                    <span>{list.name}</span>
                </div>

                <div class="button-container">
                    {#each list.buttons as button}
                        <ButtonComponent {button}/>
                    {/each}

                </div>
            </div>
            {#if list.hasQuickSearch}
                <TextInput
                        bind:value={quickSearch}
                        placeholder="Search"
                        icon={Icon.solid("magnifying-glass")}
                        onchange={()=>{refreshItems();}}
                />
            {/if}
            {#if list.orderTypes}
                <div class="header-row">
                    <select bind:value={order} onchange={()=>refreshItems()}>
                        {#each Object.entries(list.orderTypes) as [value, label], index}
                            <option value={value}>{label}</option>
                        {/each}
                    </select>
                </div>
            {/if}
            {#if list.isFiltering}
                <div class="header-row">
                    <svelte:component this={list.filterComponent} bind:data={filterData}/>
                </div>
            {/if}
        </div>
    </header>

    <section>
        {#key data}
            {#each data.items as item}
                {@const cardified = list.cardify(item)}
                <div>
                    <svelte:component this={cardified.card} card={cardified.cardData}/>
                </div>
            {/each}
        {/key}
    </section>

    <div class="filler"></div>

    <footer>
        <div class="wrapper">
            <ButtonComponent
                    button={new Button(Icon.solid("chevron-left").color("white"), ()=>{currentPage -= 1; refreshItems()})}/>
            <span>
					<DebouncedNumber value={currentPage + 1} max={Math.ceil(data.count/data.pageSize)}
                                     onchange={(e)=>{currentPage=e.detail.value; refreshItems()}}/>
					/ {Math.ceil(data.count / list.pageSize)}
				</span>
            <ButtonComponent
                    button={new Button(Icon.solid("chevron-right").color("white"), ()=>{currentPage += 1; refreshItems()})}/>
            <span>{data.count} items</span>
        </div>
    </footer>
</main>

<style lang="scss">
  @import "../lib/app";

  main {
    height: 100%;
    overflow-y: scroll;
    padding-right: 4px;
    display: flex;
    flex-direction: column;

    header {
      position: sticky;
      top: 0;
      background-color: $background-color;
      border-radius: 0 0 8px 8px;
      //border-bottom:1px solid $background-color;
      //box-shadow: 2px 12px 8px -4px #0004;
      //&:before{
      //	position: absolute;
      //	bottom:-4px;
      //	content:"";
      //	border-top:4px solid $background-color;
      //	width: 100%;
      //}


      div.wrapper {
        background-color: $card-list--header-bg;
        border-radius: 8px;
        color: $card-list--header-color;
        font-size: 14px;
        padding: 12px;

        .header-top-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;

          .text-with-icon {
            display: flex;
            align-items: center;
            justify-content: center;

            span {
              margin-left: 8px;
              font-weight: bold;
            }
          }

          .button-container {
            display: flex;
            gap: 5px
          }
        }

        .header-row {
          margin-top: 8px;

          select {
            border: 0;
            border-radius: 4px;
            width: 100%;
          }
        }
      }

      z-index: 10;
    }

    section {
      > div {
        z-index: 1;
        border-radius: 8px;
        margin-top: 12px;

        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }

    .filler {
      flex-grow: 1;
    }

    footer {
      position: sticky;
      bottom: 0;
      background-color: $background-color;
      border-radius: 8px 8px 0 0;
      //box-shadow: 2px -12px 8px -4px #0004;
      div.wrapper {
        background-color: $card-list--footer-bg;
        border-radius: 8px;
        color: $card-list--footer-color;
        font-size: 14px;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          :global(input) {
            max-width: 50px;
            text-align: center;
            outline: none;
            border-radius: 11px;
            border: none;
          }
        }

        button {
          background: none;
          border: none;
          color: white;
        }
      }
    }
  }


</style>