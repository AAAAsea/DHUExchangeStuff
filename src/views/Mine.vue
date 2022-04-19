<template>

  <el-row class="container">
    <el-col :span="20"><div class="grid-content left" ><router-view></router-view></div></el-col>
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
import { onBeforeUnmount } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mine',
  setup(props, context){
    onBeforeUnmount(()=>{
      store.state.data.routePath = ''
    })
    const store = useStore()
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
  background-color: rgb(255, 255, 255);
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.left{
  // height: 20px;
  display: flex;
  justify-content: center;
}
.right{
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>