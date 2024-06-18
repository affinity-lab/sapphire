import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";
import type {ControlOptions} from "../controls.js";

export class IconControl extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component;
    icon = Icon.solid("icons");
    isColorPicker = true;
    constructor(field: string, label: string, public options: ControlOptions & {isColorPicker: boolean}) {
        super(field, label);
        this.isColorPicker = options.isColorPicker
    }
}
