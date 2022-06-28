<template>
  <div class="home" >
    <el-row  justify="center">
      <!-- 左侧 -->
      <el-col  :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
        <LeftSideBar/>
      </el-col>
      <!-- 主体 -->
      <el-col  :xs="24" :sm="15" :md="15" :lg="15" :xl="15">   
        <div class="message-bar">
          <router-link replace to="/message/like"><span>点赞</span><span class="bubble" :style="
          {display:!unreadNotice.like? 'none' : 'block'}">{{unreadNotice.like}}</span></router-link>
          <router-link replace to="/message/comment"><span>评论</span><span class="bubble" :style="{display:!unreadNotice.comment ? 'none' : 'block'}">{{unreadNotice.comment}}</span></router-link>
          <router-link replace to="/message/follow"><span>关注</span><span class="bubble" :style="{display:!unreadNotice.follow ? 'none' : 'block'}">{{unreadNotice.follow}}</span></router-link>
          <router-link replace to="/message/letter"><span>私信</span><span class="bubble" :style="{display:!unreadNotice.letter ? 'none' : 'block'}">{{unreadNotice.letter}}</span></router-link> 
        </div>  
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </el-col>
      <!-- 右侧 -->
      <el-col  :xs="0" :sm="5" :md="5" :lg="5" :xl="5">
        <RightSideBar :tag="route.params.id"/>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import LeftSideBar from '@/components/LeftSideBar.vue'
import RightSideBar from '@/components/RightSideBar.vue'
import { useStore } from 'vuex'
import { getNotice } from '@/api/user'
import { useRoute } from 'vue-router'
import { reactive } from '@vue/reactivity'



export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    LeftSideBar,
    RightSideBar,
  },
  setup(){
    const store = useStore()
    const route = useRoute()
    const unreadNotice = reactive({
      comment: 0,
      follow: 0,
      like: 0,
      letter: 0
    })
    getNotice()
    .then(res=>{
      res = res.data;
      // console.log(res)
      unreadNotice.comment = res.commentNotice?.unread;
      unreadNotice.follow = res.followNotice?.unread;
      unreadNotice.like = res.likeNotice?.unread;
      unreadNotice.letter = res?.letterUnreadCount;  
      // console.log(unreadNotice)
    })
    
    return{
      store,
      route,
      unreadNotice
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}

.edit{
  position: fixed;
  right: 30px;
  bottom: 40px;
  font-size: 1.5rem;
  transform: scale(1.2);
}

.message-bar{
  display: flex;
  background: var(--secondary-bg);
  height: 40px;
  padding-left: 10px;
  border-radius: 5px;
  align-items: center;
  a{
    height: 100%;
    display: flex;
    align-items: center;
    padding:0 10px;
  }
  .router-link-exact-active{
    color: var(--primary-color);
    border-bottom: 2px solid var(--primary-color);
  }
  .bubble{
    width: 15px;
    height: 15px;
    background: var(--primary-color);
    color: var(--main-bg);
    text-align: center;
    line-height: 15px;
    border-radius: 50%;
    font-size: 13px;
    margin-left: 3px;
  }
}
@media screen and (max-width: 1200px) {
  .home{
    width: 100%;
    margin: 0 auto;
  }
}
@media screen and (max-width: 768px) {
  .message-bar{
    border-radius: 0;
  }
}
</style>