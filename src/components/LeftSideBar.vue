<template>
  <div class="home-left">
    <ul>
      <router-link to="/">
        <li>
          <span class="emoji">🎈</span>
          <span class="title">DHU广场</span>
        </li>
      </router-link>
      <router-link to="/mine/post" v-if="isAccountLoggedIn()">
        <li>
          <span class="emoji">📑</span>
          <span class="title">我的帖子</span>
        </li>
      </router-link>
      <router-link to="/mine/info" v-if="isAccountLoggedIn()">
        <li>
          <span class="emoji">🔐</span>
          <span class="title">账户设置</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import {isAccountLoggedIn} from '@/utils/auth'
</script>

<style lang="scss" scoped>
  .home-left{
    position: sticky;
    top: 60px;
    height: 600px;
    border-radius: 5px;
    margin-right: 8px;
    ul{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li{
        height: 100%;
        font-size: .9em;
        display: flex;
        justify-content: center;
        align-items: center;
        .emoji{
          width: 2em;
        }
      }
    }
    a{
      height: 2.5em;
      width: 100%;
      border-radius: 4px;
      margin: 2px 0;
      background: var(--secondary-bg);
    }
    .router-link-exact-active{
      background: var(--primary-color);
      color: var(--main-bg);
    }
  }


</style>