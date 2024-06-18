<script lang="ts">
    import toastHandler from "$lib/common-ui/toast/toast-handler.svelte";
    import {copy} from "$lib/lib/clipboard";
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

    let rows: number = data.rows.length;
    let cols: number = data.rows[0].length;

    let increaseRows = () => {data.rows.push([...Array(cols)].map(()=>"")); rows+=1; change()}
    let decreaseRows = () => {data.rows = data.rows.slice(0, data.rows.length - 1); rows-=1; change()}

    let increaseCols = () => {data.rows = data.rows.map((elem) => [...elem, ""]); cols+=1; change()}
    let decreaseCols = () => {data.rows = data.rows.map((elem) => elem.slice(0, elem.length - 1)); cols-=1; change()}

    let activeCell: [number, number] = [-1,-1];

    let initInput = (el) => el.focus();

    function copyData (rowindex: number): void {
        let startIndex = 0;
        if (data.headerCol) startIndex += 1;

        let endIndex = data.rows[0].length;
        if(data.summaryCol) endIndex -= 1;

        copy(data.rows[rowindex].slice(startIndex, endIndex).join(";"));
        toastHandler.addToast("success", "Row copied to clipboard")
    }
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="size-selector is-flex is-justify-content-space-evenly">
        <div class="field">
            <label>Columns</label>
            <div class="control field has-addons">
                <input readonly type="text" class="input  is-small" value={cols}/>
                <button class="button is-small" onclick={increaseCols}><i class="bi bi-plus"></i></button>
                <button class="button is-small" onclick={decreaseCols}><i class="bi bi-dash"></i></button>
            </div>
        </div>
        <div class="field">
            <label>Rows</label>
            <div class="control field has-addons">
                <input readonly type="text" class="input is-small" value={rows}/>
                <button class="button is-small" onclick={increaseRows}><i class="bi bi-plus"></i></button>
                <button class="button is-small" onclick={decreaseRows}><i class="bi bi-dash"></i></button>
            </div>
        </div>
    </div>
    <div class="field is-grouped-centered">
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked={data.displayed} on:change={change}/>
                Displayed
            </label>
        </div>
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked={data.headerRow} on:change={change}/>
                Header row
            </label>
        </div>
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked={data.headerCol} on:change={change}/>
                Header column
            </label>
        </div>
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked={data.summaryRow} on:change={change}/>
                Summary row
            </label>
        </div>
        <div class="control">
            <label class="checkbox">
                <input type="checkbox" bind:checked={data.summaryCol} on:change={change}/>
                Summary column
            </label>
        </div>
    </div>

    <div class="grid" style="grid-template-columns: fit-content(20%) repeat({cols}, 1fr);">
        {#key activeCell}
            {#each {length: rows} as _, i}
                <div class="cell copy m-1">
                    <button class="button is-small" on:mouseup={()=>{copyData(i)}}>
                        <i class="bi bi-clipboard"></i>
                    </button>
                </div>

                {#each {length: cols} as _, j}
                    <div class="cell p-1 m-0"
                         title={data.rows[i][j]}
                         on:mouseup={()=>{if (activeCell[0] !== i || activeCell[1] !== j) activeCell = [i,j];}}
                    >
                        {#if activeCell[0] === i && activeCell[1] === j}
                            <input type="text"
                                   class="input is-small is-fullwidth"
                                   use:initInput
                                   bind:value={data.rows[i][j]}
                                   oninput={change}
                                   on:focusout={()=>{activeCell = [-1,-1]}}
                            />
                        {:else}
                            {data.rows[i][j]}
                        {/if}
                    </div>
                {/each}
            {/each}
        {/key}
    </div>

    <svelte:fragment slot="info">
        Empty cells: <b>{data.rows.flatMap(arr => arr).filter(str => str.trim() === "").length}</b>
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
    div.cell {
      border: 1px solid white;
      background-color: #eee;
      cursor: text;
    }
    div.cell:not(.copy) {
      min-width: 80px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    div.grid {
      display: grid;
      overflow-x: auto;
    }
    .size-selector {
      gap: 20px;
    }
</style>