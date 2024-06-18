

<script lang="ts">
    import "@fontsource-variable/baloo-chettan-2";
    import SC_Header from "./header/SC_Header.svelte";
    import SC_Menu from "./menu/SC_Menu.svelte";
    import SC_Tabs from "./page/SC_PageTabs.svelte";
    import pageHandler, {PageHandler} from "./page/page-handler.svelte.js";
    import SC_Pages from "./page/SC_Pages.svelte";
    import listHandler, {ListHandler} from "./list/list-handler.svelte";
    import SC_Lists from "./list/SC_Lists.svelte";
    import popupHandler from "./popup/popup-handler.svelte.js";
    import SC_Popups from "./popup/SC_Popups.svelte";
    import Toast from "./common-ui/toast/Toast.svelte";

    let {menu, brand, onload, logout, hasUser = true}: {
		menu: any,
		brand: any,
		onload: (pageHandler: PageHandler, listHandler: ListHandler) => void,
		logout: () => void,
		hasUser: boolean
	} = $props();

	onload(pageHandler, listHandler);
</script>

<main>
	<header>
		<SC_Header {brand} logout={() => logout()} {hasUser}/>
	</header>
	<section>
		<div class="menu">
			<SC_Menu {menu}/>
		</div>
		{#if listHandler.lists.length}
			<div class="list">
				<SC_Lists/>
			</div>
		{/if}
		{#if pageHandler.pages.length}
			<div class="tabs">
				<SC_Tabs/>
			</div>
		{/if}
		<div class="content">
			<SC_Pages/>
		</div>
	</section>

</main>
<Toast/>
{#if popupHandler.stack.length}>
	<SC_Popups/>
{/if}
<style lang="scss">

	@import "lib/app";

	main {
		position: fixed;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		background-color: $background-color;
		header { height: 80px;}
		section {
			flex-grow: 1;
			display: flex;
			flex-direction: row;
			gap: 16px;
			align-items: stretch;
			padding: 16px;
			overflow: hidden;
			div { height: 100%;}
			div.menu { width: 200px; min-width: 200px;}
			div.list {width: 344px; min-width: 344px;}
			div.tabs {width: 200px; min-width: 200px;}
			div.content {
				overflow: auto;
				flex-grow: 1;
				padding-right: 4px;
			}
		}
	}

</style>