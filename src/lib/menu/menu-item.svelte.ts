import {Icon} from "../common-ui/icon.js";

export class MenuItem {
	label: string = "untitled";
	color?: string;
	icon: Icon = Icon.solid("caret-right");

	opened: boolean = $state(false);

	onclick: (() => void) | undefined = undefined;
	subItems: MenuItem[] | undefined = undefined;

	roles?: string[];

	constructor(label: MenuView | string, subItems: MenuItem[], roles?: string | string[] | ((role: any) => boolean));
	constructor(label: MenuView | string, onclick: () => void, roles?: string | string[] | ((role: any) => boolean));
	constructor(...args: any) {

		if (typeof args[0] === "string") {
			this.label = args[0];
		} else {
			this.label = args[0].label;
			this.color = args[0].color;
			this.icon = args[0].icon ? args[0].icon : this.icon;
		}

		if (Array.isArray(args[1])) {
			this.subItems = args[1];
		} else {
			this.onclick = args[1];
		}

		this.roles = typeof args[2] === "string" ? [args[2]] : args[2];
	}

	open() {
		this.opened = !this.opened;
	}
}


type MenuView = {
	label: string,
	icon?: Icon,
	color?: string,
}