<template>
  <div class="container">
    <template v-if="isLoading">
      <div class="skeleton" v-for="(item, index) in [1,2,3,4,5]" :key="index">
        <br />
        <el-skeleton style="--el-skeleton-circle-size: 100px">
          <template #template>
            <el-skeleton-item variant="circle" />
          </template>
        </el-skeleton>
        <el-skeleton />
      </div>
    </template>
    <router-link 
      v-for="post in postList"
      :to="{ path: '/detail/' + post.post.id }"
      :key="post.post.id"
      class="post-card"
    >
      <PostCard
        :title="post.post.title"
        :content="post.post.content.substr(0, 50) + (post.post.content.length > 50 ? '...' : '')"
        :avatarUrl="post.user.headerUrl"
        :tagName="post.post.tagName"
        :time="post.post.createTime"
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
  props: ['postList','isLoading'],
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

  .skeleton{
    width: 100%;
  }
  .post-card{
    margin-bottom: 20px;
    box-sizing: border-box;
    color: white;
    width: 100%;
    .post{
      width: 100%;
    }
  }
}
</style>