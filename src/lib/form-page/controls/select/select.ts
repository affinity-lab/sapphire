import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControlWithOptions} from "../abstract-control.svelte.js";

export class SelectControl extends AbstractControlWithOptions {
    component: ConstructorOfATypedSvelteComponent = Component;
    icon = Icon.solid("ballot-check")
}
