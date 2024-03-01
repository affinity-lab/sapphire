import type {Tag} from "$lib/tag-manager/types.js";

export class TagApi {
    constructor(public endpoint: string, private authCheck: (res: Response) => Promise<Response>) {
    }

    async addTag(tagName: string): Promise<boolean> {
        return await fetch(
            `${this.endpoint}.create`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: tagName
                })
            })
            .then(this.authCheck)
            .then(res => res.json());
    }

    async updateTag(name: string, newName: string, predefined: boolean): Promise<boolean> {
        return await fetch(
            `${this.endpoint}.modify`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name,
                    newName,
                    predefined
                })
            })
            .then(this.authCheck)
            .then(res => res.json());
    }

    async getTags(): Promise<Tag[]> {
        return await fetch(
            `${this.endpoint}.get`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({})
            })
            .then(this.authCheck)
            .then(res => res.json());
    }

    async removeTag(name: string): Promise<boolean> {
        return await fetch(
            `${this.endpoint}.delete`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name
                })
            })
            .then(this.authCheck)
            .then(res => res.json());
    }
}
