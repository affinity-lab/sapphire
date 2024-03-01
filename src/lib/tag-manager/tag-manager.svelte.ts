import type {TagApi} from "$lib/tag-manager/tag-api.js";
import type {Tag} from "$lib/tag-manager/types.js";

export class TagManager {
    tags: Tag[] = $state([]);

    constructor(
        private api: TagApi
    ) {
        this.refreshTags().then();
    }

    async refreshTags() {
        this.tags = await this.api.getTags();
    }

    async updateTag (oldName: string, newName: string, predefined: boolean) {
        if (await this.api.updateTag(oldName, newName, predefined)) {
            await this.refreshTags();
            return true;
        } else return false;
    }

    async addTag (name: string) {
        if (await this.api.addTag(name)) {
            await this.refreshTags();
            return true;
        } else return false;
    }

    async removeTag (name: string) {
        if (await this.api.removeTag(name)) {
            await this.refreshTags();
            return true;
        } else return false;
    }
}
