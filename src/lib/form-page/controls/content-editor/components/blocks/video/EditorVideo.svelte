<script lang="ts">

    import DefaultEditorComponent
        from "$lib/form-page/controls/content-editor/components/blocks/DefaultEditorComponent.svelte";

    let {data, config, index, pageHandler, visible, valid} = $props();

    let change: () => void;

    let url = data.videoId;
    function enteredUrl (e: InputEvent) {
        let id = url.match(/((?<=v=|v\/|vi=|vi\/|.be\/|v%3D|embed\/|e\/|watch\/)[a-zA-Z0-9\-_]+)|(^[a-zA-Z0-9\-_]+$)/g);
        let start = url.match(/(?<=t=|start=)(([0-9]+m[0-9]+)+|[0-9]+)/g);
        data.videoId = id ? id[id.length - 1] : "";
        if (start) {
            let s: string = start[0];
            if (s.includes('m')) {
                let m_s: [string, string] = s.split("m");
                setStartSecAndStartMinFromNumber(Number(m_s[0]) * 60 + Number(m_s[1]));
            } else {
                setStartSecAndStartMinFromNumber(Number(s));
            }
            enteredStart();
        } else {
            console.log(e);
            if (e.inputType === "insertFromPaste" || e.inputType === "insertFromDrop") {
                setStartSecAndStartMinFromNumber(0);
            }
            change();
        }
    }

    let startSec;
    let startMin;
    setStartSecAndStartMinFromNumber(data.startSecond);

    function setStartSecAndStartMinFromNumber (num: number): void {
        startSec = String(num % 60).padStart(2, "0");
        startMin = String(Math.floor(num / 60)).padStart(2, "0");
    }
    function enteredStart() {
        if (!isNaN(Number(startMin)) && !isNaN(Number(startSec))) {
            data.startSecond = Number(startMin) * 60 + Number(startSec)
        } else {
            data.startSecond = 0;
        }
        change();
    }
</script>


<DefaultEditorComponent {pageHandler} {index} bind:visible bind:valid bind:change>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Url / ID</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field has-addons">
                <input class="input is-size-7" type="text" bind:value={url} on:input={enteredUrl}/>
            </div>
        </div>
    </div>
    <div class="field m-0 mb-1 is-horizontal">
        <div class="field-label is-normal">
            <label class="label is-size-7">Start at</label>
        </div>
        <div class="field-body has-addons">
            <div class="control field has-addons starttime-input">
                <input class="input is-size-7" type="text" placeholder="Min" bind:value={startMin} on:input={enteredStart}/>
                <span class="mx-2">:</span>
                <input class="input is-size-7" type="text" placeholder="Sec" bind:value={startSec} on:input={enteredStart}/>
            </div>
        </div>
    </div>

    <svelte:fragment slot="info">
        Enter any youtube video link.
    </svelte:fragment>

</DefaultEditorComponent>


<style lang="scss">
    .starttime-input {
      width: 50%;
      max-width: 150px;
    }
</style>