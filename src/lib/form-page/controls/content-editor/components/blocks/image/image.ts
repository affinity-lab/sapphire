import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorImage from "./EditorImage.svelte";
import RenderedImage from "./RenderedImage.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface EditorData {
    url: string,
    title: string,
    description: string,
    alt: string,
    align: "left" | "right" | "justify"
}


export default class Image implements BlockConfigInterface<EditorData, Options> {
    options: Options = {

    }
    readonly data: EditorData = {
        url: "",
        title: "",
        description: "",
        alt: "",
        align: "justify"
    };
    readonly editor: typeof SvelteComponent = EditorImage;
    readonly renderer: typeof SvelteComponent = RenderedImage;

    readonly messages: Record<string, string> = {
        emptyUrl: "Field 'url' must not be empty!",
        emptyAlt: "Field 'alt' must not be empty!"
    }
    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        if (data.url.length === 0) errors.push(this.messages.emptyUrl);
        if (data.alt.length === 0) errors.push(this.messages.emptyAlt);

        return errors.length ? errors : true;
    }
}
