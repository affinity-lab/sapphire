<script lang="ts">
    import {userStore} from "../../lib/user-store.svelte.js";
    import type {AbstractControl} from "./abstract-control.svelte.js"
    import type {Snippet} from "svelte";

    const {control, children}: {control: AbstractControl, children: Snippet} = $props();
</script>

{#if userStore.hasRole(control.roles)}
    <div class="container bulma"
         class:row={control.layout==="row"}
         class:column={control.layout==="column"}
         class:force-row={control.layout==="forceRow"}>
        <header title={control.label}>
            <label><i class="fa-fa {control.icon}" style="{control.icon.colorStyle}"></i> {control.label}</label>
        </header>
        <section>
            {@render children()}
            <footer>
                {#if control.errors.length}
                    {#each control.errors as error}
                        <span><i class="fa-solid fa-circle-exclamation"></i> {error}</span>
                    {/each}
                {/if}
            </footer>
        </section>
    </div>
{/if}

<style lang="scss">
  @import "inputs-style";

  @container (min-width: 500px) {
    .container.row {
      flex-direction: row;

      header {
        width: 20%;
      }

      section {
        padding: 0;
        width: 80%;
      }
    }
  }

  .container {
    color: $form--text-color;
    margin-right: 4px;
    overflow: hidden;
    display: flex;
    padding: 8px;
    border-top: 1px solid #fff2;
    flex-direction: column;

    header {
      padding: 4px 8px;
      display: flex;
      align-items: center;
      container-name: form-item;

      label {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        min-width: 0;
        font-size: 12px;
        color: #fff9;

        i {
          margin-right: 8px;
        }
      }
    }

    section {
      padding: 0 8px;
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  footer {
    color: red;
    font-size: 12px;
    margin-bottom: 8px;

    span {
      display: block;
    }
  }

</style>