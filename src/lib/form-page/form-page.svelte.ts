import SC_FormPage from "./SC_FormPage.svelte";
import {Page} from "../page/page.svelte.js";
import {Button} from "../common-ui/button/button.svelte.js";
import {Icon} from "../common-ui/icon.js";
import type {Section} from "./section.js";
import {proceed} from "../common-ui/confirm/proceed.svelte.js";
import type {ErrorObject, FormApiInterface, FormData} from "./types.js";
import toastHandler from "$lib/common-ui/toast/toast-handler.svelte.js";
import type {AbstractControl} from "./controls/abstract-control.svelte.js";

export abstract class FormPage extends Page {
	component: ConstructorOfATypedSvelteComponent = SC_FormPage;
	item: FormData = $state({id: ""});
	public itemId: number | null = $state(null);
	abstract get api(): FormApiInterface

	sections: Section[] = [];
	buttons: Button[] = $state([
		FormPage.reloadButton(this),
		FormPage.saveButton(this)
	]);

	abstract getLabel(item: any): string;

	get instanceId() {return this.itemId;}

	static saveButton(page: FormPage, roles?: string | string[]) {
		return new Button(Icon.solid("save").color("lightgreen"), () => page.onSave(), roles);
	}

	static reloadButton(page: FormPage, roles?: string | string[]) {
		return new Button(Icon.solid("rotate").color("lightblue"), () => {
			proceed("Are you sure you want to continue? Unsaved changes might get lost.", () => page.onReload(), () => {});
		}, roles);
	}

	handleError (errorObject: ErrorObject) {
		for (let section of this.sections) {
			for (let control of section.controls) {
				if (errorObject[control.field]) control.setErrors(errorObject[control.field])
			}
		}
	}

	clearErrors () {
		for (let section of this.sections) {
			for (let control of section.controls) {
				control.clearErrors();
			}
		}
	}

	get controls(): Array<AbstractControl> {
		return this.sections.flatMap(section => section.controls);
	}

	protected constructor(itemId: number | null, public values?: Record<string, any>) {
		super();
		this.itemId = itemId;
	}

	async initialize() {
		this.label = "Loading...";
		this.item = (await this.api.get(this.itemId, this.values));
		this.item = {
			...this.item,
			...this.item.data
		}
		this.label = this.getLabel(this.item);
		this.changed = false;
		this.buttons = [...this.buttons];
	}


	async onSave() {
		this.clearErrors()
		let res = await this.api.save(this.itemId, this.item);
		if (typeof res === "number") {
			if (this.itemId === null) this.itemId = res;
			await this.initialize();
			toastHandler.addToast("success", "Saved");
			return res;
		} else {
			this.handleError(res);
			toastHandler.addToast("warning", "Could not save!")
		}
	}

	onChange() {this.changed = true;}
	onReload() {
		this.initialize().then();
	}
}


