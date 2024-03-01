<script lang="ts">

    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";
    import SingleLocationInput
        from "$lib/form-page/controls/content-editor/components/blocks/location/SingleLocationInput.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <SingleLocationInput bind:label={data.name}
                         bind:long={data.long}
                         bind:lat={data.lat}
                         on:change={change}
    />
</DefaultEditorComponent>


<style lang="scss">
    @import "$lib/form-page/controls/inputs-style.scss";
</style>
