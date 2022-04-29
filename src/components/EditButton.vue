<template>
    <el-button 
    @click="showPostModel" 
    type="primary" 
    :icon="Edit" 
    circle 
    class="edit" 
    color="rgb(255,195,0)" 
    size="large"
    v-show="store.state.model.publishPostFlag"
  />
</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { isAccountLoggedIn } from '../utils/auth'
import { useStore } from 'vuex'

const store = useStore()
function showPostModel(){
  if(!isAccountLoggedIn()){
    store.commit('showToast',{
    title: 'Error',
    message: '点击头像登录',
    type: 'warning',
  })
  }else{
    store.state.model.postModelFlag = true
  }
}
</script>

<style scoped>
.edit{
  z-index: 999;
  position: fixed;
  right: 30px;
  bottom: 40px;
  font-size: 1.5rem;
  transform: scale(1.2);
}
</style>