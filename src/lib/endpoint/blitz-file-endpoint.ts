import type {RequestEvent} from "@sveltejs/kit";

export function blitzFileEndpoint(apiUrl: string, apiKey: string, authorization?: (...args: any) => string | undefined) {
	return async function (event: RequestEvent) {
		const name = event.params["name"];
		const id = event.params["id"]!.padStart(6, "0");
		const file = event.params["file"];
		if (!name || !id || !file) return new Response(JSON.stringify({error: "Invalid params"}), {status: 500});

		const headers: Record<string, any> = {"x-api-key": apiKey};
		if (authorization) headers["authorization"] = authorization(event);

		return await fetch(`${apiUrl}/${name}/${id}/${file}`, {headers});
	};
}