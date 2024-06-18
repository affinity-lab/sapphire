<script lang="ts">

    import {ChooseSwitchControl} from "./choose-switch.js";
    import Control from "../Control.svelte"

    let {control, item = $bindable(), onChange}: { control: ChooseSwitchControl, item: any, onChange: Function } = $props()
    let field = $state(control.field);
    let variable = $state(false);
    let name = control.field + Math.random();

</script>

<Control {control}>
    {#await control.getOptionsRecord() then options}
        <section>
            <label class:bold={variable}>{Object.values(options)[0]}</label>
            <div class="switch-background" class:darken={!variable} onclick={() => {
                variable = !variable;
                item[field] = variable ? Object.keys(options)[1] : Object.keys(options)[0];
            }}>
                <div class="dot-wrapper" class:right={variable}>
                    <div class="dot"></div>
                </div>
            </div>
            <label class:bold={!variable}>{Object.values(options)[1]}</label>
        </section>
    {/await}
</Control>


<style lang="scss">
  @import "../inputs-style";

  $height: 16px;
  $width: calc($height * 2);
  $dot-color: blue;
  $switch-color: white;
  //$true: white;
  //$false: blue;
  section {
    width: 100%;
    border-radius: 15px;
    padding: 8px;
    display: flex;
    gap: 8px;
    align-items: center;
    label.bold {
      opacity: 50%;
      transition: opacity .6s ease;
    }

    .switch-background {
      display: flex;
      width: $width;
      height: $height;
      border-radius: 15px;
      transition: background-color .6s;
      align-items: center;
      background-color: $switch-color;
      //&.darken {
      //  background-color: $false;
      //  transition: background-color .6s;
      //}
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
          //.dot{
          //  background-color: $true;
          //  transition: all .4s ease;
          //}
        }

        &.right {
          animation: right .4s ease;
          transform: translateX(100%);
          //.dot{
          //  background-color: $false;
          //  transition: all .4s ease;
          //}
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