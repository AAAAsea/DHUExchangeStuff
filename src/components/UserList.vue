<template>
  <div class="userlist-container">
    <div 
      class="user-card"
      v-for="item in userList"
      :key="item.user.id"
    >
      <div class="user-cotainer">
        <router-link :to='"/user/"+item.user.id'>
          <img :src="item.user.headerUrl">
        </router-link>
        <div class="info">
          <router-link :to='"/user/"+item.user.id'>
            <h4>{{item.user.nickName}}</h4>
          </router-link>
          <div class="desc">{{item.user.description || '这个人什么也没写~'}}</div>
        </div>
      </div>
      <el-button 
        class="follow-btn"
        :color="item.hasFollowed ? '#999' : '#ffc300'" 
        round 
        @click="changeFollow(item)"
        :disabled="false"
        :style="{color: item.hasFollowed ? 'var(--main-text)' : '', fontWeight: 'bold'}"
        >{{ item.hasFollowed ? '已关注' : '关注'}}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useStore } from 'vuex';
import { isAccountLoggedIn } from '@/utils/auth'
import {  follow, unfollow } from '@/api/user'


const canChangeFollow = ref(true)

defineProps(['userList'])
const store = useStore()

function changeFollow(user){
  if(!isAccountLoggedIn()){
    store.state.model.loginModelFlag = true;
    return;
  }
  canChangeFollow.value = false;
  let action = user.hasFollowed ? unfollow : follow;
  action(user.user.id)
  .then(res=>{
    if(res.code === 20000)
    {
      store.commit('showToast',{
        type: "success",
        message: user.hasFollowed ? "已取关" : "已关注"
      })
      user.hasFollowed = !user.hasFollowed;
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
</script>

<style lang="scss" scoped>
.userlist-container{
  width: 100%; 
  background: var(--post-card-bg);
  .user-card{
    justify-content: space-around;
    position: relative;
    // border: 1px solid red;
    height: 100px;
    width: 100%;
    align-items: center;
    display: flex;
    .user-cotainer{
      width: 70%;
      display: flex;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .info{
        margin-left: 10px;
        // border: 1px solid red;
        width: 90%;
        line-height: 30px;
        box-sizing: border-box;
        .desc{
          // border: 1px solid green;
          width: 85%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }  
      }
    }
    
    .follow-btn{
      // width: 100px;
    }
  }
  & .user-card + .user-card{
    border-top: 1px solid var(--secondary-bg);
  }
  @media screen and(max-width: 768px) {
    .user-card{
      // padding: 0 30px;
      box-sizing: border-box;
    }
  }
}

</style>