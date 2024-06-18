import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";

export class IconControl extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component;
    icon = Icon.solid("icons")
    constructor(field: string, label: string, public isColorPicker: boolean = true) {
        super(field, label)
    }
}
