<script lang="ts">
    let {data, preview} = $props();


    let mapDiv;

</script>

<div>
    <a href="https://www.google.com/maps/place/{data.long},{data.lat}/@{data.long},{data.lat},14z" target="blank">
        <i class="fa-solid fa-map-marker"></i> {data.name || 'Open map'}
    </a>
    <br>
</div>

<style lang="scss">
    div {
      float: right;
      clear: both;
      background-color: white;
      border-radius: 8px;
      padding: 8px;
      a {
        color: black;
      }
    }
    br {
      height: 0;
      clear: both;
    }
</style>