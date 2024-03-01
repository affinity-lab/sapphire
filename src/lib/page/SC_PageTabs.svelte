<script lang="ts">
	import pageHandler from "./page-handler.svelte.js";
	import {Icon} from "../common-ui/icon.js";
</script>

<main>
	{#each pageHandler.pages as page (page.id)}
		<article on:click={()=>{pageHandler.open(page)}} class:active={pageHandler.activePage === page}>
			<i class="fa-fw {page.icon}" style="{page.icon.colorStyle}"></i>
			<span title={page.label}>
				{#if (page.changed)}
					<i class="fas fa-asterisk"></i>
				{/if}
				{page.label}
			</span>
			<button
				on:click={(e) => {!page.changed || confirm("Are you sure?") ? pageHandler.close(page) : false; e.stopPropagation()}}>
				<i class={Icon.solid("xmark")}></i>
			</button>
		</article>
	{/each}
</main>

<style lang="scss">
	@import "../lib/app";
	$tab--asterisk-color: orangered;
	$tab--close-color: orangered;

	main {
		border-radius: 8px;
		background-color: $color-gray-1;
		padding: 4px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		height: 100%;
		overflow-y: auto;
	}

	article {
		cursor: pointer;
		transition: all .3s;
		border: 1px solid $color-gray-0;
		color: $color-white;
		border-radius: 4px;
		padding: 4px;
		background-color: $color-gray-1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		span {
			flex-grow: 1;
			padding-left: 8px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			i {
				vertical-align: super;
				font-size: 8px;
				color: $tab--asterisk-color;
			}
		}
		button {
			transition: all .3s;
			opacity: 0;
			background: none;
			border: none;
			color: $tab--close-color;
			cursor: pointer;
		}
		&:hover {
			button {
				opacity: 1;
				transform: rotate(180deg);
			}
			background-color: $color-gray-3;
		}
		&.active {
			span {font-weight: bold;}
			background-color: $color-gray-2;
			border: 1px solid transparent;
		}
	}
</style>