import type{ SvelteComponent} from "svelte";
import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";

export class YesNoSwitchControl extends AbstractControl {
    component: typeof SvelteComponent = Component;
    icon = Icon.solid("list")
    constructor(field: string, label: string) {
        super(field, label)
    }
}
