<template>
  <div class="top-nav-bar">
    <div class="user">
      <router-link to="/mine">
        <img src="https://img1.baidu.com/it/u=3435958490,2041388940&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=686" alt="">
      </router-link>
    </div>
    <div class="titles">
      {{route.name}}
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name:"TopNavBar",
  setup(){
    const route = useRoute()
    const data = reactive({
      activeIndex: ref('1'),
      activeIndex2: ref('1')
    })
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      ...toRefs(data),
      handleSelect,
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
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 30px;
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