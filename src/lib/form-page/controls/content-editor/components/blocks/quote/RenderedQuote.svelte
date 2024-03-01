<script lang="ts">
    let {data, preview} = $props();

</script>

<div class="quote">
    <div class="quotes">
        <div class="comma">
            <div class="top"></div><div class="bottom"></div>
        </div>
        <div class="comma">
            <div class="top"></div><div class="bottom"></div>
        </div>
    </div>
    <p class="text">{data.text}</p>
    <div class="author"><p>~ {data.author}</p></div>
</div>

<style lang="scss">
  $comma-color: #000000;
  $comma-size: 50px;
  .quotes {
    display: flex;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .comma {
    .top, .bottom {
      width: calc($comma-size / 2);
      height: calc($comma-size / 2);
    }
    .bottom {
      background-color: $comma-color;
    }
    .top {
      border-top-left-radius: calc($comma-size / 2);
      border-top: calc($comma-size / 4) solid $comma-color;
      border-left: calc($comma-size / 4) solid $comma-color;
    }
  }
  div.quote {
    background-color: #c9c9c9;
    padding: calc($comma-size + 10px) 0 10px 0;
    position: relative;
    width: 80%;
    margin: 0 auto;
  }
  p.text {
    width: 70%;
    margin: auto;
    text-align: center;
    font-style: italic;
  }
  div.author {
    text-align: right;
    width: 90%;
    margin: 10px auto;
    display: flex;
    justify-content: right;
    p {
      background-color: $comma-color;
      padding: 10px;
      border-radius: 10px;
      width: fit-content;
      right: 0;
      color: white;
    }
  }
</style>