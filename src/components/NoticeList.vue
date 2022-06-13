<template>
  <div class="notice-container">
    <span>点赞</span>
    <div class="content">内容</div>
    <div class="time">11：20</div>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';
// const props = defineProps(["noticeList"]);

</script>

<style lang="scss" scoped>
.notice-container{
  display: flex;
  align-items: center;
  height: 80px;
  background: var(--post-card-bg);
}
</style>