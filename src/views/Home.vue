<template>
  <div class="container">
    <PostList
    :style="{width: '70%'}"
    :postList="postList"
  />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import { getPostList } from '../api/post.js'
import { reactive, toRefs } from '@vue/reactivity'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    PostList
  },
  setup(){
    const data = reactive({
      postList: []
    })
    getPostList()
    .then((res)=>{
      data.postList.splice()
      data.postList.push(...res)
    })
    .catch(err=>{
      console.log(err)
    })

    return{
      ...toRefs(data)
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
}
</style>