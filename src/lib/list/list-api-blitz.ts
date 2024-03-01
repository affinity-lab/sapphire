import type {ListApiInterface} from "./types.js";

export class ListApiBlitz implements ListApiInterface {
	constructor(protected endpoint: string, private authCheck: (res: Response) => Promise<Response>) {}

	async get(quickSearch: string, filter: any, order: string, page: number, pageSize: number): Promise<{ items: Array<Record<string, any>>; page: number; count: number, pageSize: number }> {
		return await fetch(
			`${this.endpoint}.list`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					search: quickSearch,
					reqPageIndex: page,
					pageSize,
					filter,
					order
				})
			})
			.then(this.authCheck)
			.then(res => res.json());
	}
}