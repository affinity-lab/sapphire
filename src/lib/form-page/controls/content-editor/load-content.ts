import {get} from "svelte/store";
import {read} from "./clipboard-handler";
import type {CleanDataType, PageHandler} from "./components/page-handler.svelte";

export let selectedFile: File;

export function saveToFile(pageHandler: PageHandler) {
    const blob = new Blob([JSON.stringify(get(pageHandler.cleanData),null,2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
}

export function handleFileChange(event: any, pageHandler: PageHandler) {
    const file = event.target.files[0];
    if (file) {
        selectedFile = file;
        handleFileUpload(pageHandler);
    }
}

export function handleFileUpload(pageHandler: PageHandler) {
    if (selectedFile) {
        loadJsonFromFile(selectedFile)
            .then((jsonData) => {
                pageHandler.initializeContent(jsonData as Array<CleanDataType>);
                // @ts-ignore
                selectedFile = undefined;
            })
            .catch((error) => {
                console.error('Error loading JSON data:', error);
            });
    } else {
        alert("No file selected.");
    }
}

export function loadJsonFromFile(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const jsonData = JSON.parse(reader.result as string);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => {reject(reader.error)};
        reader.readAsText(file);
    });
}

export async function loadFromClipboard (pageHandler: PageHandler, index?: number) {
    let text = await read();
    try {
        pageHandler.initializeContent(JSON.parse(text) as Array<CleanDataType>, index)
    } catch (e) {
        alert("Can't load from current clipboard!")
    }
}