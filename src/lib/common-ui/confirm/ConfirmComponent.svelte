<script lang="ts">

    import SC_Popup from "../../popup/SC_Popup.svelte";
    import ButtonComponent from "../button/ButtonComponent.svelte";
    import {ConfirmPopup} from "./proceed.svelte.js";

    const {popup}: {popup: ConfirmPopup} = $props()
</script>


{#snippet footer()}
    {#each popup.buttons as button}
        <ButtonComponent {button} />
    {/each}
{/snippet}

<SC_Popup {popup} {footer}>
    <div>
        {popup.text}
    </div>
</SC_Popup>


<style lang="scss">
    div {
      padding: 8px;
      max-width: 200px;
    }
</style>