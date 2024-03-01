import type {SvelteComponent} from "svelte";
import type {Icon} from "../common-ui/icon.js";
import type {Button} from "../common-ui/button/button.svelte.js";

export interface PopupInterface {
    caption: string,
    component: typeof SvelteComponent | undefined,
    beforeClose: () => (boolean | Promise<boolean>),
    size: "content" | "max"
    icon?: Icon,
    buttons?: Button[],
}

export abstract class Popup implements PopupInterface {
    public data: any
    public caption: string = "";
    public size: "content" | "max" = "content";
    abstract get component(): typeof SvelteComponent;
    beforeClose: () => (boolean | Promise<boolean>) = () => true;
}
