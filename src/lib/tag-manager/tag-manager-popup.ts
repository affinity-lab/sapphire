import {Popup} from "$lib/popup/popup.svelte.js";
import TagManagerComponent from "$lib/tag-manager/TagManagerComponent.svelte";
import {Icon} from "$lib/common-ui/icon.js";
import type {TagManager} from "$lib/tag-manager/tag-manager.svelte.js";

export class TagManagerPopup extends Popup {
    component = TagManagerComponent as ConstructorOfATypedSvelteComponent;
    caption = "Címke kezelő";
    icon = Icon.regular("tags");
    size: "content" | "max" = "content";

    constructor(public data: {tagManager: TagManager}) {
        super();
    }
}