<template>
  <transition name="el-zoom-in-top">
    <div 
      v-show="postList.length > 0"
      class="post-list" 
      @touchstart="handleTouchStart" @touchend="handleTouchEnd" @touchmove ="handleTouchMove"
    >
      <el-icon :style="refreshStyle" color="var(--primary-color)"><refresh-right/></el-icon>
      <el-empty v-if="postList?.length === 0" description="没有更多数据"></el-empty>
      <div 
        v-for="item in postList"
        :key="item.post.id"
        class="post-list-card"
      >
        <PostCard
          :post="item.post"
          :user="item.user"
          :likeStatus="item.likeStatus" 
          @on-changeLikeStatus="()=>{ 
            item.post.likeStatus = !item.post.likeStatus; 
            item.post.likeCount += item.post.likeStatus || -1
          }"
          @on-mainReply="item.post.commentCount++"
          class="post"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive } from '@vue/reactivity'
import PostCard from "./PostCard.vue"
import { useStore } from 'vuex'
import { RefreshRight  }  from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
export default {
  name: "PostList",
  props: ['postList'],
  components: {
    PostCard,
    RefreshRight
  },
  setup(props,context){
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
      transition: '',
    })
    const route = useRoute()
    let startY = 0; // 下拉刷新
    let scrollTop = 0;
    let direction = 0; // 如果在顶部向下滑动，设置为1，用于判断一开始的滑动方向
    let directionFlag = true; // 
    function handleTouchStart(e){
      refreshStyle.transition = ''
      startY = e.changedTouches[0].clientY
      scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);
    }
    function handleTouchEnd(e){
      direction = 0;
      directionFlag = true;
      refreshStyle.transition = '0.15s ease-out'
      if(e.changedTouches[0].clientY-startY>100 && scrollTop===0 )
      {
        store.dispatch('fetchNewPostList', route.params.id)
        .then(res=>{
          if(res === 'all')
          {
            store.commit('showToast',{
              type: 'success',
              message: '没有更新的数据了'
            })
          }
        })
      }
      if(e.changedTouches[0].clientY-startY > 200) 
      {
        refreshStyle.top = '20px';
        context.emit('on-update')
        store.dispatch('fetchNewPostList', route.params.id)
        .then(()=>{
        })
        .catch(()=>{
        })
        .finally(()=>{
          setTimeout(() => {
            refreshStyle.transform = ''
            refreshStyle.opacity = '0'
            refreshStyle.top = '-70px'
          }, 500);
        })
      }else{
        refreshStyle.top = '-70px'
        refreshStyle.opacity = '0'
        refreshStyle.transform = ''
      }
      
    }
    function handleTouchMove(e){
      if(directionFlag && e.changedTouches[0].clientY-startY > 0)
      {
        direction = 1;
        directionFlag = false;
      }
      // console.log(Math.log(e.changedTouches[0].clientY-startY))
      if(scrollTop !== 0){ return }
      if(direction) {
        e.preventDefault();
      }
      if(e.changedTouches[0].clientY-startY > 250) { return }
      refreshStyle.top = Math.pow(e.changedTouches[0].clientY-startY , 1/3)*22 - 70 + 'px'
      refreshStyle.opacity = (e.changedTouches[0].clientY-startY)/150
      refreshStyle.transform = 'rotate(' + (e.changedTouches[0].clientY-startY)/150 * 180 + 'deg)'
    }
    return{
      store,
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