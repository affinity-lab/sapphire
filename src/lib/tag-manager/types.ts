import type {TagApi} from "$lib/tag-manager/tag-api.js";

export type TagApiFactory = (endpoint: string) => TagApi
export type Tag = {
    name: string,
    predefined: boolean
}