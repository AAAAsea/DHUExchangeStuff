<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="16" :md="16" :lg="16" :xl="15">      
      <div class="detail-nav">
        <router-link to="/">
          <span class="iconfont icon-back">返回</span>
        </router-link>
        <span class="nav-title">{{postDetail?.user?.nickName}}</span>
      </div>
      <PostCard
        v-if="postDetail"
        :post="postDetail.post"
        :user="postDetail.user"
        :likeStatus="postDetail.likeStatus"
        @on-changeLikeStatus="()=>{postDetail.likeStatus = !postDetail.likeStatus; postDetail.post.likeCount += postDetail.likeStatus || -1}"
      />
      </el-col>
      <!-- 右侧 --> 
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="5">
        <RightSideBar/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// keep-alive的exclude必须显式声明name
  export default {
    name: 'PostDetail'
  }
</script>
<script setup>

import PostCard from '../components/PostCard.vue'
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { getPostDetail } from '@/api/post'
import { ref } from '@vue/reactivity'

const store = useStore()
const route = useRoute()
const postDetail = ref('')

function initPostDetail(){
  getPostDetail({id:route.params.id, offset: 0, limit: 5})
  .then(res=>{
    if(res.code === 20000)
    {
      postDetail.value = res.data;
      document.title = '🎲 '+ postDetail.value?.post?.title
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
  .detail-nav{
    span:first-child{
      font-size: 20px;
      font-weight: bold;
      position: absolute;
      left: 10px;
    }
    span:last-child{
      font-size: 20px;
    }
    position: sticky;
    top: 60px;
    z-index: 999;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid var(--secondary-bg);
    background: var(--post-card-bg);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    text-align: center;
  }
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