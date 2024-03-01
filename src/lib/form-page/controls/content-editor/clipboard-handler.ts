export async function copy (text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

export async function read (): Promise<string> {
    try {
        return await navigator.clipboard.readText();
    } catch (err) {
        console.log(err);
        return "";
    }
}