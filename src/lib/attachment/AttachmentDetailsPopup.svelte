<script lang="ts">
    import SC_Popup from "../popup/SC_Popup.svelte";
    import ButtonComponent from "../common-ui/button/ButtonComponent.svelte";
    import {Button} from "../common-ui/button/button.svelte.js";
    import {Icon} from "../common-ui/icon.js";
    import fileSize from "file-size";
    import {copy} from "../lib/clipboard.js";
    import {AttachmentDetailsPopup} from "./attachment-details-popup.js";

    const {popup}: { popup: AttachmentDetailsPopup } = $props();
    let name = popup.data.file.name;
    const data = popup.data;

</script>


{#snippet footer()}
    <ButtonComponent button={new Button({label: "Save", icon:Icon.solid("floppy-disk").color("white")}, async () => {
            await popup.changeMeta(data.metadata, name)
        })}
    />
    <ButtonComponent button={new Button({label:"Download", icon: Icon.solid("download").color("white")}, async () => {
            const a = document.createElement("a")
            a.href = data.file.downloadUrl;
            a.target = "_blank"
            a.click()
        })}
    />
{/snippet}


<SC_Popup {popup} {footer}>
    <div class="wrapper">
        {#if data.file.isImage}
            <img src={data.file.imageUrl(320,180)} alt="index">
        {/if}
        <div class="details">
            <div class="data">
                <span>Filename</span>
                <span><input type="text" bind:value={name}><ButtonComponent button={new Button(Icon.solid("copy").color('white'), () => {
                    copy(name);
                })}/></span>
                <span>Size</span>
                <span>{fileSize(data.file.size).human()} ({data.file.size})</span>
            </div>
            <p style="text-align: center; font-weight: bold">Meta</p>
            <div class="data">
                {#each data.metaFields as metaField}
                    <span>{metaField.name}</span>
                    {#if metaField.type === "string"}
                        <input type="text" bind:value={data.metadata[metaField.name]}>
                    {:else if metaField.type === "enum"}
                        <select bind:value={data.metadata[metaField.name]}>
                            {#each metaField.options as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
</SC_Popup>

<style lang="scss">
  .wrapper {
    height: 100%;

    img {
      object-fit: contain;
      overflow: hidden;
    }
    .details {
      padding: 8px;
    }
    span {
      display: block;
      width: 100%;
    }

    .data {
      display: grid;
      grid-template-columns: 30% 70%;
    }
    p {
      margin-bottom: 0;
      margin-top: 16px;
    }
  }
</style>