<script lang="ts">
    import {marked} from "marked";
    // marked.use({headerIds: false, breaks: true})

    let {data, preview} = $props();

    function getCell (x, y) {
        let cellIndex = data.cells.findIndex((cell) => cell.x === x && cell.y === y);
        if (cellIndex === -1) return false;
        return data.cells[cellIndex];
    }
</script>

<div>
    <table>
        <tbody>


        {#key data.cells}
            {#each {length: data.height} as _, y}
                <tr>
                    {#each {length: data.width} as _, x}
                        {#if getCell(x, y)}
                            <td class="p-2" colspan={getCell(x, y).width} rowspan={getCell(x, y).height}>
                                {@html getCell(x, y).content ? marked(getCell(x, y).content) : '-'}
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/each}
        {/key}</tbody>
    </table>
</div>

<style lang="scss">
    td {
      border: 1px solid black;
    }
    table {
      width: 100%;
      text-align: center;
    }
    tr:empty {
      display: none;
    }
</style>