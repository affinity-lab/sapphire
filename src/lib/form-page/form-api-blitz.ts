import type {ErrorObject, FormApiInterface} from "./types.js";
import type {OptionApi} from "$lib/form-page/controls/controls.js";
import type {MaybePromise} from "@sveltejs/kit";

export class FormApiBlitz implements FormApiInterface {
	constructor(protected endpoint: string, protected authCheck: (res: Response) => Promise<Response>) {
	}

	async get(id: number | null, values?: Record<string, any>): Promise<any> {
		return await fetch(
			`${this.endpoint}.form`,
			{
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id, values})
			})
			.then(this.authCheck)
			.then(res => res.json());
	}

	async save(id: number | null, item: Record<string, any>): Promise<number | ErrorObject> {
		return await fetch(
			`${this.endpoint}.save`,
			{
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({id, values: item})
			})
			.then(this.authCheck)
			.then(res => res.json());
	}

	getOptions (command: string, params?: () => MaybePromise<Record<string, any>>): OptionApi {
		return async () => {
			let body;
			if (params) body = await params();
			else body = {}

			return await fetch(
			`${this.endpoint}.${command}`,
			{
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body)
			})
			.then(this.authCheck)
			.then(res => res.json());}
	}
}