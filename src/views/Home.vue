<template>
  <div class="container">
    <PostList
      :style="{width: '70%'}"
      :postList="postList"
      :isLoading="isLoading"
      class="postlist"
    />
      <el-button type="primary" :icon="Edit" circle class="edit" color="#626aef" size="large"/>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import { getPostList } from '../api/post.js'
import { reactive, toRefs } from '@vue/reactivity'
import { Edit } from '@element-plus/icons-vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    PostList
  },
  setup(){
    const data = reactive({
      postList: [],
      isLoading: true
    })
    getPostList()
    .then((res)=>{
      data.postList.splice()
      data.postList.push(...res)
      data.isLoading = false

    })
    .catch(err=>{
      console.log(err)
    })

    return{
      ...toRefs(data),
      Edit
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: center;
  .edit{
    position: fixed;
    bottom: 30px;
    right: 30px;
    transform: scale(1.5);
    font-size: 20px;
  }
}
</style>