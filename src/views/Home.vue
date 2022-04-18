<template>
  <div class="home-container">
    <PostList
      :style="{width: '70%'}"
      :postList="postList"
      :isLoading="isLoading"
      class="postlist"
    />
      <el-button @click="showPostModel" type="primary" :icon="Edit" circle class="edit" color="#626aef" size="large"/>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import { getPostList } from '../api/post.js'
import { reactive, toRefs } from '@vue/reactivity'
import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { isAuthLogin } from '../utils/auth'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {
    PostList
  },
  setup(){
    const store = useStore()
    const data = reactive({
      postList: [],
      isLoading: true
    })
    getPostList()
    .then((res)=>{
      res = res.data
      data.postList.splice()
      data.postList.push(...res)
      data.isLoading = false

    })
    .catch(err=>{
      console.log(err)
    })

    function showPostModel(){
      if(!isAuthLogin()){
        store.commit('showToast',{
        title: 'Warning',
        message: '请先登录',
        type: 'warning'
      })
      }else{
        store.state.model.postModelFlag = true
      }
    }
    return{
      ...toRefs(data),
      Edit,
      store,
      showPostModel
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container{
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