import type BlockConfigInterface from "../block-config-interface";
import EditorRichText from "./EditorRichText.svelte";
import RenderedRichText from "./RenderedRichText.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface EditorData {
    title: string,
    subtitle: string,
    imageUrl: string,
    text: string,
    colors: {
        background: string,
        primary: string,
        secondary: string
    }
}




export default class RichText implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        title: "",
        subtitle: "",
        imageUrl: "",
        text: "",
        colors: {
            background: "#ffffff",
            primary: "#000000",
            secondary: "#555555"
        }
    };
    readonly editor: ConstructorOfATypedSvelteComponent = EditorRichText;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedRichText;
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
