<script lang="ts">
    import {marked} from "marked";

    let {data, preview} = $props();


</script>

<div>
    <header style="background-image: linear-gradient(180deg, {data.colors.background}00 80%, {data.colors.background} 100%), url('{data.imageUrl}')">
        <img src={data.imageUrl}>
        <div>
            <h1 style="color: {data.colors.primary}">{data.title}</h1>
            {#if data.subtitle.length > 0}
                <h2 style="color: {data.colors.primary}">{data.subtitle}</h2>
            {/if}
        </div>
    </header>

    <section class="p-5" style="background-color: {data.colors.background}">
        <p style="color: {data.colors.secondary}">{@html marked(data.text)}</p>
    </section>
</div>

<style lang="scss">
    p {
        text-align: justify;
    }
    section {
      padding: 16px;
    }
    header {
        background-size: cover;
      padding: 16px;
        h1, h2 {
            margin: 0;
            padding: 0;
        }
    }
    img {
        width: 100%;
        display: block;
        visibility: hidden;
    }

</style>