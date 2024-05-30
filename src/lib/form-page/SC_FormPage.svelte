<script lang="ts">
    import type {FormPage} from "./form-page.svelte.js";
    import ButtonComponent from "../common-ui/button/ButtonComponent.svelte";
    import {onMount} from "svelte";

    let {page = $bindable()}: { page: FormPage } = $props();
	let loading = $state(true);

	onMount(async () => {
		await page.initialize()
        loading = false
	})
</script>

<header>
    <div class="label">
        <h1>{page.label}</h1>
        <h6>id: {page.itemId}</h6>
    </div>

    <div class="buttons">
        {#each page.buttons as button}
            {#if button.isActive(page.item)}
                <ButtonComponent {button}/>
            {/if}
        {/each}
    </div>
</header>
<article>
    {#if !loading}
        {#each page.sections as sect}
            <section>
                {#if sect.label}
                    <h2>{sect.label}</h2>
                {/if}
                {#each sect.controls as control}
                    <svelte:component
                            this={control.component}
                            control={control}
                            bind:item={page.item}
                            onChange={()=>{
                                page.onChange();
                                control.clearErrors();
                            }}
                    />
                {/each}
            </section>
        {/each}
    {/if}
</article>


<style lang="scss">
  @import "../lib/app.scss";

  header {
    background-color: $color-gray-1;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 10px;
    box-sizing: border-box;
    color: white;
    position: sticky;
    top: 0;
    z-index: 10;

    div.label {
      min-width: 0;

      h1, h6 {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0;
      }
      h1 {
        font-size: 20px;
      }
    }

    div.buttons {
      display: flex;
      gap: 8px;
    }

  }

  article {
    overflow-y: auto;
    section {
      container-type: inline-size;
      background-color: $color-gray-1;
      margin: 8px 0;
      border-radius: 8px;
      overflow: hidden;
      h2 {
        background-color: $color-gray-3;
        margin: 0;
        color: white;
        font-size: 16px;
        padding: 8px 16px;
      }
    }
  }
</style>

