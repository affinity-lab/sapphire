import type BlockConfigInterface from "../block-config-interface";
import EditorVisualTable from "./EditorVisualTable.svelte";
import RenderedVisualTable from "./RenderedVisualTable.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface EditorData {
    cells: Array<Cell>
    width: number,
    height: number
}

type Cell = {
    x: number,
    y: number,
    width: number,
    height: number
    content: string
}


export default class VisualTable implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        cells: [{x:0, y:0, width:1, height:1, content:""}],
        width: 1,
        height: 1
    };
    readonly editor: ConstructorOfATypedSvelteComponent = EditorVisualTable;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedVisualTable;
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

        return errors.length ? errors : true;
    }
}
