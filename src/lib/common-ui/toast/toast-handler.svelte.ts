
export type ToastType = "success" | "warning" | "info";
export type Toast = {
    content: string,
    type: ToastType,
    id: number
}



class ToastHandler {
    toasts: Toast[] = $state([])

    public static success (content: string) {toastHandler.addToast("success", content);}
    public static warning (content: string) {toastHandler.addToast("warning", content);}
    public static info (content: string) {toastHandler.addToast("info", content);}

    addToast (type: ToastType, content: string) {
        const toast = {type, content, id: Math.random()}
        this.toasts.push(toast);

        setTimeout(() => {
            this.toasts = this.toasts.filter(x => x.id !== toast.id)
        }, 3000)
    }
}

export const toastHandler = new ToastHandler();
export default toastHandler;