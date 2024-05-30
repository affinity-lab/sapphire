import type {BlockConfigInterfaceWithConversion} from "../block-config-interface.js";
import {v4 as uuidv4} from 'uuid';
import EditorFile from "$lib/form-page/controls/content-editor/components/blocks/file/EditorFile.svelte";
import RenderedFile from "$lib/form-page/controls/content-editor/components/blocks/file/RenderedFile.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface EditorData {
    files: Array<{id: string, file: File}>
}

export interface StoredData {
    files: Array<File>
}

export default class FileUpload implements BlockConfigInterfaceWithConversion<EditorData, Options, StoredData> {
    public options: Options = {

    }
    readonly data: EditorData = {
        files: []
    };
    readonly editor: ConstructorOfATypedSvelteComponent = EditorFile;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedFile;
    readonly messages: Record<string, string> = {
        noFile: "File must be uploaded!"
    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        if (data.files.length === 0) errors.push(this.messages.noFile);

        return errors.length ? errors : true;
    }
    editorToStoredData (data: EditorData): StoredData {
        let newData: {files: Array<File>} = {files: []};
        for (let i of data.files) {
            newData.files.push(i.file);
        }
        return newData;
    }

    storedToEditorData (data: StoredData): EditorData {
        let newData = [];
        for (let file of data.files) {
            newData.push({
                id: uuidv4(),
                file
            })
        }
        return {files:newData};
    }
}
