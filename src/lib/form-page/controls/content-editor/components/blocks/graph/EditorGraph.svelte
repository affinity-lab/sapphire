<script lang="ts">
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

    let chartData: string[] = $state(data.lines.map((elem) => elem.points.join(";")));
    let headerData: string = data.headers.join(";");

    function newHeaderInput () {
        if (headerData.match(/^[a-zA-Z0-9]+(;[a-zA-Z0-9]+)*$/g)) {
            data.headers = headerData.split(";");
        } else {
            data.headers = [];
        }
        change();
    }

    function newGraphInput(index: number): void {
        if (chartData[index].replaceAll(" ", "").match(/^-?\d+(;-?\d+)*$/g)) {
            data.lines[index].points = chartData[index].split(";").map((elem) => Number(elem));
        } else {
            data.lines[index].points = [];
        }
        change();
    }

    let addLine = () => {data.lines.push({points:[],name:""}); change()}
    let removeLine = (index) => {
        data.lines.splice(index, 1);
        chartData = chartData.filter((elem, i)=> i !== index)
        change();
    }

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Title</label>
        </div>
        <div class="field-body">
            <div class="field control">
                <input class="input is-size-7" type="text" bind:value={data.title} oninput={change}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Headers</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field">
                <input class="input is-size-7" type="text" bind:value={headerData} oninput={newHeaderInput}/>
            </div>
        </div>
    </div>

    {#each data.lines as line, index}
        <div class="field m-0 mb-1 is-horizontal">
            <div class="field-label is-normal">
                <label class="label is-size-7">Graph#{index+1}</label>
            </div>
            <div class="field-body has-addons">
                <div class="control field has-addons">
                    <input class="input is-size-7" type="text" placeholder="Name" bind:value={data.lines[index].name} oninput={change}/>
                    <input class="input is-size-7" type="text" placeholder="Points" bind:value={chartData[index]} oninput={()=>{newGraphInput(index)}}/>
                    <button class="button is-small" onclick={()=>{removeLine(index)}}><i class="bi bi-trash"></i></button>
                </div>
            </div>
        </div>
    {/each}

    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal"></div>
        <div class="field-body has-addons">
            <div class="control field">
                <button class="button is-small" onclick={addLine}><i class="bi bi-plus"></i></button>
            </div>
        </div>
    </div>

    <svelte:fragment slot="info">
        Use values separated by semi-colons (;) to display!<br>
        The number of headers is the number of vertical units!
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
</style>