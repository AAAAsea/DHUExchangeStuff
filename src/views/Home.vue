<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">   
        <div class="search-box" tabindex="111" v-if="store.state.model.modelWidth === '95vw'">
          <el-icon class="search-icon"><Search /></el-icon>
          <input type="search" :placeholder="$t('nav.search') " maxlength="10" v-model="store.state.data.searchText" @keypress.enter="search"/>
        </div>
        <!-- <el-collapse-transition> -->
          <PostList
            v-if="store.state.data.postList.length > 0"
            @on-update="reBindOnscroll"
            :postList="store.state.data.postList"
            class="postlist"
          />
        <!-- </el-collapse-transition> -->
        
      <div class="no-more-post" style="color: var(--secondary-text)">{{haveMorePost ? 'Loading' : '——到底了——'}}</div>
      
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar/>
      </el-col>
    </el-row>
  </div>
  <edit-button/>
</template>

<script>
import PostList from '../components/PostList.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import EditButton from '@/components/EditButton.vue'
import { Search } from '@element-plus/icons-vue'

import { isOnBottom } from '@/utils/tools'
// import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
// import { isAccountLoggedIn } from '../utils/auth'
import { computed, onActivated, onDeactivated, onUnmounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    PostList,
    LeftSideBar,
    RightSideBar,
    EditButton,
    Search
  },
  setup(){
    const store = useStore()
    const data = store.state.data
    
    let firstIn = true;
    data.searchText = '';
    const haveMorePost = computed(()=>data.postCount > data.postList.length) 
    data.postList.splice()
    async function initPostList(){
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
    .finally(()=>{
      // 第一次请求后监听滚动
      // console.log("hhh")
      window.onscroll = loadMorePost
      firstIn = false; // 判断下一次进入
    })
    onActivated(()=>{
      // console.log("actived")
      if(!firstIn && haveMorePost.value)
        window.onscroll = loadMorePost
    })
    // function showPostModel(){
    //   if(!isAccountLoggedIn()){
    //     store.commit('showToast',{
    //     title: 'Error',
    //     message: '点击头像登录',
    //     type: 'warning',
    //   })
    //   }else{
    //     store.state.model.postModelFlag = true
    //   }
    // }
    const router = useRouter();
    function search(){
      if(store.state.data.searchText.trim() === '') return;
        router.push({ path: '/search',query: {keyword: store.state.data.searchText.trim()}})
    }
    // 默认可以加载
    let canLoadMorePost = true;
    // 离开页面时取消监听
    onUnmounted(()=>{window.onscroll = null})
    onDeactivated(()=>{window.onscroll = null})
    // 滚动时判断是否到底部，并且500ms之内未触发更新，且还有数据
    function loadMorePost(){
      // 加载完毕关闭监听
      if(!haveMorePost.value){
        window.onscroll = null;
        return;
      }
      if(canLoadMorePost && isOnBottom(1000))
      {
        // console.log("loadMorePost")
        canLoadMorePost = false;
        initPostList()
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
    return{
      // Edit,
      store,
      // showPostModel,
      haveMorePost,
      loadMorePost,
      reBindOnscroll,
      search,
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
.search-box{
    overflow: hidden;
    display: flex;
    align-items: center;
    background-color: var(--post-card-bg);
    transition: 0.3s;
    padding: 3px 0;
    padding-right: 10px;
    margin-bottom: 8px;
    .search-icon{
      padding: 10px;
    }
    // 该元素或其后代元素获得焦点
    &:focus-within, &:hover{
      opacity: 1;
      .search-icon{
        color: var(--color-bg);
      }
    }
    input{
      width: 100%;
      background: transparent;
      height: 35px;
      border: none;
      color: var(--color-text);
    }
  }
</style>