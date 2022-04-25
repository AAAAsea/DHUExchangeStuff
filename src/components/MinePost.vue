<template>
  <PostList
    v-if="postList && postList.length > 0"
    :postList="store.state.data.userPostList"
    :isLoading="false"

  />
  <el-empty v-else></el-empty>
</template>

<script setup>
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'
const store = useStore()
store.dispatch('fetchPostList', store.state.data.user.id)

</script>

<style scoped>
</style>