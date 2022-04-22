<template>
  <div 
  class="post-list" 
  v-infinite-scroll="loadMorePost" 
  infinite-scroll-distance="1000" 
  infinite-scroll-delay="500"
  v-loading="false"
  >
    <!-- <template v-if="isLoading">
      <div class="skeleton" v-for="(item, index) in [1,2,3,4,5]" :key="index">
        <br />
        <el-skeleton style="--el-skeleton-circle-size: 70px" animated>
          <template #template>
            <el-skeleton-item variant="circle" />
          </template>
        </el-skeleton>
        <el-skeleton animated :rows="1"/>
      </div>
    </template> -->
    <div 
      v-for="post in postList"
      :key="post.post.id"
      class="post-list-card"
    >
      <PostCard
        :post="post.post"
        :user="post.user"
        class="post"
      />
    </div>
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
      // 防止首次加载多次请求
      if(store.state.data.postList.length > 0)
      {
        store.dispatch('fetchPostList')
      }
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
  @media screen and(min-width: 1000px) {
    // margin: 0 8px;
  }
  .skeleton{
    color: var(--post-card-bg) !important;
    width: 90%;
  }
  .post-list-card{
    margin-bottom: 8px;
    box-sizing: border-box;
    width: 100%;
    .post{
      width: 100%;
    }
  }
}
</style>