<template>
  <div class="user-index" v-show="show">
    <div class="user-banner">
      <div class="mask"/>
      <img :src="user.backgroundUrl || 'http://ww2.sinaimg.cn/mw2000/68f96449jw1ergqx79rw4j20hs0hswh0.jpg'" alt="">
    </div>
    <div class="user-info">
      <div class="user-head">
        <img :src="user.headerUrl || avatarDefaultImg" alt="">
        <div class="info">
          <div class="title">{{user.nickName}}</div>
          <div class="follow">
            <div class="followee">
              <span class="label">粉丝</span>
              <span>{{user.followeeCount}}</span>
            </div>
            <div class="follower">
              <span class="label">关注</span>
              <span>{{user.followerCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="user-description">
        📑 {{user.description || '这个人没有留下任何介绍...'}}
      </div>
    </div>
  </div>
</template>

<script setup>

import avatarDefaultImg from '@/assets/img/unlogin.png' 
import { getUserInfo } from '@/api/user'
import { reactive, ref } from '@vue/reactivity';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { defineEmits } from 'vue';

const emit = defineEmits(['on-update'])
const route = useRoute()
const store = useStore()
const user = reactive ({
  ZcreateTime: '"2022-04-23T11:25:45.000+0000"',
  description: '',
  headerUrl: '',
  id: '',
  nickName: '',
  status: 0,
  type: 0,
  username: '',
  followeeCount: 0,
  followerCount: 0,
  hasFollowed: false,
  backgroundUrl: ''
})
const show = ref(false)
async function initUserInfo(id = route.params.id){
  try{
    let res = await getUserInfo(id)
    user.headerUrl = res.data.user.headerUrl
    user.nickName = res.data.user.nickName
    user.followeeCount = res.data.followeeCount
    user.followerCount = res.data.followerCount
    user.description = res.data.user.description
    user.backgroundUrl = res.data.user.backgroundUrl
    show.value = true;
    emit('on-update', user.nickName)
    document.title = '🎮' + user.nickName + "的个人主页"
  }catch(err){
    console.log(err)
    store.commit('showToast',{
      type: "error",
      message: "加载失败"
    })  
  }

}
initUserInfo()

// 监听路由变化
onBeforeRouteUpdate( (to, from) => {
  show.value = false;
  if(to.params.id !== from.params.id)
  initUserInfo(to.params.id)
});
</script>

<style lang="scss" scoped>
  .user-index{
    background: var(--post-card-bg);
    border-radius: 5px;
    margin-bottom: 8px;
    .user-banner{
      position: relative;
      width: 100%;
      .mask{
        width: 100%;
        height: 280px;
        @media screen and(max-width: 768px) {
          height: 200px;
        }
        opacity: 0.3;
        background-image: repeating-linear-gradient(rgb(72, 72, 72) , rgb(202, 202, 202)  20%, rgb(216, 216, 216) 80%, rgb(92, 92, 92) );
        background-size:cover;
        position: absolute;
        top: 0;
        left: 0;
      }
      img{
        border-radius: 5px;
        width: 100%;
        height: 280px;
        object-fit: cover;
      }
      @media screen and(max-width: 768px) {
        height: 200px;
      }
    }
    .user-info{
      margin-left: 20px;
      position: relative;
      top: -45px;
      .user-head{
        // border: 1px solid red;
        display: flex;
        align-items: flex-end;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 5px solid var(--main-bg);
        }
        .info{
          margin-left: 20px;
          // border: 1px solid red;
          .title{
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          .follow{
            display: flex;
            div{
              margin-right: 20px;
            }
            span.label{
              margin-right: 10px;
              color: var(--secondary-text);
            }
          }
        }
      }
      .user-description{
        margin: 20px 0 0 20px;
        color: var(--secondary-text);
      }
    }
  }
</style>