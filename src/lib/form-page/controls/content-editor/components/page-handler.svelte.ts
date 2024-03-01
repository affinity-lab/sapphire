import type BlockConfigInterface from "./blocks/block-config-interface";
import type {BlockConfigInterfaceWithConversion} from "./blocks/block-config-interface";
import {v4 as uuidv4} from 'uuid';

type GeneralBlockConfigInterface = BlockConfigInterface<any, any> | BlockConfigInterfaceWithConversion<any, any, any>

export type ContentType = {
    id: string,
    type: string,
    config: GeneralBlockConfigInterface,
    data: object,
    valid: boolean,
    visible: boolean
}

export type CleanDataType = {
    type: keyof BlockCollection,
    data: object,
    options: object
}

export type BlockCollection = Record<string, GeneralBlockConfigInterface>


export class PageHandler {
    public cleanData: CleanDataType[] = $state([]);
    public content: Array<ContentType> = $state([]);

    constructor(
        public blocks: BlockCollection = {},
        content: Array<CleanDataType> = []
    ) {
        if (content.length !== 0) this.initializeContent(content);
    }

    initializeContent(content: Array<CleanDataType>, insertIndex?: number): void {
        if (!content.every((elem) => Object.keys(this.blocks).includes(elem.type))) {
            let decision = confirm("This saved data contains items which you can't use! Do you want to proceed, and load the available content?");
            if (!decision) return;
        }
        if (insertIndex === undefined) {
            this.overwrite([]);
            insertIndex = 0;
        }
        for (let block of content) {
            if (!this.blocks[block.type]) continue;
            let data = block.data;
            // @ts-ignore
            let toEditorData = this.blocks[block.type].storedToEditorData;
            if (toEditorData) {
                data = toEditorData(block.data);
            }
            this.add(block.type, {data: data, insertIndex})
            insertIndex += 1;
        }
    }

    add(type: string, options: { insertIndex?: number, data?: object } = {}): void {
        let newComp = {
            id: uuidv4(),
            type: type,
            data: options.data || structuredClone(this.blocks[type].data),
            config: this.blocks[type],
            valid: false,
            visible: true
        }
        let insertIndex = options.insertIndex;
        if (insertIndex === undefined) insertIndex = this.itemCount;
        this.content = this.content.slice(0, insertIndex).concat([newComp], this.content.slice(insertIndex));
    }

    swap (from: number, to: number) {
        let item = this.content[from];
        this.content.splice(from, 1)
        this.content = [...this.content.slice(0, to), item, ...this.content.slice(to, Infinity)]

        // let tmp = this.content[from]
        // this.content[from] = this.content[to]
        // this.content[to] = tmp;
        this.refreshContent();
        this.refreshCleanData();
    }

    remove(index: number) {
        this.content.splice(index, 1)
    }

    refreshContent() {
        this.content = this.content.map(x => x);
    }

    get isAllValid(): boolean {
        for (let i of this.content) if (!i.valid) return false;
        return true;
    }

    get itemCount(): number {
        return this.content.length
    }

    refreshCleanData() {
        this.cleanData = this.content.map(
            (elem) => {
                let data = elem.data;
                // @ts-ignore
                let toStoredData = elem.config.editorToStoredData
                if (toStoredData) {
                    data = toStoredData(data)
                }
                return {type: elem.type, data: data, options: elem.config?.options}
            })
    }

    overwrite(newList: Array<ContentType>) {
        this.content = newList;
    }
}
