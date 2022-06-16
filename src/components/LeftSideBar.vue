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
          <span class="bubble" :style="{display: !unreadCount ? 'none' : 'block'}">{{unreadCount}}</span>
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
import { getNotice } from '@/api/user'
import {isAccountLoggedIn} from '@/utils/auth'
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const unreadNotice = reactive({
  comment: 0,
  follow: 0,
  like: 0,
  letter: 0
})
const unreadCount = ref(0);
getNotice()
.then(res=>{
  res = res.data;
  unreadNotice.comment = res.commentNotice?.unread || 0;
  unreadNotice.follow = res.followNotice?.unread || 0;
  unreadNotice.like = res.likeNotice?.unread || 0;
  unreadNotice.letter = res?.letterUnreadCount || 0;  
  unreadCount.value = unreadNotice.comment + unreadNotice.follow + unreadNotice.like + unreadNotice.letter;
})
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
      .bubble{
        background: var(--main-bg);
        color: var(--primary-color);
      }
    }
    .bubble{
      width: 15px;
      height: 15px;
      background: var(--primary-color);
      color: var(--main-bg);
      text-align: center;
      line-height: 15px;
      border-radius: 50%;
      font-size: 13px;
      margin-left: 3px;
      position: absolute;
      right: 10px;
    }
  }


</style>