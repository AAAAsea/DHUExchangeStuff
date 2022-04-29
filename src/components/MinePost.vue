<template>
  <div class="mine-post" @scroll="onScroll">
    <div 
      class="detail-nav" 
      :style="{
        background: onTop ? 'transparent' : 'var(--post-card-bg)',
        borderRadius: onTop ? '5px' : '0'
      }">
      <a>
        <span class="iconfont icon-back" @click="router.back(-1)">返回</span>
      </a>
      <span class="nav-title">{{userNickName}}</span>
    </div>
    <UserInfoCard @on-update="name=>{userNickName = name}"/>
    <PostList
      @on-update="reBindOnscroll"
      v-if="data.userPostList?.length > 0"
      :postList="data.userPostList"
      :isLoading="false"
    />
    <div class="no-more-post" style="color: var(--secondary-bg)">{{haveMorePost ? 'Loading' : '——到底了——'}}</div>

  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'
import { onDeactivated, onUnmounted, ref } from '@vue/runtime-core'
import { isOnBottom } from '@/utils/tools'
import UserInfoCard from '@/components/UserInfoCard.vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useStore()
const data = store.state.data
const userNickName =  ref('')
const haveMorePost = ref(true)
const onTop = ref(true)

store.state.data.userPostList.splice(0)
async function initUserPostList(id = route.params.id){
  try{
    await store.dispatch('fetchPostList', id) // 等待数据加载
    if(data.userPostCount === data.userPostList.length){
      window.removeEventListener('scroll',loadMorePost) // 没有更多数据了关闭监听
      window.onscroll = onScroll  // 只监听导航栏
      haveMorePost.value = false; // 没有更多数据了
    }
  }catch(err){
      console.log(err)
      store.commit('showToast',{
        type: "error",
        message: "加载失败"
      })    
  }
}

// 结束之后在开启监听，防止初次多次加载
initUserPostList()
.finally(()=>{
  window.addEventListener('scroll',loadMorePost)
})
// 监听路由变化
onBeforeRouteUpdate( (to, from) => {
  if(to.params.id !== from.params.id)
  onTop.value = true; // 防止切换user不透明
  store.state.data.userPostList.splice(0)
  initUserPostList(to.params.id)
});

// 动态修改导航栏背景色
function onScroll(){
  let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
  onTop.value = scrollTop < 200
}

// 监听滚动

// console.log(window.onscroll)

// 默认可以加载
let canLoadMorePost = true;

// 离开页面时取消监听
onUnmounted (()=>{
  window.removeEventListener('scroll',loadMorePost);
  window.onscroll = null;
})
onDeactivated (()=>{
  window.removeEventListener('scroll',loadMorePost);
  window.onscroll = null;
})
// 滚动时判断是否到底部，并且500ms之内未触发更新，且还有数据

function loadMorePost(){
  onScroll() 
  // 加载完毕只监听导航栏
  if(!(haveMorePost.value)){
    window.removeEventListener('scroll',loadMorePost)
    window.onscroll = onScroll // 没有更多数据了关闭监听
    return;
  }
  if(canLoadMorePost && isOnBottom(1000))
  {
    console.log("loadMoreUserPost")
    canLoadMorePost = false;
    initUserPostList()
    setTimeout(() => {
      canLoadMorePost = true; // 防止过快加载
      loadMorePost() // 防止一秒内到底后不动导致不加载，所以自动多判断一次
    }, 1000);
  }
}
// 监听如果子组件下滑刷新，重新绑定事件
function reBindOnscroll(){
  window.onscroll = loadMorePost
}
</script>

<style lang='scss' scoped>
a{
  cursor: pointer;
}
.mine-post{
  position: relative;
}
.detail-nav{
  span:first-child{
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    left: 10px;
    color: var(--extreme);
  }
  span:last-child{
    font-size: 20px;
  }
  transition: 0.3s;
  margin-bottom: -50px;
  position: sticky;
  top: 60px;
  z-index: 999;
  height: 50px;
  line-height: 50px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  text-align: center;
}
.no-more-post{
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
}
</style>