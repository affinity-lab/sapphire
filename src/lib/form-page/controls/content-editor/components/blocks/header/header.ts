import Text, {type Options} from "../text/text";
import EditorHeader from "$lib/form-page/controls/content-editor/components/blocks/header/EditorHeader.svelte";
import RenderedHeader from "$lib/form-page/controls/content-editor/components/blocks/header/RenderedHeader.svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export default class Header extends Text {
    readonly editor: ConstructorOfATypedSvelteComponent = EditorHeader;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedHeader;

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        super(label, icon, options);
    }
}
