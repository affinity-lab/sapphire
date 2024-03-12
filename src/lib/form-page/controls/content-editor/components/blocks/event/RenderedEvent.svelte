<script lang="ts">
    import {marked} from "marked";
    import {flip} from "svelte/animate";
    import {createEvent} from "ics";

    let {data, preview} = $props();

    function formatDate (d: string) {
        let date = new Date(d);
        let pad = (n: number) => String(n).padStart(2, "0");
        return `${date.getFullYear()}. ${pad(date.getMonth()+1)}. ${pad(date.getDate())} ${date.getHours()}:${pad(date.getMinutes())}`
    }

    function formatDateForCalendar (d: string) {
        let date = new Date(d);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];
    }

    async function saveToCalendar () {
        const event = {
            start: formatDateForCalendar(data.startTime),
            end: formatDateForCalendar(data.endTime),
            title: data.name,
            description: data.description,
            location: data.locationLabel,
            geo: {
                lat: Number(data.locationLat),
                lon: Number(data.locationLong)
            },
            url: data.url
        }
        const file = await new Promise((resolve, reject) => {
            createEvent(event, (error, value) => {
                if (error) {
                    reject(error);
                }
                resolve(new File([value], "event.ics", { type: 'plain/text' }))
            })
        })
        // @ts-ignore
        const url = URL.createObjectURL(file);

        const a = document.createElement('a');
        a.href = url;
        a.download = "event.ics";
        a.click();

        URL.revokeObjectURL(url);
    }
</script>


<div class="box event-wrapper">
    <div class="location m-4 big">
        <a href="https://www.google.com/maps/place/{data.locationLong},{data.locationLat}/@{data.locationLong},{data.locationLat},14z" target="blank">
            <i class="bi bi-geo-alt-fill"></i> {data.locationLabel || 'Open map'}
        </a>
    </div>

    <h1 class="title is-size-4 big">{data.name}</h1>
    <div class="calendar is-flex">
        <button class="button" on:click={saveToCalendar}>
            <i class="bi bi-calendar"></i>
        </button>
        <h2 class="subtitle is-size-6">
            {#if data.startTime}
                {#if !data.endTime}Starts at{/if} {formatDate(data.startTime)}
            {/if}
            <br>
            {#if data.endTime}
                {#if !data.startTime}Ends at{/if} {formatDate(data.endTime)}
            {/if}
        </h2>
    </div>
    <a href={data.url} target="blank">{data.url}</a>
    <p class="mt-3">{@html marked(data.description)}</p>

    <div class="subevent-container">
        {#each data.subEvents as event (event.id)}
            <div class="subevent p-2" animate:flip={{duration: 300}}>
                {#if event.locationLong && event.locationLat}
                    <div class="location m-4 small">
                        <a href="https://www.google.com/maps/place/{event.locationLong},{event.locationLat}/@{event.locationLong},{event.locationLat},14z" target="blank">
                            <i class="bi bi-geo-alt-fill"></i> {event.locationLabel || 'Open map'}
                        </a>
                    </div>
                {/if}
                {#if event.name}
                    <h1 class="title is-size-4">{event.name}</h1>
                {/if}
                {#if event.startTime || event.endTime}
                    <h2 class="subtitle is-size-6">
                        {#if event.startTime}
                            {#if !event.endTime}Starts at{/if} {formatDate(event.startTime)}<br>
                        {/if}
                        {#if event.endTime}
                            {#if !event.startTime}Ends at{/if} {formatDate(event.endTime)}
                        {/if}
                    </h2>
                {/if}
                {#if event.description}
                    <p>{@html marked(event.description)}</p>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
  .calendar {
    gap: 10px;
  }
    .event-wrapper {
      position: relative;
    }
    .location {
      position: absolute;
      top: 0;
      &.big {
        right: 0;
      }
    }
    h1 {
      max-width: 70%;
      width: fit-content;
    }
    .subevent-container {
      width: 100%;
    }
    .subevent {
      position: relative;
      width: 80%;
      border-radius: 10px;
      &:nth-child(even) {
        background-color: #f9f9f9;
        margin-left: auto;
        .location {
          right: 0;
        }
      }
      &:nth-child(odd) {
        background-color: #eee;
        text-align: right;
        h1 {margin-left: auto;}
        .location {
            left: 0;
        }
      }
    }
</style>