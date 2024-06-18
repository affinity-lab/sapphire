import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";

export class CodeControl extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component;
    icon = Icon.solid("font").color("magenta")
}
