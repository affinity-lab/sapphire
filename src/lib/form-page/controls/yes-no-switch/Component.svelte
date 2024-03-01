<script lang="ts">

    import {YesNoSwitchControl} from "./yes-no-switch.js";
    import Control from "../Control.svelte"

    let {control, item, onChange}: { control: YesNoSwitchControl, item: any, onChange: Function } = $props()
    let field = $state(control.field);
    let name = control.field + Math.random();

    function clicked() {
        item[field] = !item[field];
    }
</script>

<Control {control}>
    <section>
        <div class="switch-background" class:darken={!item[field]} on:click={clicked}>
            <div class="flex">
            </div>
            <div class="dot-wrapper" class:right={item[field]}>
                <div class="dot"></div>
            </div>
        </div>
    </section>
</Control>


<style lang="scss">
  @import "../inputs-style";

  $height: 16px;
  $width: calc($height * 2);
  $dot-color: white;
  $true: green;
  $false: red;
  $icon-color: white;

  section {
    width: 100%;
    border-radius: 15px;
    padding: 8px;

    .switch-background {
      cursor: pointer;
      display: flex;
      width: $width;
      height: $height;
      border-radius: 15px;
      background-color: $true;
      transition: background-color .6s;
      align-items: center;

      &.darken {
        background-color: $false;
        transition: background-color .6s;
      }

      .flex {
        position: absolute;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: $width;
        height: $height;
      }

      .dot-wrapper {
        padding: 4px;
        width: $height;
        height: $height;

        .dot {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          background-color: $dot-color;
        }

        &:not(.right) {
          animation: left .4s ease;
          transform: translateX(0%);
        }

        &.right {
          animation: right .4s ease;
          transform: translateX(100%);

        }
      }
    }
  }

  @keyframes right {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes left {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>