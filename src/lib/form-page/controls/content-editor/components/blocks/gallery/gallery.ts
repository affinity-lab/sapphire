import type {BlockConfigInterfaceWithConversion} from "../block-config-interface";
import EditorGallery from "./EditorGallery.svelte";
import RenderedGallery from "./RenderedGallery.svelte";
import {v4 as uuidv4} from 'uuid';
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface ImageData {
    url: string,
    title: string,
    description: string,
    alt: string,
    align: "none",
    id: string
}

export interface EditorData {
    title: string,
    images: ImageData[];
}

export interface StoredData {
    title: string,
    images: Array<Omit<ImageData, "id" | "align">>
}


export default class Gallery implements BlockConfigInterfaceWithConversion<EditorData, Options, StoredData> {
    public options: Options = {

    }
    readonly data: EditorData = {
        title: "",
        images: []
    };
    readonly editor: ConstructorOfATypedSvelteComponent = EditorGallery;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedGallery;
    readonly messages: Record<string, string> = {
        emptyGallery: "Gallery must not be empty!",
        emptyUrl: "Field 'url' must not be empty!",
        noTitle: "Gallery must have a title!"
    }
    readonly emptyGalleryImage: ImageData = {
        url: "",
        title: "",
        description: "",
        alt: "",
        align: "none",
        id: ""
    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];
        if (data.images.length === 0) errors.push(this.messages.emptyGallery);
        for (let i of data.images) {
            if (i.url.length === 0) errors.push(this.messages.emptyUrl);
        }
        if(data.title.length === 0) errors.push(this.messages.noTitle);
        return errors.length ? errors : true;
    }

    editorToStoredData (data: EditorData): StoredData {
        return {
            title: data.title,
            images: data.images.map((elem) => {
                return {
                    title: elem.title,
                    url: elem.url,
                    alt: elem.alt,
                    description: elem.description
                }
            })
        }
    }

    storedToEditorData (data: StoredData): EditorData {
        return {
            title: data.title,
            images: data.images.map((elem)=>{
                return {
                    align: "none",
                    id: uuidv4(),
                    ...elem
                }
            })
        }
    }
}
