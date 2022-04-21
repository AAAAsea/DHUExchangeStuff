<template>
  <div class="post-list" v-infinite-scroll="loadMorePost" infinite-scroll-distance="500" infinite-scroll-delay="500">
    <template v-if="isLoading">
      <div class="skeleton" v-for="(item, index) in [1,2,3,4,5]" :key="index">
        <br />
        <el-skeleton style="--el-skeleton-circle-size: 70px" animated>
          <template #template>
            <el-skeleton-item variant="circle" />
          </template>
        </el-skeleton>
        <el-skeleton animated :rows="1"/>
      </div>
    </template>
    <router-link 
      v-for="post in postList"
      :to="{ path: '/detail/' + post.post.id }"
      :key="post.post.id"
      class="post-list-card"
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
import { useStore } from 'vuex'
export default {
  name: "PostList",
  props: ['postList','isLoading'],
  components: {
    PostCard
  },
  setup(){
    const data = reactive({})
    const store = useStore()
    function loadMorePost(){
      console.log("触底加载")
      store.dispatch('fetchPostList')
    }
    return{
      ...toRefs(data),
      loadMorePost
    }
  }
}
</script>

<style lang="scss" scoped>
.post-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  .skeleton{
    color: var(--post-card-bg) !important;
    width: 90%;
  }
  .post-list-card{
    margin-bottom: 10px;
    box-sizing: border-box;
    width: 100%;
    .post{
      width: 100%;
    }
  }
}
</style>