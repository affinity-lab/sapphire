import type BlockConfigInterface from "../block-config-interface";
import EditorVideo from "$lib/form-page/controls/content-editor/components/blocks/video/EditorVideo.svelte";
import RenderedVideo from "$lib/form-page/controls/content-editor/components/blocks/video/RenderedVideo.svelte";
import type {Icon} from "$lib/common-ui/icon.js";

export interface Options {

}

export interface EditorData {
    videoId: string
    startSecond: number
}



export default class Video implements BlockConfigInterface<EditorData, Options> {
    public options: Options = {

    }
    readonly data: EditorData = {
        videoId: "",
        startSecond: 0
    };
    readonly editor: ConstructorOfATypedSvelteComponent = EditorVideo;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedVideo;
    readonly messages: Record<string, string> = {

    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        return errors.length ? errors : true;
    }
}
