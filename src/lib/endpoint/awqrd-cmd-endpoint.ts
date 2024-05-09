import type {RequestEvent} from "@sveltejs/kit";

export function awqrdCmdEndpoint(apiUrl: string, apiKey: string, client: string, version: string, extraHeaders?: (...args: any) => Record<string, any>) {
    return async function (event: RequestEvent) {
        const command = event.params["command"];
        if (!command) return new Response(JSON.stringify({error: "Command missing"}), {status: 400});
        let contentType = event.request.headers.get("Content-Type");
        let headers: Record<string, any> = {
            "client-api-key": apiKey,
            "client": client,
            "client-version": version
        };

        if (extraHeaders) headers = {...headers, ...extraHeaders(event)};

        if (contentType === "application/json") {
            let body = await event.request.text();
            headers["Content-Type"] = "application/json";
            let res = await fetch(apiUrl + command, {
                body,
                headers,
                method: "POST"
            });
            return res
        }

        return await fetch(apiUrl + command, {
            body: await event.request.formData(),
            headers,
            method: "POST"
        });
    };
}