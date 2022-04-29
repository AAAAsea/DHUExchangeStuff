<template>
  <div class="follow-card">
    <div 
      class="detail-nav" 
      :style="{
        background: 'var(--post-card-bg)',
      }">
      <a>
        <span class="iconfont icon-back" @click="router.back(-1)">返回</span>
      </a>
      <span class="nav-title">{{user.nickName}}</span>
      <span class="total-follow">全部{{route.query?.relate === 'fans' ? '粉丝' : '关注'}} {{followerList.reduce((a, item) => item.hasFollowed ? a + 1 : a + 0, 0)}}</span>
    </div>
      <transition name="el-zoom-in-top">

      <UserList
      v-if="followerList.length > 0"
      :userList="followerList"
      />
      </transition>

    <!-- <el-empty :description="'该用户还没有' + (route.query?.relate === 'fans' ? '粉丝' : '关注')" v-else></el-empty> -->
  </div>

</template>

<script setup>
import UserList from '@/components/UserList.vue'
import { useRoute, useRouter } from 'vue-router'
import {  getFollowees, getFollowers } from '@/api/user'
import { reactive, ref } from '@vue/reactivity'

const router = useRouter()
const followerList = ref([])
const user = reactive({
  nickName:''
})
const route = useRoute()
const action = route.query?.relate === 'fans' ? getFollowers : getFollowees

action(route.params.id)
.then(res =>{
  followerList.value.push(...res.data.users)
  user.nickName = res.data.user.nickName
  document.title = '👩‍👩‍👧‍👦 ' + user.nickName + '的' + (route.query?.relate === 'fans' ? '粉丝' : '关注')
})

</script>

<style lang="scss" scoped>
.follow-card{
  width: 100%;
  .detail-nav{
    transition: 0.3s;
    position: sticky;
    top: 60px;
    z-index: 999;
    height: 50px;
    line-height: 50px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 18px;
    font-weight: bold;
    a span{
      font-size: 20px;
      color: var(--extreme);
    }
  }
}
</style>