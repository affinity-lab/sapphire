import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";

export class DateTimeControl extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component;
    layout: "row" | "column" = "row";
    icon = Icon.solid("calendar")
}
