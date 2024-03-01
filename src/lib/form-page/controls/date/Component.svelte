<script lang="ts">
	import {DateControl} from "./date.js";
	import Control from "../Control.svelte";

	let {control, item, onChange}: { control: DateControl, item: any, onChange: Function } = $props();
	let field = control.field;

	const pad = (n: number) => n.toString().padStart(2, "0");
	function formatDate(d: string) {
		const date = new Date(d);
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
	}
</script>


<Control {control}>
	<input type="date" value={formatDate(item[field])} on:input={(e) => {
        item[field] = e.target.value;
    }} on:change={onChange}/>
</Control>


<style lang="scss">
	@import "../inputs-style";
	input {
		text-align: left;
		color-scheme: dark;
		position: relative;
		&::-webkit-calendar-picker-indicator {
			position: absolute;
			right: 0;
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
			opacity: 0;
			cursor: pointer;
		}
	}

</style>
