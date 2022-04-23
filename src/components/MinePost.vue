<template>
  <PostList
    :postList="postList"
    :isLoading="false"
    class="postlist"
  />
</template>

<script setup>
import { useStore } from 'vuex'
import PostList from '@/components/PostList.vue'

const store = useStore()
const postList = store.state.data.postList

</script>

<style scoped>

  @media screen and (max-width: 1200px){
    .postlist{
      width: 80%;
    }
  } 
</style>