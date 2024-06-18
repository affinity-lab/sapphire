<script lang="ts">
    import {createEventDispatcher} from "svelte";

    let {long, lat, label, short} = $props();

    let dispatch = createEventDispatcher();
    let change = () => dispatch("change")
</script>

<div>
    <div class="field m-0 mb-1 is-horizontal">
        {#if !short}
        <div class="field-label is-normal">
            <label class="label is-size-7">{short ? 'Loc' : 'Location'}</label>
        </div>
            {/if}
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="text" placeholder="Label" bind:value={label} oninput={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        {#if !short}
        <div class="field-label is-normal"></div>
            {/if}
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="text" placeholder="Long" bind:value={long} oninput={change}/>
                <input class="input is-size-7" type="text" placeholder="Lat" bind:value={lat} oninput={change}/>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
  @import "$lib/form-page/controls/inputs-style.scss";
</style>