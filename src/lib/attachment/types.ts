import type {Icon} from "../common-ui/icon.js";

export type Attachment = {
    name: string,
    size: number,
    id: string,
    metadata: Record<string, any>
    url: string
    icon: Icon,
    downloadUrl: string,

} & ({ isImage: true, imageUrl: (width: number, height: number) => string } | { isImage: false })

export type MetaField = {
    name: string,
} & ({ type: "string" } | { type: "enum", options: string[] })

export type Collection = {
    name: string,
    items: Attachment[],
    publicMetaFields: Array<MetaField>
    rules: {
        size: number,
        limit: number
        ext?: string[],
    }
}

export interface AttachmentApiInterface {
    upload: (collectionName: string, fileList: FileList) => Promise<boolean>;
    delete: (collectionName: string, filename: string) => Promise<boolean>;
    getCollections: () => Promise<Collection[]>
    reorder: (collectionName: string, fileName: string, position: number) => Promise<boolean>
    saveMetaData: (collectionName: string, fileName: string, newMetaData: any, newName: string) => Promise<boolean>
}

export type AttachmentApiFactory = (endpoint: string, itemId: number) => AttachmentApiInterface;