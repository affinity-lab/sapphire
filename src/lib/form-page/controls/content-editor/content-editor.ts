import {AbstractControl} from "$lib/form-page/controls/abstract-control.svelte.js";
import Component from "$lib/form-page/controls/content-editor/Component.svelte";
import {Icon} from "$lib/common-ui/icon.js";
import type {SvelteComponent} from "svelte";


export class ContentEditor extends AbstractControl {
    component: typeof SvelteComponent = Component
    icon = Icon.solid("pencil")

    constructor(field: string, label: string, public blocks: Record<string, any>, public files: object) {
        super(field, label);
    }
}