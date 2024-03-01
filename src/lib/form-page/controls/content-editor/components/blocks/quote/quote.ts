import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorQuote from "./EditorQuote.svelte";
import RenderedQuote from "./RenderedQuote.svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export interface Options {
}

export interface EditorData {
    text: string;
    author: string;
}



export default class Quote implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {
    }
    readonly data: EditorData = {
        text: "",
        author: ""
    };
    readonly editor: typeof SvelteComponent = EditorQuote;
    readonly renderer: typeof SvelteComponent = RenderedQuote;
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
