import {Popup} from "../popup/popup.svelte.js";
import type {Icon} from "../common-ui/icon.js";
import FileViewer from "./AttachmentDetailsPopup.svelte";
import type {Attachment, MetaField} from "./types.js";
import type {SvelteComponent} from "svelte";

export class AttachmentDetailsPopup extends Popup {
    icon: Icon
    component: typeof SvelteComponent = FileViewer;

    beforeClose: () => Promise<boolean> = async () => {
        await this.loadData();
        return true;
    }

    constructor(public caption: string, data: { file: Attachment, metaFields: MetaField[] }, private changeMeta: Function, private loadData: Function) {
        super();
        this.data = {
            ...data,
            filename: data.file.name,
            metadata: structuredClone(data.file.metadata)
        }
        this.icon = this.data.file.icon;
    }
}