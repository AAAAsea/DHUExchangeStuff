<template>
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
  <PostDetail
    v-else
    class="detail"
    :postDetail="postDetail"
  />
</template>

<script>
import PostDetail from "../components/PostDetail.vue"
import { getPostDetail } from '../api/post.js'
import { reactive, toRefs } from 'vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Detail",
  props: ['id'],
  components: {
    PostDetail
  },
  setup(props){
    const data = reactive({
      postDetail: {},
      isLoading: true
    })
    getPostDetail(props.id)
    .then((res)=>{
      data.postDetail = res
      data.isLoading = false
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

<style lang="scss" scoped>
  .detail, .skeleton
  {
    width: 70%;
    margin: 0 auto;
  }
  @media screen and (max-width: 1200px){
    .detail, .skeleton{
      width: 80%;
    }
  } 
</style>