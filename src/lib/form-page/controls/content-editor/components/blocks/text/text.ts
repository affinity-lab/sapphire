import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface.js";
import {wordCounter} from "../../../word-counter.js";
import EditorText from "$lib/form-page/controls/content-editor/components/blocks/text/EditorText.svelte";
import RenderedText from "$lib/form-page/controls/content-editor/components/blocks/text/RenderedText.svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export interface Options {
    maxLength: number,
    minLength: number
    maxWords: number,
    minWords: number,
    markdown: boolean
}

export interface EditorData {
    text: string
    marked: boolean
}


export default class Text implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {
        maxLength: Infinity,
        minLength: 0,
        maxWords: Infinity,
        minWords: 0,
        markdown: true
    }
    readonly data: EditorData = {
        text: "",
        marked: true
    };
    readonly editor: typeof SvelteComponent = EditorText;
    readonly renderer: typeof SvelteComponent = RenderedText;
    readonly messages: Record<string, string> = {
        maxLength: "You've exceeded the maximum number of characters!",
        minLength: "You haven't entered enough characters yet!",
        maxWords: "You've exceeded the maximum number of words!",
        minWords: "You haven't entered enough words yet!"
    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
        this.data.marked = this.options.markdown;
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        if (data.text.length > this.options.maxLength) errors.push(this.messages.maxLength);
        if (data.text.length < this.options.minLength) errors.push(this.messages.minLength)
        if (wordCounter(data.text) > this.options.maxWords) errors.push(this.messages.maxWords);
        if (wordCounter(data.text) < this.options.minWords) errors.push(this.messages.minWords);

        return errors.length ? errors : true;
    }
}
