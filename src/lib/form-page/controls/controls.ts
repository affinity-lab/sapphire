import {StringControl} from "./string/string.js";
import {CheckboxControl} from "./checkboxes/checkbox.js";
import {ColorControl} from "./color/color.js";
import {DateControl} from "./date/date.js";
import {MarkdownControl} from "./markdown/markdown.js";
import {NumberControl} from "./number/number.js";
import {PasswordControl} from "./password/password.js";
import {RadioControl} from "./radio/radio.js";
import {SelectControl} from "./select/select.js";
import {TimeControl} from "./time/time.js";
import {IconControl} from "./icon/icon-picker.js";
import {MultiselectControl} from "./multiselect/multiselect.js";
import {TagsControl} from "./tags/tags.js";
import {CodeControl} from "./code/code.js";
import {YesNoSwitchControl} from "$lib/form-page/controls/yes-no-switch/yes-no-switch.js";
import {ChooseSwitchControl} from "$lib/form-page/controls/choose-switch/choose-switch.js";
import {DateTimeControl} from "$lib/form-page/controls/datetime/datetime.js";
import {type Link, LinkControl, type LinkGetter} from "$lib/form-page/controls/link/link.svelte.js";
import {ContentEditor} from "$lib/form-page/controls/content-editor/content-editor.js";

export type Options = string[] | Record<string, any> | string
export type OptionApi = (...args: any) => Options | Promise<Options>

type Files = Record<string, any> | (()=> Record<string, any> | Promise<Record<string, any>>)

export const controls = {
    "checkbox": (field: string, label: string, options: Options | OptionApi): CheckboxControl => new CheckboxControl(field, label, options),
    "chooseSwitch": (field: string, label: string, options: Options | OptionApi): ChooseSwitchControl => new ChooseSwitchControl(field, label, options),
    "code": (field: string, label: string): CodeControl => new CodeControl(field, label),
    "color": (field: string, label: string): ColorControl => new ColorControl(field, label),
    "date": (field: string, label: string): DateControl => new DateControl(field, label),
    "datetime": (field: string, label: string): DateTimeControl => new DateTimeControl(field, label),
    "icon": (field: string, label: string, isColorPicker: boolean): IconControl => new IconControl(field, label, isColorPicker),
    "markdown": (field: string, label: string): MarkdownControl => new MarkdownControl(field, label),
    "multiselect": (field: string, label: string, options: Options | OptionApi): MultiselectControl => new MultiselectControl(field, label, options),
    "number": (field: string, label: string): NumberControl => new NumberControl(field, label),
    "password": (field: string, label: string): PasswordControl => new PasswordControl(field, label),
    "radio": (field: string, label: string, options: Options | OptionApi): RadioControl => new RadioControl(field, label, options),
    "select": (field: string, label: string, options: Options | OptionApi): SelectControl => new SelectControl(field, label, options),
    "string": (field: string, label: string): StringControl => new StringControl(field, label),
    "tags": (field: string, label: string, options: Options | OptionApi): TagsControl => new TagsControl(field, label, options),
    "time": (field: string, label: string): TimeControl => new TimeControl(field, label),
    "yesNoSwitch": (field: string, label: string): YesNoSwitchControl => new YesNoSwitchControl(field, label),
    "link": (field: string, label: string, links: Link | Link[] | LinkGetter): LinkControl => new LinkControl(field, label, links),
    "content": (field: string, label: string, blocks: Record<string, any>, files: Files): ContentEditor => new ContentEditor(field, label, blocks, files)
}

export default controls;