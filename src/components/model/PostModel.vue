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
        <el-input v-model="form.name"  maxlength="280" show-word-limit autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 100 }" placeholder="内容"/>
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
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="ml-1 w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
      + New Tag
    </el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import type { ElInput } from 'element-plus'

const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
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
