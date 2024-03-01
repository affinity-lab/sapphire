<script lang="ts">
    import {marked} from "marked";

    let {data, preview} = $props();

</script>


<p>
    {#if data.marked}
        {@html marked(data.text)}
    {:else}
        {data.text}
    {/if}
</p>
