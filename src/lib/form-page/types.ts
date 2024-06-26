import type {OptionApi} from "$lib/form-page/controls/controls.js";

export type FormData = { id: string | number } & Record<string, any>;

export interface FormApiInterface {
	get(id: number | null, values?: Record<string, any>): Promise<any>;
	save(id: number | null, item: Record<string, any>): Promise<number | ErrorObject>;
	getOptions (command: string): OptionApi
}

export type FormApiFactory = (endpoint: string) => FormApiInterface;

export type ErrorObject = Record<string, ErrorArray>
export type ErrorArray = Array<{code: string, message: string}>