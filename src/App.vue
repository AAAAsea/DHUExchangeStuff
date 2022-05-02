<template>
  <!-- 顶部导航栏 -->
  <TopNavBar/>
  <!-- 主页面 -->
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="['PostDetail', 'User']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <!-- 发帖模块 -->
  <PostModel/>
  <!-- 登录模块 -->
  <LoginModel/>
  <!-- 侧边导航栏抽屉 -->
  <LeftDrawerModel/>  
  <!-- 侧边tag栏抽屉 -->
  <RightDrawerModel/>
  <!-- 回到顶部 -->
  <el-backtop :right="30" :bottom="100" 
    v-show="store.state.model.publishPostFlag"  
  >
    <el-button 
    type="primary" 
    :icon="Pointer" 
    circle 
    class="pointer" 
    color="rgb(255,195,0)" 
    size="large"
    :dark="true"
  />
  </el-backtop>
</template>

<script setup>
import TopNavBar from './components/TopNavBar'
import PostModel from './components/model/PostModel.vue'
import LoginModel from './components/model/LoginModel.vue'
import LeftDrawerModel from './components/model/LeftDrawerModel.vue'
import RightDrawerModel from './components/model/RightDrawerModel.vue'
import { useStore } from 'vuex'
import { Pointer } from '@element-plus/icons-vue'

const store = useStore()
window.addEventListener('touchstart',handleTouchStart)
window.addEventListener('touchend',handleTouchEnd)
// 监听窗口变化
window.addEventListener('resize',()=>{
  store.state.model.modelWidth = document.documentElement.clientWidth >= 768 ? '500px' : '95vw';
})
// 初始化模块宽度
store.state.model.modelWidth = document.documentElement.clientWidth >= 768 ? '500px' : '95vw';
// 全局呼出导航栏
let startX = 0; 
function handleTouchStart(e){
  startX = e.changedTouches[0].clientX
}
function handleTouchEnd(e){
  const model = store.state.model
  // 右滑呼出导航栏
  if(e.changedTouches[0].clientX - startX > 80 && !model.rightDrawerModelFlag)
    model.leftDrawerModelFlag = true;
  else if(e.changedTouches[0].clientX - startX > 80 && model.rightDrawerModelFlag)
    model.rightDrawerModelFlag = false;

  // 左滑关闭导航栏
  if(e.changedTouches[0].clientX - startX < -80 && !model.leftDrawerModelFlag)
    model.rightDrawerModelFlag = true;
  else if(e.changedTouches[0].clientX - startX < -80 && model.leftDrawerModelFlag)
    model.leftDrawerModelFlag = false;

}
</script>

<style scoped>
.pointer{
  font-size: 1.5rem;
  transform: scale(1.2);
}
</style>
