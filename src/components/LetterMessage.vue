<template>
  <transition name="el-zoom-in-top">
  <div class="container" v-show="notice.length > 0">
    <div class="like-container"
    v-for="item in notice"
    :key="item.conversation.id"
    @click="toChat(item.target.id)"
    >
      <img :src="item.target.headerUrl" @click.stop="toUser(item.target.id)" alt="">
      <div class="content">
        <div class="top">
          <span class="from" @click.stop="toUser(item.target.id)">{{item.target.nickName ?? item.target.username}}</span>
          <div class="time">
            {{timeFormat(new Date(item.conversation.createTime))}}
          </div>
        </div>
        <span>{{item?.conversation?.content}}</span>
      </div>
      <span class="bubble" :style="{display:!item.unreadCount ? 'none' : 'block'}">{{item.unreadCount}}</span>

    </div>
  </div>
  </transition>
  <div class="footer" @click="initLetterNotice" v-if="haveMore">加载更多</div>
</template>

<script setup>
import { getLetterNotice } from '@/api/user'
const { reactive, ref }=require("@vue/reactivity")
const notice = reactive([]);
import { timeFormat } from '@/utils/tools'
import { useRouter } from 'vue-router';

const router = useRouter();
const toChat = id=>{
  router.push('/user/chat/' + id)
}
const toUser = userId=>{
  router.push('/user/' + userId)
}

const haveMore = ref(true);
const initLetterNotice = ()=>{
  getLetterNotice(notice.length)
  .then(res=>{
    // console.log(res.data)
    if(!res.data.conversations.length)
      haveMore.value = false;
    notice.push(...res.data.conversations)
  })
}

initLetterNotice();
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
    width: 80%;
    overflow:hidden;//超出一行文字自动隐藏 
    text-overflow:ellipsis;//文字隐藏后添加省略号
    white-space:nowrap;//强制不换行
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
  .bubble{
    float: right;
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