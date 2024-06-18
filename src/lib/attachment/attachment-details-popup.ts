import {Popup} from "../popup/popup.svelte.js";
import type {Icon} from "../common-ui/icon.js";
import FileViewer from "./AttachmentDetailsPopup.svelte";
import type {Attachment, MetaField} from "./types.js";

function unproxify<T>(val: T): T {
    if (val instanceof Array) return val.map(unproxify)
    if (val instanceof Object) return Object.fromEntries(Object.entries(Object.assign({},val)).map(([k,v])=>[k,unproxify(v)]))
    return val;
}

export class AttachmentDetailsPopup extends Popup {
    icon: Icon
    component: ConstructorOfATypedSvelteComponent = FileViewer;

    beforeClose: () => Promise<boolean> = async () => {
        await this.loadData();
        return true;
    }

    constructor(
        public caption: string,
        data: { file: Attachment, metaFields: MetaField[] },
        public changeMeta: Function,
        private loadData: Function
    ) {
        super();
        this.data = {
            ...data,
            filename: data.file.name,
            metadata: structuredClone(unproxify(data.file.metadata))
        }
        this.icon = this.data.file.icon;
    }
}