<template>
  <div class="container">
    <PostDetail
    class="detail"
    :postDetail="postDetail"
    />
  </div>
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
      postDetail: {}
    })
    getPostDetail(props.id)
    .then((res)=>{
      data.postDetail = res
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
.detail{
  width: 70vw;
  margin: 0 auto;
}
</style>