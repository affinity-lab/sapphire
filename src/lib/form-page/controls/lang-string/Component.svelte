<script lang="ts">

    import Control from "../Control.svelte";
    import type {LangString} from "$lib/form-page/controls/lang-string/lang-string.js";

    let {control, item, onChange}: { control: LangString, item: any, onChange: Function } = $props();
    let field = $state(control.field);

    let selectedLang: string = $state("HU" || null);

    $effect(()=>{
        selectedLang = "HU"
    })

</script>


<Control {control}>
    <main>
        <header>
            {#each ["HU", "EN"] as lang}
                <section on:click={() => selectedLang = lang} class:selected={selectedLang === lang} class:missing={!item[field][lang]}>
                    {lang}
                </section>
            {/each}
        </header>
        <div class="content">
            {#each ["HU", "EN"] as lang}
                <input type="text" bind:value={item[field][lang]} style="display: {selectedLang === lang ? 'block' : 'none'}" on:input={()=>onChange()}/>
            {/each}
        </div>
    </main>
</Control>

<style lang="scss">
  @import "../../../../node_modules/@affinity-lab/sapphire/dist/form-page/controls/inputs-style";
  @import "../../../../node_modules/@affinity-lab/sapphire/dist/lib/app";

  main {
    width: 100%;
    header {
      display: flex;
      section {
        padding: 4px 16px;
        &.selected {
          background-color: #0008!important;
        }
        &.missing {
          background-color: #f007;
        }
      }
    }
    .content {
      input {
        width: 100%;
      }
    }
  }

</style>