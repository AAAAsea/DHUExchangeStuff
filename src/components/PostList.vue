<template>
  <div class="container">
    <router-link 
      v-for="post in postList"
      :to="{ path: '/detail/'+post.id}"
      :key="post.id"
    >
      <Post
      :title="post.title"
      :subTitle="post.subTitle"
      class="post-card"
    />
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import Post from "./Post.vue"
export default {
  name: "PostList",
  components: {
    Post
  },
  setup(){
    const data = reactive({
      postList: [
        {
          id: 0,
          title: "hhh",
          subTitle: "埃德加啊地方就爱上对方就第三方模具费马上大家驸马吗",
        },{
          id: 1,
          title: "hhh",
          subTitle: "埃德加啊地方就爱上对方就第三方模具费马上大家驸马吗",
        }
      ]
    })
    return{
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  .post-card{
    margin-bottom: 30px;
    color: white;
  }
}
</style>