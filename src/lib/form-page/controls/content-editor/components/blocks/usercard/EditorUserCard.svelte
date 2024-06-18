<script lang="ts">


    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="field m-0">
        <label class="label is-small">User's Id:</label>
        <div class="control id-input">
            <input class="input is-small" type="text" bind:value={data.id} oninput={change} />
        </div>
    </div>

    <div class="userOptions is-flex is-flex-wrap-wrap">
        {#each Object.keys(data.fields) as option, optionIndex (optionIndex)}
            {#if
                (config.options.allowedFields.includes(option)) &&
                !(config.options.disallowedFields.includes(option))
            }
                <label class="checkbox">
                    <input type="checkbox"
                            bind:checked={data.fields[option]}
                            on:change={change}
                            disabled={config.options.mustHave.includes(option)}
                    />
                    {option}
                </label>
            {/if}
        {/each}
    </div>

    <svelte:fragment slot="closed-text">
        User#{data.id} - {(Object.keys(data.fields).filter((elem)=>data.fields[elem])).join(', ')}
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
  div.id-input {
    width: 50px;
    display: inline-block;
  }
  div.userOptions {
    gap: 10px;
  }
  p {
    color: red;
    margin: 0;
  }
</style>