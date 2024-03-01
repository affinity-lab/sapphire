export interface ListApiInterface {
	get(
		quickSearch: string,
		filter: any,
		order: string,
		page: number,
		pageSize: number
	): Promise<{ items: Array<Record<string, any>>, page: number, count: number, pageSize: number }>;
}

export type ListApiFactory = (endpoint: string) => ListApiInterface;