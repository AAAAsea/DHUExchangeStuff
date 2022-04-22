<template>
  <div 
  class="post-list" 
  v-infinite-scroll="loadMorePost" 
  infinite-scroll-distance="1000" 
  infinite-scroll-delay="500"
  @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove ="handleTouchMove"
  >
  <el-icon><refresh-right :style="refreshStyle" color="var(--main-bg)"/></el-icon>
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
import { RefreshRight  }  from '@element-plus/icons-vue'
export default {
  name: "PostList",
  props: ['postList'],
  components: {
    PostCard,
    RefreshRight
  },
  setup(){
    const data = reactive({})
    const store = useStore()
    const refreshStyle = reactive({
      position: 'absolute',
      top: '-70px',
      zIndex: 99,
      background: 'var(--main-text)',
      padding: '10px',
      borderRadius: '50%',
      fontSize: '1.5em',
      transform: '',
      transition: ''
    })
    function loadMorePost(){
      // 防止首次加载多次请求
      if(store.state.data.postList.length > 0)
      {
        store.dispatch('fetchPostList')
      }
      
    }
    let startX = 0; // 导航栏
    let startY = 0; // 下拉刷新
    let scrollTop = 0;
    function handleTouchStart(e){
      refreshStyle.transition = ''
      startX = e.changedTouches[0].pageX
      startY = e.changedTouches[0].pageY
      scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
    }
    function handleTouchEnd(e){
      // console.log(e.changedTouches[0].pageX - startX)
      if(e.changedTouches[0].pageX - startX > 100)
        store.state.model.leftDrawerModelFlag = true;
      else if(e.changedTouches[0].pageX - startX < -100)
        store.state.model.leftDrawerModelFlag = false;
      if(e.changedTouches[0].pageY-startY>100 && scrollTop===0 )
      {
        store.dispatch('fetchNewPostList')
      }
      if(e.changedTouches[0].pageY-startY > 200) 
      {
        refreshStyle.top = '20px';
        store.dispatch('fetchNewPostList')
        .then(()=>{
          setTimeout(() => {
            refreshStyle.transform = 'scale(0)'
            refreshStyle.opacity = '0'
            refreshStyle.top = '-70px'
          }, 500);
        })
        .catch(()=>{
          refreshStyle.top = '-70px'
        })
      }else{
        refreshStyle.top = '-70px'
        refreshStyle.opacity = '0'
        refreshStyle.transform = ''
      }
      refreshStyle.transition = ' .2s ease'
    }
    function handleTouchMove(e){
      // console.log(Math.log(e.changedTouches[0].pageY-startY))
      if(scrollTop !== 0){ return }
      if(e.changedTouches[0].pageY-startY > 0) e.preventDefault();
      if(e.changedTouches[0].pageY-startY > 300) { return }
      refreshStyle.top = Math.pow(e.changedTouches[0].pageY-startY , 1/3)*30 - 70 + 'px'
      refreshStyle.opacity = (e.changedTouches[0].pageY-startY)/150
      refreshStyle.transform = 'rotate(' + (e.changedTouches[0].pageY-startY)/150 * 180 + 'deg)'
    }
    return{
      ...toRefs(data),
      loadMorePost,
      handleTouchStart,
      handleTouchEnd,
      refreshStyle,
      handleTouchMove
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