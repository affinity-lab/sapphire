<script lang="ts">
    let {data, preview} = $props();

</script>

{#if data.videoId}
<div class="video">
    <iframe src="https://www.youtube.com/embed/{data.videoId}?start={data.startSecond}"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
    ></iframe>
</div>
{/if}

<style lang="scss">
    div.video {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
    }
    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
    }
</style>