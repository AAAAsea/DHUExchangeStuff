<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">      
        <transition name="el-zoom-in-top">
          <router-view></router-view>
        </transition>
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar/>
      </el-col>
    </el-row>
  </div>
  <!-- <EditButton/> -->
</template>

<script>
// import PostList from '../components/PostList.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
// import EditButton from '@/components/EditButton.vue'
// import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { isAccountLoggedIn } from '../utils/auth'



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    // EditButton,
    LeftSideBar,
    RightSideBar
  },
  setup(){
    const store = useStore()
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
    return{
      // Edit,
      store,
      showPostModel
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