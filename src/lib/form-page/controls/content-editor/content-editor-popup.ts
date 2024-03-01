import {Popup} from "$lib/popup/popup.svelte";
import {Icon} from "$lib/common-ui/icon.js";
import Editor from "$lib/form-page/controls/content-editor/components/Editor.svelte";
import {type BlockCollection, PageHandler} from "$lib/form-page/controls/content-editor/components/page-handler.svelte";

export class ContentEditorPopup extends Popup {
    icon = Icon.solid("pencil");
    component = Editor;
    size: "content" | "max" = "max";
    caption = "Content Editor";
    pageHandler: PageHandler;

    constructor(public data: {
        blocks: BlockCollection,
        content: any[],     //todo specify type hint
        files: object,
        save: ()=>void
    }) {
        super();
        this.pageHandler = new PageHandler(this.data.blocks, this.data.content)
    }

    beforeClose = () => {
        this.pageHandler.refreshCleanData()
        this.data.save();
        return true;
    }
}