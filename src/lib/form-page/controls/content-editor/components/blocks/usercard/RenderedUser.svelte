<script lang="ts">
    let {data, preview} = $props();

</script>


<div class="usercard box content is-narrow">
    <h2 class="is-size-4">#{data.id}</h2>
    <ul>
        {#each Object.keys(data.fields) as option}
            {#if data.fields[option]}
                <li>{option}</li>
            {/if}
        {/each}
    </ul>
</div>

<style lang="scss">
    .usercard {
      width: 30%;
      min-width: 150px;
    }
</style>