<script lang="ts">
    import Collection from "./Collection.svelte";
    import SC_Popup from "../popup/SC_Popup.svelte";
    import ButtonComponent from "../common-ui/button/ButtonComponent.svelte";
    import type {AttachmentPopup} from "./attachment-popup.js";
    import type {Collection as Coll} from "./types.js";

    const {popup}: {popup: AttachmentPopup} = $props()
    const api = popup.data.api;
    const collectionLabelMap = popup.data.collectionLabelMap

    let collections: Coll[] = $state([]);


     const loadData = async () => {
        collections = await api.getCollections();
    }

    loadData();
</script>

{#snippet footer()}
    {#if popup.buttons}
        {#each popup.buttons as button}
            <ButtonComponent {button} />
        {/each}
    {/if}
{/snippet}

<SC_Popup {popup} {footer}>
    {#each collections as collection, index}
        {#key collections}
            <Collection {collection} {api} label={collectionLabelMap[collection.name] || collection.name} loadData={()=>loadData()} />
        {/key}
    {/each}
</SC_Popup>




