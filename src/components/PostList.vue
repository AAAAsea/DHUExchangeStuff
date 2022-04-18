<template>
  <div class="container">
    <router-link 
      v-for="post in postList"
      :to="{ path: '/detail/' + post.id }"
      :key="post.id"
      class="post-card"
    >
      <PostCard
        :title="post.title"
        :content="post.content.substr(0, 50) + (post.content.length > 50 ? '...' : '')"
        :avatarUrl="post.avatarUrl"
        :tagName="post.tagName"
        :time="post.time"
        class="post"
      />
    </router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import PostCard from "./PostCard.vue"
export default {
  name: "PostList",
  props: ['postList'],
  components: {
    PostCard
  },
  setup(){
    const data = reactive({
      
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
    box-sizing: border-box;
    color: white;
    width: 100%;
    .post{
      width: 100%;
    }
  }
}
</style>