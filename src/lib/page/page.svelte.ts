import type {SvelteComponent} from "svelte";
import {Icon} from "../common-ui/icon.js";


export abstract class Page {
	static pageId: string;
	public label = $state("");
	public icon = $state(Icon.light("question"));
	abstract get component(): typeof SvelteComponent;
	public changed: boolean = $state(false);

	set pageId(id: string) {
		Object.defineProperty(this.constructor, "pageId", {value: id});
	}
	get pageId(): string {
		if (!this.constructor.hasOwnProperty("pageId")) this.pageId = crypto.randomUUID();
		return (this.constructor as typeof Page).pageId!;
	}
	get instanceId(): any {return "";};
	get uid() {return this.pageId + "(" + this.instanceId?.toString() + ")";}
	id = $derived(this.uid);

	constructor() {}
}