<template>
  <div class="progress"  v-show="store.state.model.progressModelFlag">
    <span>上传中...</span>
    <el-progress 
    :percentage="store.state.model.progressPercentage" 
    :format="format"
    color="var(--primary-color)" />
  </div>
</template>

<script setup>
const { useStore }=require("vuex");
const store = useStore()
const format = (percentage) => (percentage === 100 ? 'OK' : `${percentage}%`)
</script>

<style scoped>
.progress{
  transition: .3s;
  position: fixed;
  top: 60px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  left: 50%;
  transform: translateX(-50%);
  padding-left: 20px;
  border-radius: 4px;
  opacity: 0.9;
  backdrop-filter: blur(10px);
  background: var(--main-bg);
  backdrop-filter: saturate(100%) blur(40px);
  height: 45px;
}
.el-progress--line {
  width: 200px;
  margin: 0;
}
</style>