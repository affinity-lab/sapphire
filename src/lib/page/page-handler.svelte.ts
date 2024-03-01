import {Page} from "./page.svelte.js";


export class PageHandler {
	pages: Page[] = $state([]);
	activePage: Page | undefined = $state(undefined);

	open(page: Page) {
		if (!this.pages.map(x => x.id).includes(page.id)) this.pages = [...this.pages, page];
		this.activePage = this.pages.find(pageItem => pageItem.id === page.id);
	}
	close(page: Page) {
		const pageIndex = this.pages.indexOf(page);
		this.pages = this.pages.filter(x => x.id !== page.id);

		if (this.activePage === page) {
			if (this.pages[pageIndex]) this.activePage = this.pages[pageIndex];
			else if (pageIndex > 0) this.activePage = this.pages[pageIndex - 1];
			else this.activePage = undefined;
		}
	}
	closeAll() {this.pages = [];}
}

export const pageHandler = new PageHandler();
export default pageHandler;