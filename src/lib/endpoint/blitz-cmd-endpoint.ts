import type {RequestEvent} from "@sveltejs/kit";

export function blitzCmdEndpoint(apiUrl: string, apiKey: string, authorization?: (...args: any) => string | undefined) {
	return async function (event: RequestEvent) {
		const command = event.params["command"];
		if (!command) return new Response(JSON.stringify({error: "Command missing"}), {status: 400});
		let contentType = event.request.headers.get("Content-Type");
		const headers: Record<string, any> = {"x-api-key": apiKey};

		if (authorization) headers["authorization"] = "Bearer "+authorization(event);

		if (contentType === "application/json") {
			headers["Content-Type"] = "application/json";
			return await fetch(apiUrl + command, {
				body: await event.request.text(),
				headers,
				method: "POST"
			})
		}

		return await fetch(apiUrl + command, {
			body: await event.request.formData(),
			headers,
			method: "POST"
		});
	};
}