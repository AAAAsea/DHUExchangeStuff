<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">   
        <div class="message-bar">
          <router-link to="/message/letter"><span>私信</span></router-link>
          <router-link to="/message/notice"><span>通知</span></router-link>
        </div>   
        <router-view/>
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
import { useStore } from 'vuex'
import { isAccountLoggedIn } from '../utils/auth'
import { useRoute } from 'vue-router'



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    LeftSideBar,
    RightSideBar,
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
    return{
      // Edit,
      store,
      showPostModel,
      route
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

.message-bar{
  display: flex;
  background: var(--secondary-bg);
  height: 30px;
  padding-left: 10px;
  border-radius: 5px;
  align-items: center;
  a{
    height: 100%;
    display: flex;
    align-items: center;
    padding:0 10px;
  }
  .router-link-exact-active{
    background: var(--primary-color);
    color: var(--main-bg)
  }
}
</style>