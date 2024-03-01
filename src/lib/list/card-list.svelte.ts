import {AbstractList} from "./abstract-list.js";
import type {SvelteComponent} from "svelte";
import CardListComponent from "./SC_CardList.svelte";
import type {Button} from "../common-ui/button/button.svelte.js";
import type {ListApiInterface} from "./types.js";


export abstract class CardList extends AbstractList {
    public component: typeof SvelteComponent = CardListComponent;

    abstract get api(): ListApiInterface;

    abstract get cardify(): (...args: any) => {
        card: typeof SvelteComponent,
        cardData: any
    }

    constructor() {
        super();

    }

    public hasQuickSearch: boolean = true;
    public filterComponent: typeof SvelteComponent | undefined;
    public orderTypes: Record<string, string> | undefined;
    public pageSize: number = 50;
    public buttons: Button[] = [];
    public refreshOnEvents: Array<number> = [];
    isFiltering: boolean = $state(false);
}