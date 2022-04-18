<template>
  <TopNavBar/>
  <router-view>
  </router-view>
  <PostModel/>
</template>

<script>
import TopNavBar from './components/TopNavBar'
import PostModel from './components/model/PostModel.vue'

export default {
  name: 'App',
  components: {
    TopNavBar,
    PostModel
  }
}
</script>

<style scoped>
</style>
