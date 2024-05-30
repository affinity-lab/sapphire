import type BlockConfigInterface from "../block-config-interface";
import EditorUserCard from "./EditorUserCard.svelte";
import RenderedUser from "./RenderedUser.svelte";
import type {Icon} from "$lib/common-ui/icon.js";


export interface Options {
    allowedFields: string[],
    disallowedFields: string[],
    mustHave: string[]
}

export interface EditorData {
    id: string,
    fields: Record<string, boolean>
}


export default class Usercard implements BlockConfigInterface<EditorData, Options> {
    readonly options: Options = {
        allowedFields: ["name", "email", "mobile", "neptun", "phone", "position"],
        disallowedFields: [],
        mustHave: []
    };
    readonly data: EditorData = {
        id: "",
        fields: {
            name: false,
            email: false,
            mobile: false,
            neptun: false,
            phone: false,
            position: false
        }
    };
    readonly editor: ConstructorOfATypedSvelteComponent = EditorUserCard;
    readonly renderer: ConstructorOfATypedSvelteComponent = RenderedUser;
    readonly messages: Record<string, string> = {
        invalidId: "Id must be non-empty, and can only be a positive integer!",
        noField: "At least one field must be displayed!"
    }

    constructor(readonly label: string, readonly icon: Icon, options: Partial<Options> = {}) {
        this.options = {
            ...this.options,
            ...options
        }
        this.validateOptions();

        for (let i of this.options.mustHave) {
            this.data.fields[i] = true;
        }
    }

    validate (data: EditorData): true | Array<string> {
        let errors: string[] = [];

        if (
            data.id === "" ||
            isNaN(Number(data.id)) ||
            Number(data.id) < 0 ||
            !Number.isInteger(Number(data.id))
        ) errors.push(this.messages.invalidId);

        if (Object.values(data.fields).every(elem => !elem)) errors.push(this.messages.noField);

        return !errors.length ? true : errors;
    }

    validateOptions (): void {
        let errors: string[] = [];

        for (let i of this.options.disallowedFields) {
            if (this.options.mustHave.includes(i)) errors.push(`Field "${i}" cannot be both mandatory and disallowed`)
        }
        for (let i of this.options.mustHave) {
            if (!this.options.allowedFields.includes(i)) errors.push(`Field "${i}" must be allowed to be mandatory`)
        }

        if (errors.length !== 0) throw Error(errors.join("; "))
    }
}