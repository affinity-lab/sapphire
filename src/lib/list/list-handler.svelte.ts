import type {AbstractList} from "./abstract-list.js";


export class ListHandler {
	lists: AbstractList[] = $state([]);
	currentList: AbstractList | undefined = $state(undefined);
	shown: boolean = $state(true);

	closeList () {
		this.shown = false;
	}

	setList(list: new() => AbstractList) {
		this.shown = true;
		let listItem: AbstractList | undefined = undefined;
		for (let li of this.lists) {
			if (li.constructor.name === list.name) {
				listItem = li;
			}
		}
		if (!listItem) {
			listItem = new list();
			this.lists = [...this.lists, listItem];
		}

		this.currentList = listItem;
	}
}

export const listHandler = new ListHandler();
export default listHandler;

