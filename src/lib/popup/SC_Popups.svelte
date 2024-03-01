<script>
    import popupHandler from "./popup-handler.svelte.js";
</script>

{#each popupHandler.stack as popup}
    <svelte:component this={popup.component} {popup} />
{/each}


