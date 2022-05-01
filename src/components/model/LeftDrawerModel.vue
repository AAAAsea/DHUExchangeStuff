<template>
  <div class="drawer-left">
    <el-drawer
      v-model="store.state.model.leftDrawerModelFlag"
      title=""
      direction="ltr"
      custom-class="drawer"
    >
      <div class="user">
        <img :src="userInfo?.headerUrl  ?  (userInfo?.headerUrl.replace('/header','/image')  + '?width=100') : avatarDefaultImg">
        <div @click="logOut" v-if="isAccountLoggedIn()">
          退出登录
        </div>
        <div @click="logIn"  v-else>
          登录
        </div>
      </div>
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
import { logout } from '@/api/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const  store = useStore()
const userInfo = computed(()=>store.state.data.user)

function logIn(){
  store.state.model.loginModelFlag = true;
}
function logOut(){
  store.commit('resetUserInfo')
  logout()
  .then((res)=>{
    if(res.code === 20000)
    {
      store.commit('showToast',{
        type: "info",
        title: "已登出账号"
      })
      router.push({path: '/'})
    }
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
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
    margin-bottom: 100px;
    text-align: center;
    div{
      margin-top: 10px;
      
    }
  }
}
</style>