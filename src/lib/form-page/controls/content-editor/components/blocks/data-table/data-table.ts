import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorDataTable from "./EditorDataTable.svelte";
import RenderedDataTable from "./RenderedDataTable.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {
}

export interface EditorData {
    rows: Array<Array<string>>,
    headerRow: boolean,
    headerCol: boolean,
    summaryRow: boolean,
    summaryCol: boolean
    displayed: true;
}



export default class DataTable implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        displayed: true,
        headerRow: false,
        headerCol: false,
        summaryRow: false,
        summaryCol: false,
        rows: [["", ""], ["", ""]]
    };
    readonly editor: typeof SvelteComponent = EditorDataTable;
    readonly renderer: typeof SvelteComponent = RenderedDataTable;
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
