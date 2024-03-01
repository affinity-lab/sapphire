<script lang="ts">
    import type {EditorData} from "./data-table";

    export let data: EditorData;
    export let preview = false;

</script>

{#if data.displayed}
    <div class="table-wrapper">
        <table class="table is-fullwidth is-narrow"
               class:summary-row={data.summaryRow}
               class:summary-col={data.summaryCol}
               class:header-row={data.headerRow}
               class:header-col={data.headerCol}
        >
            <tbody>
                {#each data.rows as row, rowindex}
                    <tr>
                    {#each row as cell, colindex}
                       <td class="p-1">
                           {cell}
                       </td>
                    {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
{/if}

<style lang="scss">
    $header-bg-color: black;
    $summary-bg-color: #eee;
    $header-color: white;
    table.summary-row tr:last-child td, table.summary-col tr td:last-child {
      background-color: $summary-bg-color;
    }
    table.header-row tr:first-child td, table.header-col tr td:first-child {
      background-color: $header-bg-color;
      color: $header-color;
    }
    .table-wrapper {
      width: 100%;
      overflow-x: auto;
    }
    td:empty {
      font-style: italic;
      color: lightgray;
      text-align: center;
      &:before {
        content: '-'
      }
    }
</style>