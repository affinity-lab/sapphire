<script lang="ts">
	import pageHandler from "./page-handler.svelte.js";
</script>

{#each pageHandler.pages as page (page.id)}
	<main class:active={pageHandler.activePage === page}>
		<svelte:component this={page.component} page={page}/>
	</main>
{/each}

<style lang="scss">
	main { display: none }
	main.active { display: block }
</style>