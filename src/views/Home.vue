<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="14" :md="14" :lg="14" :xl="14">        
        <PostList
          :postList="store.state.data.postList"
          class="postlist"
        />
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
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
    color="var(--primary-color)" 
    size="large"
    :dark="true"
  />
</template>

<script>
import PostList from '../components/PostList.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import {   } from '@vue/reactivity'
import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { isAccountLoggedIn } from '../utils/auth'

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
    store.state.data.postList.splice()
    store.dispatch('fetchPostList')
    .then(()=>{
      // data.isLoading = false
    })
    .catch(err=>{
      console.log(err)
    })

    function showPostModel(){
      if(!isAccountLoggedIn()){
        store.commit('showToast',{
        title: 'Error',
        message: '点击头像登录',
        type: 'error',
      })
      }else{
        store.state.model.postModelFlag = true
      }
    }
    return{
      Edit,
      store,
      showPostModel,
      // isDark
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
</style>