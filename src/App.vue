<template>
  <TopNavBar/>
  <router-view>
  </router-view>
  <PostModel/>
  <LoginModel/>
</template>

<script setup>
import TopNavBar from './components/TopNavBar'
import PostModel from './components/model/PostModel.vue'
import LoginModel from './components/model/LoginModel.vue'
</script>

<style scoped>
</style>
