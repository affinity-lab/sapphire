<script lang="ts">
    import toastHandler from "./toast-handler.svelte";

</script>

<div class="toasts">
    {#each toastHandler.toasts as toast}
        <div class="toast {toast.type}">
            {toast.content}
        </div>
    {/each}
</div>


<style lang="scss">
    @import "../../lib/app.scss";
    div.toasts {
      position: fixed;
      bottom: 0;
      right: 0;
      padding: 16px;
      z-index: 1000;
      .toast {
        width: 200px;
        color: white;
        border-radius: 8px;
        padding: 8px;
        &:not(:last-child) {margin-bottom: 16px}
        &.success {background-color: darkgreen}
        &.warning {background-color: darkred}
        &.info {background-color: darkcyan}
      }
    }
</style>