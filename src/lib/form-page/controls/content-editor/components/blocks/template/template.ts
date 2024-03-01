import type {SvelteComponent} from 'svelte';
import type {BlockConfigInterfaceWithConversion} from "../block-config-interface";
import EditorTemplate from "./EditorTemplate.svelte";
import RenderedTemplate from "./RenderedTemplate.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {
    example: number
}

export interface EditorData {
    text: string
}

export interface StoredData {
    text: string,
    randomNumber: number
}


export default class Template implements BlockConfigInterfaceWithConversion<EditorData, Options, StoredData> {
    public options: Options = {
        example: 10
    }
    readonly data: EditorData = {
        text: ""
    };
    readonly editor: typeof SvelteComponent = EditorTemplate;
    readonly renderer: typeof SvelteComponent = RenderedTemplate;
    readonly messages: Record<string, string> = {
        example_error: "This is an error message from config.valid! Text must be exactly 10 characters."
    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        // Error checking here, push to errors list
        if (data.text.length !== 10) errors.push(this.messages.example_error);

        return errors.length ? errors : true;
    }

    editorToStoredData (data: EditorData): StoredData {
        return {
            text: data.text,
            randomNumber: Math.random()
        }
    }

    storedToEditorData(data: StoredData): EditorData {
        return {
            text: data.text
        }
    }
}
