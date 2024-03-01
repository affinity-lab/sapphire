<script lang="ts">
	import {Icon} from "$lib/common-ui/icon.js";

	let {card}: { card: any } = $props();
</script>


<main on:click={()=>{card.onclick ? card.onclick() : undefined}} class:active={card.active}>
	{#if card.header.img}
		<img src="{card.header.img}?{Math.random()}">
	{/if}

	<div class="header">
		{#if card.header.avatar }
			{#if card.header.avatar instanceof Icon}
				<i class="fa-fa {card.header.avatar}" style={card.header.avatar.colorStyle}></i>
			{:else}
				<img src="{card.header.avatar}?{Math.random()}" />
			{/if}
		{/if}
		<div>
			<h2>
				{#if card.header.icon }
					<i class={card.header.icon} style={card.header.icon.colorStyle}></i>
				{/if}
				{card.header.title}</h2>
			<h3>{card.header.subtitle}</h3>
		</div>
	</div>

	{#if card.description}
		<div class="description">
			{card.description}
		</div>
	{/if}

	{#if card.properties}
		<div class="properties">
			{#each Object.entries(card.properties) as [key, value]}
				<div class="label">{key}</div>
				<div class="value">{value}</div>
			{/each}
		</div>
	{/if}

	{#if card.footer}
		<div class="footer" on:click={(e) => e.stopPropagation()}>
			{#each card.footer as button}
				<button class="{button.icon}" on:click={() => button.onclick()}></button>
			{/each}
		</div>
	{/if}
</main>

<style lang="scss">
	@import "../lib/app";

	main {
		&:not(.active) {
			>*{opacity: $card--inactive-opacity;}
			background-color: $background-color;
			border: 1px solid $color-gray-2;
		}
		cursor: pointer;
		background-color: $card--bg;
		transition: all .3s;
		&:hover {
			background-color: $card--hover-bg;
		}
		border-radius: 8px;
		margin-bottom: 8px;
		overflow: hidden;
		color: $card--text-color;
		> div:not(:first-child) { border-top: $card--border;}
		h3, h4, h5 { margin: 0;}

		img {
			&:hover {
				aspect-ratio: 16/9;
			}
			aspect-ratio: 16 / 4;
			transition: all .3s;
			transition-delay: .5s;
			object-fit: cover;
			object-position: 50% 50%;
			width: 100%;
			border:4px solid transparent;
			border-radius: 8px;
		}

		.header {
			display: flex;
			padding: 8px;
			img, > i {
				width: 32px;
				height: 32px;
				border-radius: 24px;
				margin-right: 8px;
				font-size: 32px;
			}
			div {
				* {margin: 0;}
				h2 {
					color: $card--title-color;
					font-size: 14px;
					line-height: 18px;
					i {
						margin-right: 4px;
					}
				}
				h3 {
					color: $card--subtitle-color;
					font-size: 12px;
					line-height: 12px;
					font-weight: normal;
				}
			}
		}

		.description {
			padding: 8px;
			font-size: 12px;
			color: $card--description-color;
		}

		.properties {
			padding: 0 8px;
			display: grid;
			line-height: 24px;
			grid-template-columns: auto 1fr;
			font-size: 12px;
			div.label {
				color: $card--property-label-color;
			}
			div.value {
				font-weight: bolder;
				color: $card--property-value-color;
				padding-left: 8px;
			}
		}

		.footer {
			display: flex;
			justify-content: space-evenly;
			overflow: hidden;
			border-bottom: 0;
			border-left: 0;
			border-right: 0;
			border-top: $card--border;

			button {
				transition: all .3s;
				cursor: pointer;
				flex-grow: 1;
				color: $card--button-color;
				background-color: $card--button-bg;
				font-size: 16px;
				padding: 8px;
				border: 0;
				&:first-child {
					border-bottom-left-radius: 8px;
				}
				&:last-child {
					border-bottom-right-radius: 8px;
				}
				&:not(:first-child) {
					border-left: $card--border;
				}
			}

			button:hover {
				background-color: $card--button-hover-bg;
			}
		}

	}
</style>