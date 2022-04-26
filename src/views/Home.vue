<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">        
        <PostList
          :postList="store.state.data.postList"
          class="postlist"
        />
        <div class="no-more-post" v-if="!haveMorePost" style="color: var(--secondary-bg)">——到底了——</div>
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar/>
      </el-col>
    </el-row>
  </div>
  <el-button 
    @click="showPostModel" 
    type="primary" 
    :icon="Edit" 
    circle 
    class="edit" 
    color="rgb(255,195,0)"
    size="large"
    :dark="true"
  />
</template>

<script>
import PostList from '../components/PostList.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import { isOnBottom } from '@/utils/tools'
import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { isAccountLoggedIn } from '../utils/auth'
import { computed, onDeactivated, onUnmounted } from '@vue/runtime-core'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    PostList,
    LeftSideBar,
    RightSideBar
  },
  setup(){
    const store = useStore()
    const data = store.state.data
    const haveMorePost = computed(()=>data.postCount > data.postList.length) 
    data.postList.splice()
    function initPostList(){
      store.dispatch('fetchPostList')
      .then(()=>{
        if(data.postCount === data.postList.length){
          window.onscroll = null; // 没有更多数据了关闭监听
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
    initPostList()
    function showPostModel(){
      if(!isAccountLoggedIn()){
        store.commit('showToast',{
        title: 'Error',
        message: '点击头像登录',
        type: 'warning',
      })
      }else{
        store.state.model.postModelFlag = true
      }
    }
    // 监听滚动
    window.onscroll = loadMorePost
    // 默认可以加载
    let canLoadMorePost = true;
    // 离开页面时取消监听
    onUnmounted(()=>{window.onscroll = null})
    onDeactivated(()=>{window.onscroll = null})
    // 滚动时判断是否到底部，并且500ms之内未触发更新，且还有数据
    function loadMorePost(){
      // 加载完毕关闭监听
      if(canLoadMorePost && isOnBottom(1000))
      {
        console.log("loadMorePost")
        canLoadMorePost = false;
        setTimeout(() => {
          canLoadMorePost = true; // 防止过快加载
          initPostList() // 防止一秒内到底后不动导致不加载，所以自动多判断一次
        }, 1000);
      }
    }
    return{
      Edit,
      store,
      showPostModel,
      haveMorePost
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 1200px;
  margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  .home{
    width: 100%;
    margin: 0 auto;
  }
}
.edit{
  position: fixed;
  right: 30px;
  bottom: 40px;
  font-size: 1.5rem;
  transform: scale(1.2);
}
.no-more-post{
  padding-bottom: 20px;
  text-align: center;
  width: 100%;
}
</style>