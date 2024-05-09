import type {RequestEvent} from "@sveltejs/kit";

export function blitzFileEndpoint(apiUrl: string, apiKey: string, extraHeaders?: (...args: any) => Record<string, any>) {
	return async function (event: RequestEvent) {
		const name = event.params["name"];
		const id = event.params["id"]!.padStart(6, "0");
		const file = event.params["file"];
		if (!name || !id || !file) return new Response(JSON.stringify({error: "Invalid params"}), {status: 500});

		let headers: Record<string, any> = {"x-api-key": apiKey};
		if (extraHeaders) headers = {...headers, ...extraHeaders(event)};

		return await fetch(`${apiUrl}/${name}/${id}/${file}`, {headers});
	};
}