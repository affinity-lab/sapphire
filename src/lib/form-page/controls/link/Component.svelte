<script lang="ts">
    import Control from "$lib/form-page/controls/Control.svelte";
    import type {LinkControl} from "$lib/form-page/controls/link/link.svelte.js";
    import ButtonComponent from "$lib/common-ui/button/ButtonComponent.svelte";
    import {Button} from "$lib/common-ui/button/button.svelte.js";

    let {control, item = $bindable(), onChange}: {control: LinkControl, item: any, onChange: Function} = $props()
    let field = control.field;

</script>

<Control {control}>
    {#await control.createLinks(item[field]) then _}
        <div>
        {#each control.links as link}
            <section>
                <ButtonComponent button={new Button(link.label, () => link.onClick(item[field]))} />
            </section>
        {/each}
        </div>
    {/await}
</Control>

<style lang="scss">
    section {
      margin: 4px 0;
    }
</style>