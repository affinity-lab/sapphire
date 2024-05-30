<script lang="ts">

    import {userStore} from "../lib/user-store.svelte.js";

    let {brand, logout, hasUser = true}: {
        brand: { avatar: string, title: string, subtitle: string },
        logout: () => void,
        hasUser: boolean
    } = $props();
</script>

<main>
    <section class="branding">
        <div class="img" style="background-image: url({brand.avatar})"></div>
        <div class="text">
            <div>{brand.title}</div>
            <div>{brand.subtitle}</div>
        </div>
    </section>
    <section class="user">
        {#if hasUser}
            <div class="text">

                <div>{userStore.user?.name}</div>
                <div onclick={()=> logout()}>SIGN OUT</div>

            </div>
            {#if userStore.user?.avatar}
                <div class="img" style="background-image: url({userStore.user.avatar})"></div>
            {/if}
        {/if}
    </section>
</main>

<style lang="scss">
  @import "../lib/app";

  main {
    grid-area: header;
    background-color: $header--bg;
    display: flex;
    justify-content: space-between;

    section {
      margin: 16px;
      display: flex;
      gap: 16px;

      div.text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: $header--text-color;
      }

      div.img {
        width: 48px;
        height: 48px;
        border-radius: 100%;
        background-size: cover;
      }

      &.branding div.text {
        text-align: left;

        div:first-child {
          font-size: 16px;
          line-height: 16px;
          font-weight: bold;
        }

        div:last-child {
          font-size: 12px;
        }
      }

      &.user div.text {
        text-align: right;

        div:first-child {
          font-size: 16px;
          line-height: 16px;
          font-weight: bold;
        }

        div:last-child {
          font-size: 12px;
          color: $header--logout-color;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>