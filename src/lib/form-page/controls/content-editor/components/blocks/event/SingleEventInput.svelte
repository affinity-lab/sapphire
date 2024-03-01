<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import autosize from "svelte-autosize";
    import {flip} from 'svelte/animate';
    import { v4 as uuidv4 } from 'uuid';
    import SingleLocationInput
        from "$lib/form-page/controls/content-editor/components/blocks/location/SingleLocationInput.svelte";
    import SingleEventInput
        from "$lib/form-page/controls/content-editor/components/blocks/event/SingleEventInput.svelte";
    // import {dndzone} from "svelte-dnd-action";

    // export let startTime;
    // export let endTime;
    // export let description;
    // export let name;
    // export let locationLabel;
    // export let locationLong;
    // export let locationLat;
    // export let subEvents = [];
    // export let url = "";
    // export let sub = false;

    let {startTime, endTime, description, name, locationLabel, locationLong, locationLat, subEvents = [], url = "", sub = ""} = $props();

    function addSubEvent(index: number) {
        subEvents = subEvents.slice(0, index).concat([{
            startTime: "",
            endTime: "",
            name: "",
            description: "",
            locationLabel: "",
            locationLong: "",
            locationLat: "",
            id: uuidv4()
        }], subEvents.slice(index));
        change();
    }
    function deleteSubEvent(index) {
        subEvents.splice(index, 1);
        change();
    }

    function handleDnd (e) {
        subEvents = e.detail.items;
        change();
    }

    let dispatch = createEventDispatcher();
    let change = () => dispatch("change");
</script>

<div>
    <div class="field m-0 mb-1 is-horizontal">
        {#if !sub}
        <div class="field-label is-normal">
            <label class="label is-size-7">Name</label>
        </div>
        {/if}
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="text" placeholder="Name" bind:value={name} on:input={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        {#if !sub}
        <div class="field-label is-normal">
            <label class="label is-size-7">{sub ? 'Desc' : 'Description'}</label>
        </div>
        {/if}
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <textarea class="textarea is-small" placeholder="Description" bind:value={description} on:input={change} use:autosize></textarea>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        {#if !sub}
        <div class="field-label is-normal">
            <label class="label is-size-7">{sub ? 'Start' : 'Start Time'}</label>
        </div>
            {/if}
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="datetime-local" bind:value={startTime} on:input={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        {#if !sub}
        <div class="field-label is-normal">
            <label class="label is-size-7">{sub ? 'End' : 'End Time'}</label>
        </div>
            {/if}
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="datetime-local" bind:value={endTime} on:input={change}/>
            </div>
        </div>
    </div>
    {#if !sub}
        <div class="field m-0 mb-1 is-horizontal">
            <div class="field-label is-normal">
                <label class="label is-size-7">Page</label>
            </div>
            <div class="field-body has-addons">
                <div class="control field has-addons">
                    <input class="input is-size-7" type="text" placeholder="Enter URL" bind:value={url} on:input={change} />
                </div>
            </div>
        </div>
    {/if}

    <SingleLocationInput bind:label={locationLabel}
                         bind:long={locationLong}
                         bind:lat={locationLat}
                         short={sub}
                         on:change={change}
    />

    {#if !sub}
        <div class="field m-0 mb-1 is-horizontal">
            <div class="field-label is-normal">
                <label class="label is-size-7">Subevents</label>
            </div>
            <div class="field-body has-addons subevent-container"
                use:dndzone={{items: subEvents, type: 'subevent'}}
                on:consider={handleDnd}
                on:finalize={handleDnd}
            >
                {#each subEvents as event, index (event.id)}
                    <div class="subevent py-2 is-flex" animate:flip={{duration:300}}>
                        <div class="one-subevent mr-1">
                        <SingleEventInput bind:startTime={event.startTime}
                                          bind:endTime={event.endTime}
                                          bind:description={event.description}
                                          bind:name={event.name}
                                          bind:locationLabel={event.locationLabel}
                                          bind:locationLong={event.locationLong}
                                          bind:locationLat={event.locationLat}
                                          sub={true}
                                          on:change={change}
                        />
                        <div class="options">
                            <button class="button is-small is-fullwidth" on:click={()=>{deleteSubEvent(index)}}>
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="button-container is-flex is-align-items-center">
                <button class="button adder last ml-2 has-background-grey-darker has-text-white" on:click={()=>addSubEvent(subEvents.length)}><i class="bi bi-plus"></i></button>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
  .one-subevent {
    background-color: #f9f9f9;
    border-radius: 10px;
    padding: 10px;
  }
    div.subevent-container {
      overflow-x: auto;
    }
    .button-container {
        height: 100%;
    }
    .adder {
      width: 20px;
    }
</style>