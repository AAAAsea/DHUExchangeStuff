<template>
  <PostList
    v-if="postList && postList.length > 0"
    :postList="postList"
    :isLoading="false"
    class="postlist"
  />
  <el-empty v-else></el-empty>
</template>

<script setup>
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'

const store = useStore()
store.dispatch('fetchPostList', store.state.data.user.id)
const postList = store.state.data.userPostList

</script>

<style scoped>
</style>