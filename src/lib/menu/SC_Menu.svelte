<script lang="ts">
    import {userStore} from "../lib/user-store.svelte.js";
    import type {MenuItem} from "./menu-item.svelte.js";

    let {menu}: {menu: Array<MenuItem>} = $props();
</script>

<main>
	<ul>
		{#each menu as menuItem}
			{#if userStore.hasRole(menuItem.roles)}
				<li>
					<a onclick={menuItem.actionFn}
						class:has-sub-items={menuItem.subItems}>
						<i class="icon fa-fw {menuItem.icon}" style="{menuItem.icon.colorStyle}"></i>
						{#if !closed}
							<span>{menuItem.label}</span>
						{/if}
						{#if menuItem.subItems}
							<i class="open-close fa-light" class:fa-plus={!menuItem.opened} class:fa-minus={menuItem.opened}></i>
						{/if}
					</a>
				</li>
				{#if menuItem.opened && menuItem.subItems}
					<li>
						<svelte:self menu={menuItem.subItems}/>
					</li>
				{/if}
			{/if}
		{/each}
	</ul>
</main>


<style lang="scss">
	@import "../lib/app";

	main {
		grid-area: nav;
		background-color: $menu--bg;
		border-radius: 8px;
		padding: 8px 4px 8px 8px;
		height: 100%;
		font-size: 16px;

		:is(main) {
			position: relative;
			padding: 0 0 0 24px;
			height: auto;

			ul {
				height: auto;
				overflow: unset;
				margin: 0;
				&:before {
					content: "";
					width: 4px;
					left: 12px;
					top: 4px;
					bottom: 14px;
					position: absolute;
					background-color: $menu--tree-marker;
					border-radius: 4px;
				}
				li {
					position: relative;
					&:before {
						content: "";
						top: 14px;
						left: -12px;
						width: 12px;
						height: 4px;
						position: absolute;
						background-color: $menu--tree-marker;
						border-radius: 4px;
					}
				}
			}
		}

		ul {
			list-style: none;
			padding: 0;
			height: 100%;
			overflow-y: scroll;
			overflow-x: unset;
			margin: 0;
			li a {
				margin-right: 4px;
				display: flex;
				align-items: center;
				cursor: pointer;
				line-height: 32px;
				transition: all 300ms;
				border-radius: 5px;
				&:hover { background-color: $menu--item-hover-bg;}
				i.icon, i.open-close {margin: 0 4px;}
				i.icon {
					font-size: 14px;
					color: $menu--item-icon-color;
				}
				i.open-close {
					font-size: 12px;
					color: $menu--group-marker-color;
					margin-right: 8px;

				}
				&.has-sub-items {
					span {
						color: $menu--group-color;
						font-weight: 600;
						font-size: 14px;
					}
					i.icon {
						font-size: 14px;
						color: $menu--group-icon-color;
					}
				}
				span {
					margin-left: 4px;
					color: $menu--item-color;
					flex-grow: 1;
					font-size: 14px;
				}
			}
		}
	}
</style>