<template>
  <div class="acount-info">
    <ul>
      <li>
        <span > 头像</span>
        <img :src="store.state.data?.user?.headerUrl" alt="">
      </li>
      <li>
        <span > 昵称</span>
          
      </li>
    </ul>

  </div>
</template>

<script setup>
import { useStore } from "vuex";
const store = useStore()
</script>

<style>

</style>