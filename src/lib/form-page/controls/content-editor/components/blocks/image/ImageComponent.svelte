<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import autosize from 'svelte-autosize';

    let {data, change, short} = $props();

    const alignOptions: Array<{label: string, value: string}> = [
        {label: "Left", value: "left"},
        {label: "Right", value: "right"},
        {label: "Justify", value: "justify"}
    ];
</script>


<div class="wrapper">
    <div class="field m-0 mb-1 is-horizontal">
        {#if !short}
        <div class="field-label is-normal">
            <label class="label is-size-7">Title </label>
        </div>
        {/if}
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input class="input is-size-7" type="text" placeholder="Title" bind:value={data.title} on:input={change}/>
                </div>
            </div>
        </div>
    </div>

    <div class="field m-0 mb-1 is-horizontal">
        {#if !short}
        <div class="field-label is-normal">
            <label class="label is-size-7">Alt </label>
        </div>
        {/if}
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input class="input is-small" type="text" placeholder="Alt" bind:value={data.alt} on:input={change}/>
                </div>
            </div>
        </div>
    </div>

    <div class="field m-0 mb-1 is-horizontal">
        {#if !short}
        <div class="field-label is-normal">
            <label class="label is-size-7">Url </label>
        </div>
        {/if}
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input class="input is-small" type="text" placeholder="Url" bind:value={data.url} on:input={change}/>
                </div>
            </div>
        </div>
    </div>

    {#if data.align !== "none"}
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Align</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <div class="select is-small">
                        <select bind:value={data.align} on:change={change}>
                            {#each alignOptions as {label, value}}
                                <option value={value}>{label}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/if}

    <div class="field m-0 mb-1 is-horizontal">
        {#if !short}
        <div class="field-label is-normal">
            <label class="label is-size-7">Desc. </label>
        </div>
        {/if}
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <textarea class="textarea is-small" placeholder="Description" bind:value={data.description} on:input={change} use:autosize></textarea>
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="scss">

</style>