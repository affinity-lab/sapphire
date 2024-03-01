import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorTemplate from "./EditorTemplate.svelte";
import RenderedTemplate from "./RenderedTemplate.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {
}

export interface EditorData {
}



export default class Template implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {
    }
    readonly data: EditorData = {

    };
    readonly editor: typeof SvelteComponent = EditorTemplate;
    readonly renderer: typeof SvelteComponent = RenderedTemplate;
    readonly messages: Record<string, string> = {

    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        return errors.length ? errors : true;
    }
}
