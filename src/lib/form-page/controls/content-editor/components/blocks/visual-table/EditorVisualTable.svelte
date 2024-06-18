<script lang="ts">
    import autosize from 'svelte-autosize';
    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    // export let data: EditorData;
    // export let config: VisualTable;
    // export let index: number;
    // export let pageHandler: PageHandler;
    // export let visible: boolean;
    // export let valid: boolean;

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

    let getEmpty = (x,y) => {return {x, y, width: 1, height: 1, content: ""}}

    let increaseRows = () => {
        data.height += 1;
        for (let i = 0; i < data.width; i++) data.cells.push(getEmpty(i, data.height - 1));
        data.cells = data.cells;
        change();
    }
    let decreaseRows = () => {
        data.height -= 1;
        let to_remove = [];
        for (let cell of data.cells) {
            if (cell.y === data.height) to_remove.push(cell);
            else if (cell.y + cell.height === data.height + 1) cell.height -= 1;
        }
        for (let cell of to_remove) removeCell(cell.x, cell.y);
        data.cells = data.cells;
        change();
    }

    let increaseCols = () => {
        data.width += 1;
        for (let i = 0; i < data.height; i++) {
            data.cells.push(getEmpty(data.width - 1, i));
        }
        data.cells = data.cells;
        change();
    }

    let decreaseCols = () => {
        data.width -= 1;
        let to_remove = [];
        for (let cell of data.cells) {
            if (cell.x === data.width) to_remove.push(cell);
            else if (cell.x + cell.width === data.width + 1) cell.width -= 1;
        }
        for (let cell of to_remove) removeCell(cell.x, cell.y);
        data.cells = data.cells;
        change();
    }

    let initInput = (el) => el.focus();

    let getCellIndex = (x,y) => data.cells.findIndex((cell) => cell.x === x && cell.y === y);
    let getCell = (x, y) => data.cells[getCellIndex(x, y)];
    let removeCell = (x, y) => data.cells.splice(getCellIndex(x, y), 1)

    function unite(c1: [number, number], c2: [number, number]) {
        if (getCell(...c2) && c1[0] === c2[0] && getCell(...c1).width === getCell(...c2).width) {
            getCell(...c1).height += getCell(...c2).height;
            removeCell(...c2)
        } else if (getCell(...c2) && c1[1] == c2[1] && getCell(...c1).height === getCell(...c2).height) {
            getCell(...c1).width += getCell(...c2).width;
            removeCell(...c2)
        }
        data.cells = data.cells;
        change();
    }
    function split(x, y) {
        let cell = getCell(x, y);
        let cellIndex = getCellIndex(x, y);

        for (let x = cell.x; x < cell.x + cell.width; x++) {
            for (let y = cell.y; y < cell.y + cell.height; y++) {
                let newCell = getEmpty(x,y)
                if(x === cell.x && y === cell.y) newCell.content = cell.content;
                data.cells.push(newCell);
            }
        }
        data.cells.splice(cellIndex, 1);
        data.cells = data.cells;
        change();
    }

    let activeCell: {x:number, y:number} = {x: -1, y: -1};

</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="size-selector is-flex is-justify-content-space-evenly">
        <div class="field">
            <label>Columns</label>
            <div class="control field has-addons">
                <input readonly type="text" class="input  is-small" bind:value={data.width}/>
                <button class="button is-small" onclick={increaseCols}><i class="bi bi-plus"></i></button>
                <button class="button is-small" onclick={decreaseCols}><i class="bi bi-dash"></i></button>
            </div>
        </div>
        <div class="field">
            <label>Rows</label>
            <div class="control field has-addons">
                <input readonly type="text" class="input is-small" bind:value={data.height}/>
                <button class="button is-small" onclick={increaseRows}><i class="bi bi-plus"></i></button>
                <button class="button is-small" onclick={decreaseRows}><i class="bi bi-dash"></i></button>
            </div>
        </div>
    </div>

    <div class="grid" style="grid-template-columns: repeat({data.width}, 1fr);">
        {#each data.cells as cell}
            <div class="cell"
                 style="grid-area: {cell.y+1} / {cell.x+1} / span {cell.height} / span {cell.width}"
                 on:dblclick={()=>{
                     if (activeCell !== cell) activeCell = cell
                 }}
            >
                {#if activeCell.x === cell.x && activeCell.y === cell.y}
                    <textarea
                            class="p-1"
                            bind:value={cell.content}
                            oninput={change}
                            use:initInput
                            use:autosize
                            on:focusout={()=>{activeCell={x: -1, y: -1}}}
                    ></textarea>
                {:else}
                    {cell.content}
                {/if}
                {#if cell.y + cell.height !== data.height}
                    <button class="button p-0 m-0 bottom has-background-grey-light"
                            onclick={(e)=>{
                                unite([cell.x,cell.y],[cell.x, cell.y + cell.height]);
                            }}
                    ></button>
                {/if}
                {#if cell.x + cell.width !== data.width}
                    <button class="button p-0 m-0 right has-background-grey-light"
                            onclick={(e)=>{
                                unite([cell.x,cell.y],[cell.x + cell.width, cell.y]);
                            }}
                    ></button>
                {/if}
                {#if cell.width !== 1 || cell.height !== 1}
                    <button class="button p-0 topright m-1"
                            onclick={(e)=>{
                                split(cell.x, cell.y);
                            }}
                    >
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                {/if}
            </div>
        {/each}
    </div>

    <svelte:fragment slot="info">
        You can only merge cells of the same width or same height, in the same column or row!
        Double click on cells to edit content!
    </svelte:fragment>
</DefaultEditorComponent>


<style lang="scss">
  $button-size: 10px;
  div.cell {
    position: relative;
    border: 1px solid white;
    background-color: #eee;
    cursor: text;
    min-width: 50px;
    min-height: 40px;
    padding: calc($button-size / 2);
    button{
      z-index: 2;
      position: absolute;
      width: $button-size;
      height: $button-size;
      &.bottom {
        bottom: calc(0px - $button-size / 2);
        left: calc(50% - $button-size / 2);
      }
      &.right {
        right: calc(0px - $button-size / 2 - 1px);
        top: calc(50% - $button-size / 2);
      }
      &.topright {
        top: 0;
        right: 0;
      }
    }
  }
  div.grid {
    display: grid;
    overflow-x: auto;
    grid-auto-rows: minmax(60px, auto);
  }
  .size-selector {
    gap: 20px;
  }
  textarea {
    width: 100%;
    box-sizing: border-box;
    resize: none;
  }
</style>