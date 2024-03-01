import type {AbstractList} from "./abstract-list.js";


export class ListHandler {
	lists: AbstractList[] = $state([]);
	currentList: AbstractList | undefined = $state(undefined);

	setList(list: new() => AbstractList) {
		let listItem: AbstractList | undefined = undefined;
		for (let li of this.lists) {
			if (li.name === list.name) {
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

