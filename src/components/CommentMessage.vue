<template>
  <el-collapse-transition>
  <div class="container" v-show="notice.length > 0">
    <div class="like-container"
    v-for="item in notice"
    :key="item.notice.id"
    @click="toPost(item.postId)"
    >
      <img :src="item.user.headerUrl + '?width=100'" @click.stop="toUser(item.user.id)" alt="">
      <div class="content">
        <div class="top">
          <span class="from" @click.stop="toUser(item.user.id)">{{item.user.nickName ?? item.user.username}}</span>
          <div class="time">
            {{timeFormat(new Date(item.notice.createTime))}}
          </div>
        </div>
        <span>
          <span 
          @click.stop="router.push({path: '/user/' + item.comment.targetId})"
          style="color: var(--primary-color); cursor: pointer" v-if="item.entityType === 2">@{{store.state.data.user.nickName}}</span>
          {{item.comment?.content}}
        </span>
      </div>
    </div>
  </div>
  </el-collapse-transition>
  <div class="footer" @click="initCommentNotice" v-if="haveMore">加载更多</div>
</template>

<script setup>
import { getCommentNotice } from '@/api/user'
const { reactive, ref }=require("@vue/reactivity")
const notice = reactive([]);
import { timeFormat } from '@/utils/tools'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter();
const toPost = postId=>{
  router.push('/home/' + postId)
}
const toUser = userId=>{
  router.push('/user/' + userId)
}

const haveMore = ref(true);
const initCommentNotice = ()=>{
  getCommentNotice(notice.length)
  .then(res=>{
    // console.log(res.data)
    if(res.data.notice.length < 10)
      haveMore.value = false;
    notice.push(...res.data.notice)
  })
}

initCommentNotice();
</script>

<style lang="scss" scoped>
.like-container{
  background: var(--post-card-bg);
  padding-left: 10px;
  height: 80px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-top: 5px;
  img{
    border-radius: 50%;
    height: 40px;
    width: 40px;
    object-fit: cover;
    margin-right: 10px;
    cursor: pointer;

  }
  .content{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 80%;
    .top{
      display: flex;
      align-items: center;
      .from{
        color: var(--primary-color);
        cursor: pointer;
      }
      .time{
        font-size: .8em;
        color: var(--main-text);
        margin-left: 10px;
      }
    }
  }
}
.footer{
  margin: 0 auto;
  width: fit-content;
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .like-container{
    border-radius: 0;
  }
}
</style>