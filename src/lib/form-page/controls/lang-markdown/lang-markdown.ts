import {AbstractControl} from "../abstract-control.svelte.js";
import Component from "./Component.svelte"
import {Icon} from "../../../common-ui/icon.js"

export class LangMarkdown extends AbstractControl {
    component: ConstructorOfATypedSvelteComponent = Component;
    icon = Icon.regular("clock");
}