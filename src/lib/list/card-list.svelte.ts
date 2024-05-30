import {AbstractList} from "./abstract-list.js";
import CardListComponent from "./SC_CardList.svelte";
import type {Button} from "../common-ui/button/button.svelte.js";
import type {ListApiInterface} from "./types.js";


export abstract class CardList extends AbstractList {
    public component: ConstructorOfATypedSvelteComponent = CardListComponent;

    abstract get api(): ListApiInterface;

    abstract get cardify(): (...args: any) => {
        card: ConstructorOfATypedSvelteComponent,
        cardData: any
    }

    constructor() {
        super();

    }

    public hasQuickSearch: boolean = true;
    public filterComponent: ConstructorOfATypedSvelteComponent | undefined;
    public orderTypes: Record<string, string> | undefined;
    public pageSize: number = 50;
    public buttons: Button[] = [];
    public refreshOnEvents: Array<number> = [];
    isFiltering: boolean = $state(false);
}