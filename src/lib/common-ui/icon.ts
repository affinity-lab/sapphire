import randomColor from "randomcolor";

export class Icon {
	public colorStyle = `color:${randomColor()}`;


	static sharp() {
		return {
			solid(icon: string) {return new Icon("solid", icon, true);},
			regular(icon: string) {return new Icon("regular", icon, true);},
			light(icon: string) {return new Icon("light", icon, true);},
			thin(icon: string) {return new Icon("thin", icon, true);}
		};
	}
	static forFile(filename: string, type: "solid" | "regular" | "light" | "thin" | "duotone" = "solid", sharp: boolean = false) {
		const ext = filename.split(".").pop()!.toLowerCase();
		if (ext === undefined || !extensions.hasOwnProperty(ext)) return new Icon(type, "fa-file", sharp)
		return new Icon(type, extensions[ext], sharp)
	}

	static solid(icon: string) {return new Icon("solid", icon, false);}
	static regular(icon: string) {return new Icon("regular", icon, false);}
	static light(icon: string) {return new Icon("light", icon, false);}
	static thin(icon: string) {return new Icon("thin", icon, false);}
	static duotone(icon: string) {return new Icon("duotone", icon, false);}
	static brands(icon: string) {return new Icon("brands", icon, false);}

	constructor(readonly family: string, readonly icon: string, readonly sharp: boolean = false) {}

	toString(): string {
		const icon = this.icon.startsWith("fa-") ? this.icon : "fa-"+this.icon
		return (this.sharp ? "fa-sharp " : "") + "fa-" + this.family +" "+ icon;
	}

	color(color?: string) {
		if (!color) this.colorStyle = "";
		else this.colorStyle = `color:${color};`;
		return this;
	}
}

const icons = {
	image: 'fa-file-image',
	pdf: 'fa-file-pdf',
	word: 'fa-file-word',
	powerpoint: 'fa-file-powerpoint',
	excel: 'fa-file-excel',
	csv: 'fa-file-csv',
	audio: 'fa-file-audio',
	video: 'fa-file-video',
	archive: 'fa-file-archive',
	code: 'fa-file-code',
	text: 'fa-file-alt',
	file: 'fa-file'
}
const extensions: Record<string, string> = {
	gif: icons.image,
	jpeg: icons.image,
	jpg: icons.image,
	png: icons.image,

	pdf: icons.pdf,

	doc: icons.word,
	docx: icons.word,

	ppt: icons.powerpoint,
	pptx: icons.powerpoint,

	xls: icons.excel,
	xlsx: icons.excel,

	csv: icons.csv,

	aac: icons.audio,
	mp3: icons.audio,
	ogg: icons.audio,

	avi: icons.video,
	flv: icons.video,
	mkv: icons.video,
	mp4: icons.video,

	gz: icons.archive,
	zip: icons.archive,

	css: icons.code,
	html: icons.code,
	js: icons.code,

	txt: icons.text
}
