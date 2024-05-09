import type {RequestEvent} from "@sveltejs/kit";

export function blitzImgEndpoint(apiUrl: string, apiKey: string, extraHeaders?: (...args: any) => Record<string, any>) {
	return async function (event: RequestEvent) {
		const catalog = event.params["collection"];
		const id = event.params["id"]!.padStart(6, "0");
		const image = event.params["img"];
		const file = event.params["file"];
		if (!catalog || !id || !image || !file) return new Response(JSON.stringify({error: "Invalid params"}), {status: 500});

		let headers: Record<string, any> = {"x-api-key": apiKey};
		if (extraHeaders) headers = {...headers, ...extraHeaders(event)};
		return await fetch(`${apiUrl}/${catalog}/${id}/${image}/${file}`, {headers});
	};
}