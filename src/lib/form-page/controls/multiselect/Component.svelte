<script lang="ts">

    import Control from "../Control.svelte";
    import {MultiselectControl} from "$lib/form-page/controls/multiselect/multiselect.js";

    let {control, item, onChange}: { control: MultiselectControl, item: any, onChange: Function } = $props();
    let field = $state(control.field);
    let name = control.field + Math.random();

    let selected: Record<string, any> = $state(control.convertToRecord(item[field]))


    function select(newKey: string, options: Record<string, any>) {
        for (const [key, value] of Object.entries(options)) {
            if (key === newKey || value === newKey) {
                selected[key] = value;
                item[field] = control.getSaveOptions(selected);
                onChange();
                return
            }
        }
        selected[newKey] = newKey;
        item[field] = control.getSaveOptions(selected);
    }

    function unselect(key: string) {
        delete selected[key];
        item[field] = control.getSaveOptions(selected);
        onChange();
    }
</script>


<Control {control}>
    {#await control.getOptionsRecord() then options}
        <section>
            <div class="selected-container">
                {#each Object.keys(selected) as key}
                    <span>{selected[key]}
                    <i class="fa-solid fa-xmark" on:click={(e) => {
                        unselect(key);
                        e.preventDefault();
                    }}></i>
                    </span>
                {/each}
            </div>

            <input list={name} on:change={(e)=>{
                select(e.target.value, options);
                e.target.value="";
            }} on:input={(e)=>{
                if (e instanceof InputEvent) {
                    e.target.value = "";
                }
            }}
            >
            <datalist id={name}>
                {#each Object.entries(options) as [key, value]}
                    <option>{value}</option>
                {/each}
            </datalist>

        </section>
    {/await}
</Control>


<style lang="scss">
  @import "../inputs-style";

  input {
    width: 100%;
  }

  section {
    width: 100%;
  }

  div.dropdown {
    display: none;

    span {
      display: block;
      color: black;
      padding: 4px;

      &:not(:last-child) {
        border-bottom: 1px solid lightgray;
      }

      &:hover {
        background-color: #ddd;
        transition: .3s;
      }
    }
  }

  div.search-bar.opened + div.dropdown {
    display: block;
    position: absolute;
    background-color: white;
    max-height: 250px;
    overflow-y: auto;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  div.selected-container {
    span {
      white-space: nowrap;
      background-color: lightgreen;
      color: black;
      padding: 2px 6px;
      border-radius: 8px;
      margin: 4px;
      display: inline-block;
      font-size: 12px;
      i {
        cursor: pointer;
      }
    }
  }
</style>