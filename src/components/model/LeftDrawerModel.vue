<template>
  <div class="drawer-left">
    <el-drawer
      v-model="store.state.model.leftDrawerModelFlag"
      title=""
      direction="ltr"
      :before-close="handleClose"
      custom-class="drawer"
    >
      <el-dropdown class="user">
        <img :src="userInfo?.headerUrl ?? avatarDefaultImg">
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/mine">
              <el-dropdown-item v-if="isAccountLoggedIn()">个人主页</el-dropdown-item>
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
      <LeftSideBar/>
    </el-drawer>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import LeftSideBar from '../LeftSideBar.vue'
import { isAccountLoggedIn } from '@/utils/auth'
import avatarDefaultImg from '@/assets/img/unlogin.png'
import { computed } from '@vue/runtime-core'

const  store = useStore()
const userInfo = computed(()=>store.state.data.user)
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
</script>
<style lang="scss" scoped>
:deep() .drawer{
  background: var(--main-bg);
  width: 250px !important;
}
.drawer{
  .user{
    img{
      width:50px;
      border-radius: 50%;
    }
    margin-bottom: 100px;
    margin-left: 75px;
  }
}
</style>