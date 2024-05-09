import {Icon} from "../../common-ui/icon.js";
import type {SvelteComponent} from "svelte";
import type {OptionApi, Options} from "$lib/form-page/controls/controls.js";
import type {ErrorArray} from "../types.js";


export abstract class AbstractControl {
    layout: "row" | "column" | "forceRow" = "row";
    errors: string[] = $state([])
    icon: Icon = Icon.solid("keyboard");
    roles: string[] | undefined = undefined;

    abstract get component(): typeof SvelteComponent;

    setRoles (roles: string | string[]) {
        if (typeof roles === "string") {
            this.roles = [roles];
        } else {
            this.roles = roles;
        }
        return this;
    }

    setErrors (errorArray: ErrorArray) {
        for (let error of errorArray) {
            this.errors.push(error.message)
        }
    }

    clearErrors () {
        this.errors = [];
    }

    // error(type: string[]) {
    //     let tmp = [] // so that I only have to update errors state once
    //     for (let i of type) {
    //         tmp.push(fieldErrors[i])
    //     }
    //     this.errors = tmp.filter(x => typeof x === "string")
    // }

    constructor(public field: string, public label: string) {
    }
}


export abstract class AbstractControlWithOptions extends AbstractControl {
    dataFormat?: "string" | "array" | "object";

    constructor(field: string, label: string, public options: Options | OptionApi) {
        super(field, label)
    }

    getSaveOptions (input: Record<string, string>) {
        if (this.dataFormat === "object") return input;
        if (this.dataFormat === "array") return Object.keys(input)
        else return Object.keys(input).join(",")
    }

    async getOptionsRecord () {
        let options: Options;

        if (Array.isArray(this.options) || (typeof this.options === 'object') || (typeof this.options === "string")) options = this.options;
        else options = await this.options();

        this.dataFormat = this.getType(options);
        return this.convertToRecord(options);
    }

    convertToRecord (data: Options): Record<string, any> {
        let type = this.getType(data);
        if (type === "string") {
            if (data.length === 0) return {}
            data = (data as string).split(",");
        }
        if (Array.isArray(data)) {
            let obj: Record<string, string> = {}
            for (const option of data) {
                obj[option] = option;
            }
            return obj;
        } else return data as Record<string, string>;
    }

    getType (data: Options): "string" | "array" | "object" {
        if (typeof data === "string") return "string";
        else if (Array.isArray(data)) return "array";
        else return "object";
    }
}