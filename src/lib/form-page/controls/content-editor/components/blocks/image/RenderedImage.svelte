
<script lang="ts">
    let {data, preview} = $props();

</script>

<div class="image-wrapper">
    <div class="image {data.align}">
        <h2>{data.title}</h2>
        {#if data.url === ""}
            <div class="image-placeholder">
                <p>{data.alt}</p>
            </div>
        {:else}
            <img src={data.url} alt={data.alt} />
        {/if}
        <p>{data.description}</p>
    </div>
    <br>
</div>


<style lang="scss">
    .image-wrapper br {
      clear: both;
      height: 0;
    }
    .none {
      width: 100%;
    }
    .justify {
      display: block;
    }
    .image-placeholder {
      border: 1px solid black;
      min-height: 100px;
    }
    .left, .right {
      width: 50%;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
</style>
