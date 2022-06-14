<template>
  <div class="home-left">
    <ul>
      <router-link to="/" :class="{'router-link-active': route.name === '详情'}">
        <li>
          <span class="emoji">🎈</span>
          <span class="title" >DHU广场</span>
        </li>
      </router-link>
      <!-- <router-link to="/tag" :class="{'router-link-active': route.name === '详情'}">
        <li>
          <span class="emoji">🔥</span>
          <span class="title" >热门话题</span>
        </li>
      </router-link> -->
      <router-link :to='"/user/"+store.state.data.user.id' v-if="isAccountLoggedIn()">
        <li>
          <span class="emoji">📑</span>
          <span class="title">我的主页</span>
        </li>
      </router-link>
      <router-link :to='"/message"' v-if="isAccountLoggedIn()">
        <li>
          <span class="emoji">📧</span>
          <span class="title">消息通知</span>
        </li>
      </router-link>
      <router-link to="/user/set" v-if="isAccountLoggedIn()">
        <li>
          <span class="emoji">🔐</span>
          <span class="title">账户设置</span>
        </li>
      </router-link>
      <router-link to="/constructing">
        <li>
          <span class="emoji">📢</span>
          <span class="title">项目进度</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import {isAccountLoggedIn} from '@/utils/auth'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()

</script>

<style lang="scss" scoped>
  .home-left{
    position: sticky;
    top: 60px;
    height: fit-content;
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
      margin-bottom: 4px;
      background: var(--secondary-bg);
    }
    .router-link-active{
      background: var(--primary-color);
      color: var(--main-bg);
    }
  }


</style>