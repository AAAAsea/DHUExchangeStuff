<template>
  <div class="user-index" v-if="show" >
    <div class="user-banner">
      <div class="mask"/>
      <img :src="user.backgroundUrl ? (user.backgroundUrl.replace('/header','/image')  + '?width=800') : bgDefaultImg">
    </div>
    <div class="user-info">
      <div class="user-head">
        <img :src="user?.headerUrl  ?  (user?.headerUrl.replace('/header','/image')  + '?width=200') : avatarDefaultImg" alt="">
        <div class="info">
          <div class="title">{{user.nickName}}</div>
          <div class="follow">
            <div class="followee">
              <router-link :to="'/user/follow/' + user.id + '?relate=fans'">
                <span class="label">粉丝</span>
                <span>{{user.followerCount}}</span>
              </router-link>
            </div>
            <div class="follower">
              <router-link :to="'/user/follow/' + user.id">
                <span class="label">关注</span>
                <span>{{user.followeeCount}}</span>
              </router-link>
            </div>
          </div>
        </div>
        <el-button 
        :color="user.hasFollowed ? '#999' : '#ffc300'" 
        round 
        v-if="user.id !== store.state.data.user?.id"
        @click="changeFollow"
        :disabled="!canChangeFollow"
        :style="{color: user.hasFollowed ? 'var(--main-text)' : '', fontWeight: 'bold'}"
        >{{ user.hasFollowed ? '已关注' : '关注'}}
        </el-button>
      </div>
      <div class="user-description">
        📑 {{user.description || '这个人没有留下任何介绍...'}}
      </div>
    </div>
  </div>
</template>

<script setup>
import avatarDefaultImg from '@/assets/img/unlogin.png' 
import bgDefaultImg from '@/assets/img/bg.jpg'
import { getUserInfo, follow, unfollow } from '@/api/user'
import { isAccountLoggedIn } from '@/utils/auth'
import { reactive, ref } from '@vue/reactivity';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { defineEmits } from 'vue';

const emit = defineEmits(['on-update'])
const route = useRoute()
const store = useStore()
const user = reactive ({
  createTime: '"2022-04-23T11:25:45.000+0000"',
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
const canChangeFollow = ref(true)
function initUserInfo(id = route.params.id){
  getUserInfo(id)
  .then(res=>{  
    user.headerUrl = res.data.user.headerUrl
    user.nickName = res.data.user.nickName
    user.followeeCount = res.data.followeeCount
    user.followerCount = res.data.followerCount
    user.description = res.data.user.description
    user.backgroundUrl = res.data.user.backgroundUrl
    user.hasFollowed = res.data.hasFollowed;
    user.id = res.data.user.id
    show.value = true;
    emit('on-update', user.nickName)
    document.title = '🎮 ' + user.nickName + "的个人主页"
  })
  .catch((err)=>{
    console.log(err)
    store.commit('showToast',{
      type: "error",
      message: "加载失败"
    })  
  })
}
initUserInfo()

function changeFollow(){
  if(!isAccountLoggedIn()){
    store.state.model.loginModelFlag = true;
    return;
  }
  canChangeFollow.value = false;
  let action = user.hasFollowed ? unfollow : follow;
  action(user.id)
  .then(res=>{
    if(res.code === 20000)
    {
      store.commit('showToast',{
        type: "success",
        message: user.hasFollowed ? "已取关" : "已关注"
      })
      initUserInfo()
    }else{
      store.commit('showToast',{
        type: 'error',
        message: res.message
      })
    }
  })
  .catch((err)=>{
    console.log(err)
    store.commit('showToast',{
      type: 'error',
      message: '加载异常'
    })
  })
  .finally(()=>{
    canChangeFollow.value = true;
  })
}
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
    width: 100%;
    .user-banner{
      position: relative;
      height: 280px;
      width: 100%;
      .mask{
        width: 100%;
        height: 280px;
        opacity: 0.4;
        background-image: repeating-linear-gradient(rgba(0, 0, 0, 0.8) , rgba(202, 202, 202, 0)  30%, rgba(253, 253, 253, 0) 70%, rgba(0, 0, 0, 0.8) );
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
          object-fit: cover;
          border-radius: 50%;
          border: 5px solid var(--main-bg);
          box-shadow: 0 0 0 3px var(--main-bg) inset; // 去除border和content中间的空隙
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
    @media screen and(max-width: 768px) {
      .user-banner{
        height: 200px;
        .mask{
          height: 200px;
        }
        img{
          height: 200px;
        }
      }
    }

  }
</style>