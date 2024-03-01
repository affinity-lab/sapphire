import popupHandler from "../../popup/popup-handler.svelte.js";
import {Popup} from "../../popup/popup.svelte.js";
import ConfirmComponent from "./ConfirmComponent.svelte";
import {Icon} from "../icon.js";
import {Button} from "../button/button.svelte.js";

export function proceed(text: string, onAccept: Function, onCancel: Function, caption?: string) {
    popupHandler.open(new ConfirmPopup(text, onAccept, onCancel, caption))
}


class ConfirmPopup extends Popup {
    component = ConfirmComponent;
    icon = Icon.solid("question")

    buttons: Button[] = [
        new Button(
            {label: "Proceed", icon: Icon.solid("check").color("lime")},
            () => {this.onAccept(); popupHandler.close()}
        ),
        new Button(
            {label: "Cancel", icon: Icon.solid("x").color("red")},
            () => {this.onCancel(); popupHandler.close()}
        )
    ];

    constructor(public text: string, private onAccept: Function, private onCancel: Function, caption?: string) {
        super();
        if (caption) this.caption = caption;
        else this.caption = "Confirm"
    }
}
