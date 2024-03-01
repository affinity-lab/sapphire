<script lang="ts">
    import {Icon} from "$lib/common-ui/icon.js";
    import {Button} from "$lib/common-ui/button/button.svelte.js";
    import ButtonComponent from "$lib/common-ui/button/ButtonComponent.svelte";

    let {headers, data, clickOnRow, tooltip}: {
        headers: Record<string, string[]>,
        data: any[][],
        clickOnRow: (row: any[], index: number) => void,
        tooltip: (index: number) => string
    } = $props();
</script>


<table>
    <thead>
    <tr>
        {#each Object.entries(headers) as [collection, subtitles]}
            <td colspan={subtitles.length}>{collection}</td>
        {/each}
    </tr>
    <tr>
        {#each Object.values(headers) as subtitles}
            {#each subtitles as subtitle}
                <td>{subtitle}</td>
            {/each}
        {/each}
    </tr>
    </thead>

    <tbody>
    {#each data as row}
        <tr>
            {#each row as data, index}
                <td on:click={() => {clickOnRow(row, index)}} title={tooltip(index)}>
                    {#if data instanceof Icon}
                        <i class="{data}" style="{data.colorStyle}"></i>
                    {:else if data instanceof Button}
                        <ButtonComponent button={data} />
                    {:else}
                        {data}
                    {/if}
                </td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>


<style lang="scss">
  @use "sass:list";
  @import "$lib/lib/app.scss";

  $thead-colors: $color-gray-3, $color-gray-2, $color-gray-1;
  table {
    color: white;
    font-size: 12px;
    cursor: pointer;
    border-spacing: 0;

    th, td {
      white-space: nowrap;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 2px 4px;
    }

    thead {
      text-align: center;
      background-color: black;
      position: sticky;
      top: 0;
      tr:first-child {
        @for $i from 1 to length($thead-colors) {
          td:nth-child(#{$i}) {
            background-color: list.nth($thead-colors, $i);
          }
        }
      }
    }
  }

  tbody {
    tr:nth-child(even) {
      background-color: #0003;
    }
    tr:has(td:hover) td {
      background-color: black !important;
      transition: .3s;
    }
  }
</style>