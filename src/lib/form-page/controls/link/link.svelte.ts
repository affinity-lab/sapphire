import {AbstractControl} from "$lib/form-page/controls/abstract-control.svelte.js";
import Component from "$lib/form-page/controls/link/Component.svelte";
import type {SvelteComponent} from "svelte";

export type Link = {
    label: string,
    onClick: (itemField: any) => void
}
export type LinkGetter = (itemField: any) => Link | Link[]

export class LinkControl extends AbstractControl {
    component: typeof SvelteComponent = Component
    links: Link[] = $state([]);

    constructor(field: string, label: string, public _links: Link | Link[] | LinkGetter) {
        super(field, label);
    }

    async createLinks (itemField: any) {
        let links: any

        if (typeof this._links === "function") links = await this._links(itemField);
        else links = this._links;

        if (Array.isArray(links)) this.links = links;
        else this.links = [links];
    }
}