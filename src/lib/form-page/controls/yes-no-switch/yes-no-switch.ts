import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";

export class YesNoSwitchControl extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component;
    icon = Icon.solid("list")
}
