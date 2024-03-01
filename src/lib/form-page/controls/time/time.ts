import type{ SvelteComponent} from "svelte";
import Component from "./Component.svelte";
import {Icon} from "../../../common-ui/icon.js";
import {AbstractControl} from "../abstract-control.svelte.js";

export class TimeControl extends AbstractControl {
    component: typeof SvelteComponent = Component;
    layout: "row" | "column" = "row";

    icon = Icon.solid("clock")
}
