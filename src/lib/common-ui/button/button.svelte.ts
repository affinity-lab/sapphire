import {Icon} from "../icon.js";

export class Button {
    icon: Icon | null = null;
    label: string | null = null;
    public _width: string = "auto";
    public _tooltip: string | undefined;
    public _meta: any;

    private isActive: (item: any) => boolean = () => true;

    constructor(label: string | Icon | {label: string, icon: Icon}, public onClick: Function, public roles?: string | string[]) {
        if (typeof label === "string") {
            this.label = label;
        } else if (label instanceof Icon) {
            this.icon = label;
        } else {
            this.label = label.label;
            this.icon = label.icon;
        }
    }

    meta (data: any) {
        this._meta = data;
        return this;
    }

    tooltip (text: string):Button {
        this._tooltip = text;
        return this;
    }

    setIsActive (callbackFn: (item: any) => boolean):Button {
        this.isActive = callbackFn;
        return this
    }

    width (w: string):Button {
        this._width = w;
        return this;
    }
}