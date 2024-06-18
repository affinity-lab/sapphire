import {AbstractControl} from "$lib/form-page/controls/abstract-control.svelte.js";
import Component from "$lib/form-page/controls/link/Component.svelte";
import type {MaybePromise} from "@sveltejs/kit";
import type {ControlOptions} from "../controls.js";

export type Link = {
    label: string,
    onClick: (itemField: any) => void
}
export type LinkGetter = (itemField: any) => MaybePromise<Link | Link[]>

export class LinkControl extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component
    links: Link[] = $state([]);
    private readonly _links: Link | Link[] | LinkGetter;

    constructor(field: string, label: string, options: ControlOptions & {link: Link | Link[] | LinkGetter}) {
        super(field, label);
        this._links = options.link;
    }

    async createLinks (itemField: any) {
        let links: any

        if (typeof this._links === "function") links = await this._links(itemField);
        else links = this._links;

        if (Array.isArray(links)) this.links = links;
        else this.links = [links];
    }
}