<script lang="ts">

    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";
    import SingleEventInput
        from "$lib/form-page/controls/content-editor/components/blocks/event/SingleEventInput.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <SingleEventInput bind:startTime={data.startTime}
                      bind:endTime={data.endTime}
                      bind:name={data.name}
                      bind:description={data.description}
                      bind:locationLabel={data.locationLabel}
                      bind:locationLong={data.locationLong}
                      bind:locationLat={data.locationLat}
                      bind:subEvents={data.subEvents}
                      bind:url={data.url}
                      on:change={change}
    />
</DefaultEditorComponent>


<style lang="scss">
</style>