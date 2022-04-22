<template>
  <div class="drawer-left">
  <el-drawer
    v-model="store.state.model.leftDrawerModelFlag"
    title=""
    direction="ltr"
    :before-close="handleClose"
    custom-class="drawer"
  >
    <ul @click="store.state.model.leftDrawerModelFlag = false">
      <router-link to="/" >
        <li >
          <span class="emoji">🎈</span>
          <span class="title">DHU-广场</span>
        </li>
      </router-link>
      <router-link to="/mine">
        <li>
          <span class="emoji">😀</span>
          <span class="title">DHU-我啊</span>
        </li>
      </router-link>
    </ul>
  </el-drawer>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
let  store = useStore()
</script>

<style lang="scss" scoped>
.drawer-left{
    ul{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      li{
        height: 100%;
        font-size: .9em;
        display: flex;
        justify-content: center;
        align-items: center;
        .emoji{
          width: 2em;
        }
      }
    }
    a{
      height: 2.5em;
      width: 100%;
      border-radius: 4px;
      margin: 2px 0;
      background: var(--secondary-bg);
    }
    .router-link-active{
      background: var(--primary-color);
    }
  }
/deep/ .drawer{
  background: var(--main-bg);
  width: 250px !important;
}

</style>