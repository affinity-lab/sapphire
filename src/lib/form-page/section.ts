import type {AbstractControl} from "./controls/abstract-control.svelte.js";

export class Section {
    controls: AbstractControl[] = []

    constructor(public label: string) {
    }

    add(i: AbstractControl) {
        this.controls.push(i)
        return this;
    }
}