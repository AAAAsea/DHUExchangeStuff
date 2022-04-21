<template>

  <el-row class="container" justify="space-around">
    <el-col :span="18" ><div class="grid-content left" ><router-view></router-view></div></el-col>
    <el-col :span="4">
      <div class="grid-content right" >
        <router-link to="/mine/post">
          看post
        </router-link>
        <router-link to="/mine/info">
          看info
        </router-link>
      </div></el-col>
  </el-row>

</template>

<script>
import { onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mine',
  setup(props, context){
    const store = useStore()
    onBeforeUnmount(()=>{
      store.state.data.routePath = ''
    })
    // 获取用户信息
    store.dispatch('fetchUserProfile')
    .then(res=>{
      console.log(res)
    })
    store.state.data.routePath = 'mine'
    console.log(props)
    context.emit("toMine")
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 70vw;
  margin: 0 auto;

}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.left{
  // height: 20px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
.right{
  color: white;
  border-radius: 10px;
  padding: 20px;

  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>