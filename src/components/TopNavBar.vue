<template>
  <div class="container">
    <div class="user">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="titles">
      首页
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'

export default {
  name:"TopNavBar",
  setup(){
    const data = reactive({
      activeIndex: ref('1'),
      activeIndex2: ref('1')
    })
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      ...toRefs(data),
      handleSelect
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    background-size: cover;
    width: 100vw;
    height: 40vh;
    border: 1px solid red;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .user{
      img{
        width: 60px;
        height: 60px;
      }
    }
    .titles{
      font-size: 40px;
    }
  }
</style>