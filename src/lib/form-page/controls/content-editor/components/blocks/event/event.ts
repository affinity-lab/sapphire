import type {SvelteComponent} from 'svelte';
import type BlockConfigInterface from "../block-config-interface";
import EditorEvent from "./EditorEvent.svelte";
import RenderedEvent from "./RenderedEvent.svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export interface Options {

}

export interface EditorData {
    startTime: string
    endTime: string,
    name: string,
    description: string,
    locationLabel: string,
    locationLong: string,
    locationLat: string,
    url: string,
    subEvents: Array<{
        startTime: string
        endTime: string,
        name: string,
        description: string,
        locationLabel: string,
        locationLong: string,
        locationLat: string,
        id: string
    }>
}


export default class Event implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        startTime: "",
        endTime: "",
        name: "",
        description: "",
        locationLabel: "",
        locationLong: "",
        locationLat: "",
        url: "",
        subEvents: []
    };

    readonly editor: typeof SvelteComponent = EditorEvent;
    readonly renderer: typeof SvelteComponent = RenderedEvent;
    readonly messages: Record<string, string> = {
        noDate: "A starting and an ending date must be specified for the main event!",
        noName: "Event must have a name!"
    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        if (!data.startTime || !data.endTime) errors.push(this.messages.noDate)
        if (!data.name) errors.push(this.messages.noName)

        return errors.length ? errors : true;
    }

}
