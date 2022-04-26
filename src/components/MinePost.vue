<template>
  <PostList
    v-if="data.userPostList?.length > 0"
    :postList="data.userPostList"
    :isLoading="false"

  />
  <div class="no-more-post" v-if="!haveMorePost" style="color: var(--secondary-bg)">——到底了——</div>
</template>

<script setup>
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'
import { onDeactivated, onUnmounted, ref } from '@vue/runtime-core'
import { isOnBottom } from '@/utils/tools'


const store = useStore()
const data = store.state.data

const haveMorePost = ref(true)

function initUserPostList(){
  store.dispatch('fetchPostList', data.user.id)
  .then(()=>{
    if(data.userPostCount === data.userPostList.length){
      window.onscroll = null; // 没有更多数据了关闭监听
      haveMorePost.value = false; // 没有更多数据了
    }
  })
  .catch(err=>{
      console.log(err)
      store.commit('showToast',{
        type: "error",
        message: "加载失败"
      })    
  })
}
initUserPostList()

// 监听滚动
window.onscroll = loadMorePost
// 默认可以加载
let canLoadMorePost = true;
// 离开页面时取消监听
onUnmounted (()=>{window.onscroll = null})
onDeactivated (()=>{window.onscroll = null})
// 滚动时判断是否到底部，并且500ms之内未触发更新，且还有数据
function loadMorePost(){
  // 加载完毕关闭监听
  if(canLoadMorePost && isOnBottom(1000))
  {
    console.log("loadMoreUserPost")
    canLoadMorePost = false;
    setTimeout(() => {
      canLoadMorePost = true; // 防止过快加载
      initUserPostList() // 防止一秒内到底后不动导致不加载，所以自动多判断一次
    }, 1000);
  }
}
</script>

<style scoped>
.no-more-post{
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
}
</style>