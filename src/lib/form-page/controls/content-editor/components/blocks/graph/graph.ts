import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorGraph from "$lib/form-page/controls/content-editor/components/blocks/graph/EditorGraph.svelte";
import RenderedGraph from "$lib/form-page/controls/content-editor/components/blocks/graph/RenderedGraph.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface EditorData {
    title: string,
    lines: Array<{points:Array<number>, name:string}>,
    headers: Array<string>
}



export default class Graph implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        title: "",
        headers: [""],
        lines: []
    };
    readonly editor: typeof SvelteComponent = EditorGraph;
    readonly renderer: typeof SvelteComponent = RenderedGraph;
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
