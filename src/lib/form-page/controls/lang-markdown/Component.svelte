<script lang="ts">
    import Control from "../Control.svelte";
    import {marked} from "marked";
    import {LangMarkdown} from "$lib/form-page/controls/lang-markdown/lang-markdown.js";
    import type {FormEventHandler} from "svelte/elements";

    let {control, item = $bindable(), onChange}: { control: LangMarkdown, item: any, onChange: FormEventHandler<HTMLTextAreaElement> } = $props();
    let field = $state(control.field);

    let selectedLang: string = $state("HU" || null);

    $effect(()=>{
        selectedLang = "HU"
    })
    //TODO scss import
</script>


<Control {control}>
    <main>
        <header>
            {#each ["HU", "EN"] as lang}
                <section onclick={() => selectedLang = lang} class:selected={selectedLang === lang} class:missing={!item[field][lang]}>
                    {lang}
                </section>
            {/each}
        </header>
        <div class="content">
            {#each ["HU", "EN"] as lang}
                <div class="markdown" style="display: {selectedLang === lang ? 'grid' : 'none'}">
                    <textarea bind:value={item[field][lang]} oninput={onChange}/>
                    <div>
                        {@html marked.parse(item[field][lang] || "", {breaks: true})}
                    </div>
                </div>
            {/each}
        </div>
    </main>
</Control>

<style lang="scss">
  //@import "../../../../node_modules/@affinity-lab/sapphire/dist/form-page/controls/inputs-style";
  //@import "../../../../node_modules/@affinity-lab/sapphire/dist/lib/app";
  @import "../inputs-style.scss";
  .markdown {
    display: grid;
    gap: 8px;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
    div {
      font-size: 14px;
      color: #fff9;
    }
  }
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
  }

</style>