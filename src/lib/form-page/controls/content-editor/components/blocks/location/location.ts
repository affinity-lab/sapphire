import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorLocation from "./EditorLocation.svelte";
import RenderedLocation from "./RenderedLocation.svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export interface Options {

}

export interface EditorData {
    name: string,
    long: string,
    lat: string
}

export default class Location implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        name: "",
        long: "",
        lat: ""
    };
    readonly editor: typeof SvelteComponent = EditorLocation;
    readonly renderer: typeof SvelteComponent = RenderedLocation;
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
