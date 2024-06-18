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
import {YesNoSwitchControl} from "./yes-no-switch/yes-no-switch.js";
import {ChooseSwitchControl} from "./choose-switch/choose-switch.js";
import {DateTimeControl} from "$lib/form-page/controls/datetime/datetime.js";
import {type Link, LinkControl, type LinkGetter} from "./link/link.svelte.js";
import {LangString} from "./lang-string/lang-string.js";
import {LangMarkdown} from "./lang-markdown/lang-markdown.js";
import type {Icon} from "$lib/common-ui/icon.js";

export type Options = string[] | Record<string, any> | string
export type OptionApi = (...args: any) => Options | Promise<Options>


export type ControlOptions = {
    icon?: Icon,
    disclaimer?: string,
    disabled?: boolean
}

export type ControlWithApiOptions = ControlOptions & {
    api: Options | OptionApi
}


export const controls = {
    "checkbox": (field: string, label: string, options: ControlWithApiOptions): CheckboxControl => new CheckboxControl(field, label, options),
    "chooseSwitch": (field: string, label: string, options: ControlWithApiOptions): ChooseSwitchControl => new ChooseSwitchControl(field, label, options),
    "code": (field: string, label: string, options?: ControlOptions): CodeControl => new CodeControl(field, label, options),
    "color": (field: string, label: string, options?: ControlOptions): ColorControl => new ColorControl(field, label, options),
    "date": (field: string, label: string, options?: ControlOptions): DateControl => new DateControl(field, label, options),
    "datetime": (field: string, label: string, options?: ControlOptions): DateTimeControl => new DateTimeControl(field, label, options),
    "icon": (field: string, label: string, options: ControlOptions & {isColorPicker: boolean}): IconControl => new IconControl(field, label, options),
    "markdown": (field: string, label: string, options?: ControlOptions): MarkdownControl => new MarkdownControl(field, label, options),
    "multiselect": (field: string, label: string, options: ControlWithApiOptions): MultiselectControl => new MultiselectControl(field, label, options),
    "number": (field: string, label: string, options?: ControlOptions): NumberControl => new NumberControl(field, label, options),
    "password": (field: string, label: string, options?: ControlOptions): PasswordControl => new PasswordControl(field, label, options),
    "radio": (field: string, label: string, options: ControlWithApiOptions): RadioControl => new RadioControl(field, label, options),
    "select": (field: string, label: string, options: ControlWithApiOptions): SelectControl => new SelectControl(field, label, options),
    "string": (field: string, label: string, options?: ControlOptions): StringControl => new StringControl(field, label, options),
    "tags": (field: string, label: string, options: ControlWithApiOptions): TagsControl => new TagsControl(field, label, options),
    "time": (field: string, label: string, options?: ControlOptions): TimeControl => new TimeControl(field, label, options),
    "yesNoSwitch": (field: string, label: string, options?: ControlOptions): YesNoSwitchControl => new YesNoSwitchControl(field, label, options),
    "link": (field: string, label: string, options: ControlOptions & {link: Link | Link[] | LinkGetter}): LinkControl => new LinkControl(field, label, options),
    "langString": (field: string, label: string, options?: ControlOptions): LangString => new LangString(field, label, options),
    "langMarkdown": (field: string, label: string, options?: ControlOptions): LangMarkdown => new LangMarkdown(field, label, options),

}

export default controls;