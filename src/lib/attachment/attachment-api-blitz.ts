import {Icon} from "../common-ui/icon.js";
import type {AttachmentApiInterface, Collection} from "./types.js";


export class AttachmentApiBlitz implements AttachmentApiInterface {
	constructor(
		protected endpoint: string,
		protected itemId: number,
		protected imgUrl: string,
		protected fileUrl: string,
		private authCheck: (res: Response) => Promise<Response>
	) {
	}

	async getCollections(): Promise<Collection[]> {
		let collections = await fetch(
			`${this.endpoint}.collection`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: this.itemId
				})
			})
			.then(this.authCheck)
			.then(res=>res.json());

		for (let collection of collections) {
			for (let item of collection.items) {
				const imageExtensions = ["png", "jpg", "jpeg", "gif", "webp"];
				const ext = item.name.split(".").pop()!.toLowerCase();
				item.icon = Icon.forFile(item.name);

				item.downloadUrl = `${this.fileUrl}/${collection.name}/${this.itemId.toString(36).padStart(6, "0")}/${item.name}`;

				item.isImage = imageExtensions.includes(ext);
				if (item.isImage) {
					item.imageUrl = (w: number, h: number) => {
						return `${this.imgUrl}/${collection.name}/${this.itemId.toString(36).padStart(6, "0")}/${w}x${h}/${item.name}.webp?${item.id}`;
					};
				}
			}
		}
		return collections;
	}

	async upload(collectionName: string, fileList: FileList): Promise<boolean> { // returns success
		let form = new FormData();
		for (let file of fileList) {
			form.append("files", file, file.name);
		}
		form.append("id", this.itemId.toString());
		form.append("collectionName", collectionName);

		return await fetch(
			`${this.endpoint}.file`,
			{
				method: "POST",
				headers: {},
				body: form
			})
			.then(this.authCheck)
			.then(res=>res.json());
	}

	async delete(collectionName: string, fileName: string): Promise<boolean> { // returns success
		return await fetch(
			`${this.endpoint}.deleteFile`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: this.itemId,
					collectionName,
					fileName
				})
			})
			.then(this.authCheck)
			.then(res => res.json());
	}

	async reorder(collectionName: string, fileName: string, position: number) {
		return await fetch(
			`${this.endpoint}.changeFileOrder`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: this.itemId,
					collectionName,
					fileName,
					position
				})
			})
			.then(this.authCheck)
			.then(res => res.json());
	}

	async saveMetaData(collectionName: string, fileName: string, newMetaData: any, newName: string) {
		return await fetch(
			`${this.endpoint}.changeFileData`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					id: this.itemId,
					collectionName,
					fileName,
					newMetaData,
					newName
				})
			})
			.then(this.authCheck)
			.then(res => res.json());
	}


}
