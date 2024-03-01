import {Popup} from "../popup/popup.svelte.js";
import type {AttachmentApiInterface} from "./types.js";
import FileManager from "./Attachment.svelte";
import {Icon} from "../common-ui/icon.js";

export class AttachmentPopup extends Popup {
    caption = "File Manager";
    data: {
        collectionLabelMap: Record<string, string>,
        api: AttachmentApiInterface
    }
    component = FileManager;
    icon = Icon.solid("folder")
    buttons = []

    constructor(collectionLabelMap: Record<string, string>, api: AttachmentApiInterface) {
        super();
        this.data = {collectionLabelMap, api};
    }
}