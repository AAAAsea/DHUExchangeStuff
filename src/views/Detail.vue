<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">        
      <PostCard
        :post="postDetail.post"
        :user="postDetail.user"
        :likeStatus="postDetail.likeStatus"
        @on-changeLikeStatus="()=>{postDetail.likeStatus = !postDetail.likeStatus; postDetail.post.likeCount += postDetail.likeStatus || -1}"
      />
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar/>
      </el-col>
    </el-row>
  </div>
  <el-button 
    @click="showPostModel" 
    type="primary" 
    :icon="Edit" 
    circle 
    class="edit" 
    color="#AA03B0" 
    size="large"
    :dark="true"
  />
</template>

<script setup>
import PostCard from '../components/PostCard.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getPostDetail } from '@/api/post'
import { ref } from '@vue/reactivity'
const store = useStore()
const route = useRoute()
const postDetail = ref('')

console.log(route.path)
function initPostDetail(){
  getPostDetail({id:route.params.id, offset: 0, limit: 5})
  .then(res=>{
    console.log(res.data)
    if(res.code === 20000)
    {
      postDetail.value = res.data;
      postDetail.value.comments.sort((a,b)=>new Date(b.comment.createTime) - new Date(a.comment.createTime))
      postDetail.value.comments.forEach(element => {
        element.replys.sort((a,b)=>new Date(b.reply.createTime) - new Date(a.reply.createTime))
      });
    }else{
      postDetail.value.comments = []
      store.commit('showToast',{
        type: 'error',
        message: res.message ?? "加载失败"
      })
    }
  })
  .catch(err=>{
    console.log(err)
  })
}
initPostDetail()



</script>

<style lang="scss" scoped>
.home{
  width: 1200px;
  margin: 0 auto;
}

@media screen and (max-width: 1200px) {
  .home{
    width: 100%;
    margin: 0 auto;
  }
}
.edit{
  position: fixed;
  right: 30px;
  bottom: 40px;
  font-size: 1.5rem;
  transform: scale(1.2);
}
</style>