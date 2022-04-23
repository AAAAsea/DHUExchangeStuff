<template>
  <TopNavBar/>
  <router-view >
  </router-view >
  <PostModel/>
  <LoginModel/>
  <LeftDrawerModel/>
</template>

<script setup>
import TopNavBar from './components/TopNavBar'
import PostModel from './components/model/PostModel.vue'
import LoginModel from './components/model/LoginModel.vue'
import LeftDrawerModel from './components/model/LeftDrawerModel.vue'
import { useStore } from 'vuex'

const store = useStore()
window.addEventListener('touchstart',handleTouchStart)
window.addEventListener('touchend',handleTouchEnd)
let startX = 0; // 导航栏
// eslint-disable-next-line no-unused-vars
let scrollTop = 1;
function handleTouchStart(e){
  startX = e.changedTouches[0].clientX
  scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
}
function handleTouchEnd(e){
  // 右滑呼出导航栏
  if(e.changedTouches[0].clientX - startX > 80)
    store.state.model.leftDrawerModelFlag = true;
  else if(e.changedTouches[0].clientX - startX < -80)
    store.state.model.leftDrawerModelFlag = false;
}
</script>

<style scoped>
</style>
