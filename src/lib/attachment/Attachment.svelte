<script lang="ts">
    import Collection from "./Collection.svelte";
    import SC_Popup from "../popup/SC_Popup.svelte";
    import ButtonComponent from "../common-ui/button/ButtonComponent.svelte";
    import {Popup} from "../popup/popup.svelte";

    const {popup}: {popup: Popup} = $props()
    const api = popup.data.api;
    const collectionLabelMap = popup.data.collectionLabelMap

    let collections = $state([]);


     const loadData = async () => {
        collections = await api.getCollections();
    }

    loadData();
</script>


<SC_Popup {popup}>
    {#each collections as collection, index}
        {#key collections}
            <Collection {collection} {api} label={collectionLabelMap[collection.name] || collection.name} loadData={()=>loadData()} />
        {/key}
    {/each}
    <svelte:fragment slot="footer">
        {#if popup.buttons}
            {#each popup.buttons as button}
                <ButtonComponent {button} />
            {/each}
        {/if}
    </svelte:fragment>
</SC_Popup>




