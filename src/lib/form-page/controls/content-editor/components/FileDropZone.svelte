<script lang="ts">
    import {createEventDispatcher} from "svelte";
    // import {dndzone} from "svelte-dnd-action";

    let {files = [], maxFileCount = Infinity} = $props();


    const dispatch = createEventDispatcher();

    function handleDnd (e) {
        files = e.detail.items;
        change();
    }

    function change() {
        dispatch("change", {
            files
        })
    }

    let dropFromOthersDisabled: boolean;
    $effect(()=> dropFromOthersDisabled = files.length >= maxFileCount);
</script>

<div class="dnd is-flex is-justify-content-center is-flex-direction-row is-flex-wrap-wrap"
     use:dndzone={{items:files, type:"file", morphDisabled: true, dropFromOthersDisabled}}
     on:consider={handleDnd}
     on:finalize={handleDnd}
>
    {#each files as {id, file} (id)}
            <span class="tag is-light m-2">
                <div class="filename">
                    {file.name}
                </div>
                <button class = "delete is-small" onclick={()=>{
                    files = files.filter((elem)=>elem.id !== id);
                    change();
                }}></button>
            </span>
    {/each}
</div>

<style lang="scss">
  .dnd {
    min-height: 50px;
    border: 1px dashed black;
    border-radius: 10px;
  }
  span {
    max-width: 40%;
    min-width: 50px;

  }
  div.filename {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
