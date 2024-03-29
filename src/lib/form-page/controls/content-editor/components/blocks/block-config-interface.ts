import type {SvelteComponent} from "svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export default interface BlockConfigInterface<EditorData, Options> {
    readonly label: string;
    readonly icon: Icon;
    readonly options: Options
    readonly editor: typeof SvelteComponent;
    readonly renderer: typeof SvelteComponent;
    readonly data: EditorData;
    readonly messages: Record<string, string>
    readonly validate: (data: EditorData) => true | string[];
    readonly previewRenderer?: typeof SvelteComponent;
}

export interface BlockConfigInterfaceWithConversion<EditorData, Options, StoredData> extends BlockConfigInterface<EditorData, Options> {
    readonly editorToStoredData?: (data: EditorData) => StoredData,
    readonly storedToEditorData?: (data: StoredData) => EditorData;
}
