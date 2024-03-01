import type{ SvelteComponent} from "svelte";
import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControlWithOptions} from "../abstract-control.svelte.js";

export class CheckboxControl extends AbstractControlWithOptions {
    component: typeof SvelteComponent = Component;
    icon = Icon.solid("check-square")
}
