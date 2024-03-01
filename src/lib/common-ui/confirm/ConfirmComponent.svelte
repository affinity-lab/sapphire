<script lang="ts">

    import type {Popup} from "../../popup/popup.svelte.js";
    import SC_Popup from "../../popup/SC_Popup.svelte";
    import ButtonComponent from "../button/ButtonComponent.svelte";

    const {popup}: {popup: Popup} = $props()
</script>


<SC_Popup {popup}>
    <div>
        {popup.text}
    </div>


    <svelte:fragment slot="footer">
        {#each popup.buttons as button}
            <ButtonComponent {button} />
        {/each}
    </svelte:fragment>
</SC_Popup>

<style lang="scss">
    div {
      padding: 8px;
      max-width: 200px;
    }
</style>