<template>
  <div class="container">
      <el-row  justify="between" align="middle" class="nav">
        <!-- 左侧 -->
        <el-col  :xs="8" :sm="9" :md="9">
          <!-- <router-link to="/"> -->
            <h1 @click="store.state.model.LeftDrawerModelFlag = !store.state.model.LeftDrawerModelFlag">
              <img src="https://www.dhu.edu.cn/_upload/tpl/0b/3f/2879/template2879/image/login_mini.png" alt="">
            </h1>
          <!-- </router-link> -->
        </el-col>
        <!-- 主体 -->
        <el-col  :xs="0" :sm="4" :md="4">        
          <div class="nav-titles" ref='titles'>
          <router-link 
            to='/' 
            :class="{ active: route.path === '/' }"
          >
            <div ref="home">
              <el-icon color="#eee" size="35px" ><home-filled /></el-icon>
            </div>
          </router-link>
        </div>
        </el-col>
        <!-- 右侧 -->
        <el-col  :xs="16" :sm="11" :md="11" >
          <div class="user-info" >
            <div class="search-box" tabindex="111">
              <el-icon class="search-icon"><search /></el-icon>
              <input type="text" :placeholder="$t('nav.search') "/>
            </div>
            <div class="avatar">
              <!-- <router-link to="/mine"> -->
                <el-dropdown>
                  <img :src="userInfo?.headerUrl ?? avatarDefaultImg">
                  <template #dropdown>
                    <el-dropdown-menu>
                      <router-link to="/mine">
                        <el-dropdown-item>个人主页</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item @click="logOut" v-if="isAccountLoggedIn()">
                        退出登录
                      </el-dropdown-item>
                      <el-dropdown-item @click="logIn"  v-else>
                        登录
                      </el-dropdown-item>
                      <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item>
                      <el-dropdown-item divided>Action 5</el-dropdown-item> -->
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              <!-- </router-link> -->
            </div>
            <!-- <el-button type="text" @click="logOut" v-show="store?.state?.data?.isLoggedIn"></el-button> -->
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {  reactive, ref, computed } from 'vue'
import { HomeFilled,Search } from '@element-plus/icons-vue'
import avatarDefaultImg from '@/assets/img/unlogin.png'
import { isAccountLoggedIn } from '@/utils/auth'
export default {
  name: "NavBar",
  components: {
    HomeFilled,
    Search
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const router = useRouter();
    const userInfo = computed(()=>store.state.data.user)
    const titles = ref(null)  // 绑定DOM
    const gunOffset = reactive({
      offsetX: 0,
      width: 1
    })
    const go = (num)=>{
      router.go(num)
    }
    function logIn(){
      store.state.model.loginModelFlag = true;
    }
    function logOut(){
      console.log("hh")
      store.state.data.isLoggedIn = false;
      store.state.data.user = null;
      store.commit('showToast',{
        type: "info",
        title: "已登出账号"
      })
    }
    return{
      go,
      userInfo,
      route,
      gunOffset,
      titles,
      avatarDefaultImg,
      logOut,
      logIn,
      store,
      isAccountLoggedIn
    }
  }
}
</script>

<style lang="scss" scoped>
// 占位
.container{
  height: 68px;
}
// 整体样式
.nav {
  // border: 1px solid red;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  // display: flex;
  color: var(--color-text);
  height: 60px;
  padding: 0 100px;
  @media screen and(max-width: 1200px) {
    padding: 0 20px;
  }
  z-index: 100;
  background-color: var(--top-nav-bg);
}

// 头像
h1{
  flex: 3;
  display: flex;
  align-items: center;
  img{
    // width: 40px;
    height: 40px;
  }
}

// 路由菜单
.nav-titles {
  // border: 1px solid red;
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 50px;
  position: relative;
  .active{
    border-bottom: 2px solid var(--color-text);
  }

  a{
    text-decoration: none;
    font-weight: bold;
    transition: 0.2s;
    padding: 10px 15px;
    border-bottom: 2px solid transparent;
    // border-radius: 10px;
    &:hover{
      background: var(--color-secondary-bg);
    }
  }
  
}

// 搜索框和用户信息
.user-info {
  // border: 1px solid red;
  flex: 3;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  .search-box{
    margin-right: 10px;
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    background-color: var(--secondary-bg);
    transition: 0.3s;
    padding-right: 10px;
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

  .avatar
  {
    display: flex;
    justify-content: flex-end;
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
    }
  }


}

</style>