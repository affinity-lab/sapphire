<script lang="ts">
    import type {DataSource} from "../../data-source";

    export let files: DataSource;
    let fileList: Array<{id: number, file: File}> = [].concat(...Object.values(files)).map((elem)=>{return {id: Math.random(), file: elem}});

    let fileFilter = "";
</script>

<div class="files m-0 panel p-2">
    <div class="panel-block">
        <p class="control has-icons-left">
            <input class="input" type="text" placeholder="Search" bind:value={fileFilter}/>
            <span class="icon is-left">
                    <i class="bi bi-search" aria-hidden="true"></i>
            </span>
        </p>
    </div>
    <div class="file-list">
        {#each fileList as {id, file} (id)}
            {#if file.name.toLowerCase().startsWith(fileFilter.toLowerCase())}
                <div>
                    <a class="panel-block">{file.name}</a>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style lang="scss">
    div.files {
        max-width: 200px;
    }
    a {
        line-height: 1rem;
    }
</style>