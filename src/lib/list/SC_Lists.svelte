<script lang="ts">
	import listHandler from "./list-handler.svelte.js";
</script>

{#each listHandler.lists as list (list.id)}
	<div class:hidden={listHandler.currentList !== list} class="list">
		<svelte:component this={list.component} {list}/>
	</div>
{/each}

<style lang="scss">
	div.hidden {display: none;}
	div.list {height: 100%;}
</style>