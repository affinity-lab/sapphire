import type {RequestEvent} from "@sveltejs/kit";

export function awqrdFileEndpoint(apiUrl: string, apiKey: string, client: string, version: string, extraHeaders?: (...args: any) => Record<string, any>) {
    return async function (event: RequestEvent) {
        const name = event.params["name"];
        const id = event.params["id"]!.padStart(6, "0");
        const file = event.params["file"];
        if (!name || !id || !file) return new Response(JSON.stringify({error: "Invalid params"}), {status: 500});

        let headers: Record<string, any> = {
            "client-api-key": apiKey,
            "client": client,
            "client-version": version
        };
        if (extraHeaders) headers = {...headers, ...extraHeaders(event)};

        return await fetch(`${apiUrl}/${name}.${id}/${file}`, {headers});
    };
}
