<script lang="ts">
    import popupHandler from "../popup/popup-handler.svelte.js";
    import ButtonComponent from "../common-ui/button/ButtonComponent.svelte";
    import {Button} from "../common-ui/button/button.svelte.js";
    import {Icon} from "../common-ui/icon.js";
    import fileSize from "file-size";
    import type {Attachment, AttachmentApiInterface, Collection} from "./types.js";
    import {AttachmentDetailsPopup} from "./attachment-details-popup.js";

    const {collection, api, loadData, label}: {collection: Collection, api: AttachmentApiInterface, loadData: Function, label: string} = $props();

    let ext = collection.rules.ext;
    if (typeof ext === "string") {
        ext = [ext];
    }

    let files: FileList;

    let filePopupFactory = (file: Attachment, collection: Collection) => {
        return new AttachmentDetailsPopup(
            file.name, {
                file: file,
                metaFields: collection.publicMetaFields,
            },
            (metadata: any, newName: string) => {
                api.saveMetaData(collection.name, file.name, metadata, newName)
            },
            ()=>loadData()
            )
    }
</script>

<section>
    <h2>{label} <i>({collection.items.length}/{collection.rules.limit})</i></h2>
    <div class="file-container">
        {#if collection.items.length < collection.rules.limit}
            <div class="file upload">
                <label class="file-input">
                    <i class="fa-fa fa-plus"></i>

                    <input type="file" name="images" multiple bind:files accept={ext ? (ext.join(", ")) : "*/*"} onchange={()=>{
                        api.upload(collection.name, files).then(() => {
                        loadData();
                    });}}>
                </label>
            </div>
        {:else}
            <div class="file restricted">
                <label class="file-input">
                    <i class="fa-solid fa-ban"></i>
                </label>
            </div>
        {/if}
        {#each collection.items as file, index (file.id)}
            <div class="file" onclick={()=>{popupHandler.open(filePopupFactory(file, collection))}}>
                <div class="file-image">
                    {#if file.isImage}
                        <img src={file.imageUrl(144, 81)} alt="index">
                    {:else}
                        <i class="fa-fa fa-solid {file.icon}"></i>
                    {/if}
                </div>
                <div class="details">
                    <p title="Filename: {file.name}"><b>{file.name}</b></p>
                    <p>{fileSize(file.size).human()}</p>
                </div>

                <div class="button">
                    <ButtonComponent button={new Button(Icon.solid("trash").color("white"), (e) => {
                         e.stopPropagation();
                    api.delete(collection.name, file.name).then(()=> {
                        loadData();
                    })
                    })}/>
                </div>
                <div class="overlay">
                    <button onclick={(e) => {
                        e.stopPropagation();
                        if (index > 0) {
                            api.reorder(collection.name, file.name, index - 1).then(()=> {
                                loadData();
                            })
                        }
                    }}
                    ><i class="fa-solid fa-chevron-left"></i></button>
                    <button onclick={(e) => {
                        e.stopPropagation();
                        if (index < collection.items.length - 1) {
                            api.reorder(collection.name, file.name, index + 1).then(()=> {
                                loadData();
                            })
                        }
                    }}
                    ><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        {/each}
    </div>
</section>

<style lang="scss">
  @import "../lib/app.scss";
  $file--bg: $color-gray-0;

  section {
    padding: 8px;
    &:not(:first-child) {
      border-top: 1px solid $color-gray-0;
    }
  }
  label.file-input {
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    i {
      font-size: 64px;
      font-style: normal;
    }

    input[type="file"] {
      display: none;
    }
  }

  h2 {
    font-size: 14px;
    margin: 0 8px;

    i {
      font-weight: normal;
    }
  }

  div.file-container {
    display: flex;
    flex-wrap: wrap;
  }

  div.file {
    background-color: $file--bg;
    border-radius: 8px;
    box-shadow: 5px 5px 5px 5px #0001;
    border: 1px solid black;
    margin: 8px;
    flex-direction: column;
    align-items: center;
    width: 144px;
    height: 144px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    .file-image {
      width: 144px;
      height: 81px;
      text-align: center;
      i {
        font-size: 56px;
        margin-top: 16px;
      }
    }
    .details {
      padding: 8px;
      text-align: center;
      p {
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

      }
    }

    div.overlay {
      display: flex;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      button {
        border: none;
        height: 100%;
        background: red;
        color: white;
        width: 30px;
        cursor: col-resize;

        &:first-child {
          background: linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        }

        &:last-child {
          background: linear-gradient(to left, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
        }
      }

    }

    &:not(.upload):hover {
      div.overlay {
        transition: .3s;
        opacity: 1;
        justify-content: space-between;
        align-items: center;
      }
    }

    &.upload {
      background-color: lightgreen;
      button {
        width: 100%;
      }
    }
    &.restricted {
      background-color: red;
    }

    .button {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      transition: all .3s;

    }
    &:hover .button {
      opacity: 1;
    }


  }
</style>