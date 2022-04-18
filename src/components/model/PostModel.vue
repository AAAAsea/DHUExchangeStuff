<template>

  <!-- Form -->
  <el-dialog v-model="store.state.model.postModelFlag" title="发贴">
    <el-form :model="form">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input v-model="form.name" maxlength="10" show-word-limit autocomplete="off"  placeholder="输入你的标题"/>
      </el-form-item>
      <!-- <el-form-item label="楼号" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="选择你的楼号">
          <el-option label="1" value="shanghai" />
          <el-option label="2" value="beijing" />
        </el-select>
      </el-form-item> -->
      <el-form-item label="内容" :label-width="formLabelWidth">
        <el-input v-model="form.textarea"  maxlength="280" show-word-limit autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 100 }" placeholder="内容"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.state.model.postModelFlag = false">取消</el-button>
        <el-button type="primary" @click="store.state.model.postModelFlag = false"
          >发布</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  textarea: ''
})
</script>

<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
