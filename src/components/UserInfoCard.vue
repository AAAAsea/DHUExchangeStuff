<template>
  <div class="user-index">
    <div class="user-banner">
      <div class="mask"/>
      <img src="http://ww2.sinaimg.cn/mw2000/68f96449jw1ergqx79rw4j20hs0hswh0.jpg" alt="">
    </div>
    <div class="user-info">
      <div class="user-head">
        <img :src="user.headerUrl" alt="">
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
        📑 {{user.description}}
      </div>
    </div>
  </div>
</template>

<script setup>

// import { computed, ref } from 'vue';
import { getUserInfo } from '@/api/user'
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';

const route = useRoute()
const user = reactive ({
  ZcreateTime: '"2022-04-23T11:25:45.000+0000"',
  description: '',
  headerUrl: '""',
  id: '',
  nickName: '',
  status: 0,
  type: 0,
  username: '',
  followeeCount: 0,
  followerCount: 0,
  hasFollowed: false
})
console.log( route.params.id)
getUserInfo(route.params.id)
.then(res=>{
  console.log(res)
  user.headerUrl = res.data.user.headerUrl
  user.nickName = res.data.user.nickName
  user.followeeCount = res.data.followeeCounr
  user.followerCount = res.data.followerCount
  user.description = res.data.user.description
})

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