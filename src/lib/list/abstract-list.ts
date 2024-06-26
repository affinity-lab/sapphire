import type {Button} from "../common-ui/button/button.svelte.js";
import type {Icon} from "$lib/common-ui/icon.js";

export abstract class AbstractList {
    id: number = Math.random();
    abstract get component(): ConstructorOfATypedSvelteComponent;

    buttons: Button[] = [];

    get name(): string {
        return this.constructor.name;
    }

    get icon(): undefined | Icon {
        return undefined;
    }
}