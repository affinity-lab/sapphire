import type {Popup} from "./popup.svelte.js";

export class PopupHandler {
    stack: Popup[] = $state([]);

    open (popup: Popup) {
        this.stack = [...this.stack, popup]
    }

    close () {
        if (this.stack.length) {
            this.stack = this.stack.slice(0, this.stack.length - 1);
        }
    }
}


export const popupHandler = new PopupHandler();
export default popupHandler;