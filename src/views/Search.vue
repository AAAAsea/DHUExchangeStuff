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
          <input type="text" :placeholder="$t('nav.search') " maxlength="10" v-model="store.state.data.searchText" @keypress.enter="search"/>
        </div>
        <SearchPost/>
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar :tag="route.params.id"/>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import SearchPost from '@/components/SearchPost.vue'
import { useStore } from 'vuex'
import { isAccountLoggedIn } from '../utils/auth'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    LeftSideBar,
    RightSideBar,
    SearchPost,
    Search
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    function showPostModel(){
      if(!isAccountLoggedIn()){
        store.commit('showToast',{
        title: 'Error',
        message: '点击头像登录',
        type: 'error'
      })
      }else{
        store.state.model.postModelFlag = true
      }
    }
    const router = useRouter();
    function search(){
      if(store.state.data.searchText.trim() === '') return;
      router.replace({ path: '/search',query: {keyword: store.state.data.searchText.trim()}})
    }
    return{
      // Edit,
      store,
      showPostModel,
      route,
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