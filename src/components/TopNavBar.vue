<template>
  <div class="top-nav-bar">
    <div class="user">
        <router-link to="mine">
          <img src="https://img1.baidu.com/it/u=3435958490,2041388940&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=686" alt="头像">
        </router-link>
    </div>
    <div class="titles">
      {{route.name}}
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  name:"TopNavBar",
  setup(){
    const route = useRoute()
    return {
        route
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .top-nav-bar{
    background-size: cover;
    height: 40vh;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-around;
    .user{
      margin-top: 30px;
      img{
        transition: 0.5s ease;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 30px;
        &:hover{
          transform: rotate(360deg);
        }
      }
      
    }
    .titles{
      font-size: 40px;
      font-weight: bolder;
    }
  }
  @media screen and (max-width: 1200px){
    .top-nav-bar{
      height: 30vh;
    }
  } 
</style>