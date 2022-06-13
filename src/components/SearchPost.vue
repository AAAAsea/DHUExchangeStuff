<template>
  <div class="mine-post" @scroll="onScroll">
    <div class="tag-nav"><h3>搜索： {{route.params.keyword}}</h3></div>
    <transition name="el-zoom-in-top">
      <PostList
        @on-update="reBindOnscroll"
        v-if="data.searchPostList?.length > 0"
        :postList="data.searchPostList"
        :isLoading="false"
      />
    </transition>
    <div class="no-more-post" style="color: var(--secondary-text)">
      {{haveMorePost ? 'Loading' : '——到底了——'}}
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'
import { onDeactivated, onUnmounted, ref } from '@vue/runtime-core'
import { isOnBottom } from '@/utils/tools'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const route = useRoute()
const store = useStore()
const data = store.state.data
const haveMorePost = ref(true)
const onTop = ref(true)

async function initSearchPostList({offset = 0, limit = 10, keyword = route.params.keyword}){
  try{
    let _length = data.searchPostList.length
    await store.dispatch('fetchSearchPostList', {offset, limit, keyword}) // 等待数据加载
    if(data.searchPostList.length - _length < limit){
      window.removeEventListener('scroll',loadMorePost) // 没有更多数据了关闭监听
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
initSearchPostList({})
.finally(()=>{
  window.addEventListener('scroll',loadMorePost)
})

// 监听路由变化
onBeforeRouteUpdate( (to, from) => {
  if(to.params.keyword !== from.params.keyword)
  onTop.value = true; // 防止切换user不透明
  store.state.data.searchPostList.splice(0)
  initSearchPostList({keyword: to.params.keyword}) // 否则会加载之前的keyword
});





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
  // 加载完毕只监听导航栏
  if(!(haveMorePost.value)){
    window.removeEventListener('scroll',loadMorePost)
    return;
  }
  if(canLoadMorePost && isOnBottom(1000))
  {
    // console.log("loadMoreTagPost")
    canLoadMorePost = false;
    initSearchPostList(data.searchPostList.length, 10) 
    setTimeout(() => {
      canLoadMorePost = true; // 防止过快加载
      initSearchPostList(data.searchPostList.length, 10) // 防止一秒内到底后不动导致不加载，所以自动多判断一次
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
.tag-nav{
  border-bottom: 1px solkeyword var(--secondary-bg);
  background: var(--post-card-bg);
  transition: 0.3s;
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
  wkeywordth: 100%;
}
</style>