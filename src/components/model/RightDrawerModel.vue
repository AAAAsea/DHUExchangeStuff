<template>
  <div class="drawer-left">
    <el-drawer
      v-model="store.state.model.rightDrawerModelFlag"
      title=""
      direction="rtl"
      custom-class="drawer"
      :with-header="false"
    >
      <RightSideBar/>
    </el-drawer>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import RightSideBar from '../RightSideBar.vue'
const  store = useStore()

</script>
<style lang="scss" scoped>
:deep() .drawer{
  background: var(--main-bg);
  width: 250px !important;
}
.drawer{
  .user{
    img{
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 50%;
    }
    margin-bottom: 100px;
    text-align: center;
    div{
      margin-top: 10px;
      
    }
  }
}
</style>