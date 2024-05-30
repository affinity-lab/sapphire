import type {Icon} from "../common-ui/icon.js";
import type {Button} from "../common-ui/button/button.svelte.js";

export interface PopupInterface {
    caption: string,
    component: ConstructorOfATypedSvelteComponent | undefined,
    beforeClose: () => (boolean | Promise<boolean>),
    size: "content" | "max"
    icon: Icon | undefined,
    buttons: Button[] | undefined,
}

export abstract class Popup implements PopupInterface {
    public data: any
    public icon: Icon | undefined = undefined;
    public buttons: Button[] | undefined = undefined;
    public caption: string = "";
    public size: "content" | "max" = "content";
    abstract get component(): ConstructorOfATypedSvelteComponent;
    beforeClose: () => (boolean | Promise<boolean>) = () => true;
}
