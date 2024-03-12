import {AbstractControlWithOptions} from "../abstract-control.svelte.js";
import {SvelteComponent} from "svelte";
import Component from "./Component.svelte";

class QuickSearchMultiSelect extends AbstractControlWithOptions{
    component: typeof SvelteComponent = Component;

}