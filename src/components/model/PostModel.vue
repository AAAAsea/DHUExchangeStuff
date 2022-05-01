<template>

  <!-- Form -->
  <el-dialog v-model="store.state.model.postModelFlag" title="发贴" custom-class="dialog" :width="store.state.model.modelWidth" :fullscreen="store.state.model.modelWidth === '95vw'">
    <el-form :model="form" :rules="rules" ref="ruleFormRef" @keydown.ctrl.enter="publish(ruleFormRef)">
      <el-form-item label="标题" label-width="auto" prop="title">
        <el-input v-model="form.title" maxlength="10" show-word-limit autocomplete="off"  placeholder="输入你的标题"/>
      </el-form-item>
      <el-form-item label="内容" prop="content"  >
        <el-input v-model="form.content"  maxlength="5200" show-word-limit autocomplete="off" type="textarea" :autosize="{ minRows: 2, maxRows: 20 }" placeholder="写点什么呢..."/>
      </el-form-item>
    </el-form>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      :style="{margin: '0  10px 10px 0'}"
      closable  
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      maxlength="10"
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      :style="{width: '80px',margin: '0 10px 10px 0'}"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else :style="{width: '80px',margin: '0  10px 0 0'}" size="small" @click="showInput">
      +增加标签
    </el-button>
    <div class="upload-pic">
      <el-upload
        class="uploader"
        accept="image/*"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        :on-exceed="exceedTips"
        :limit="9"
        multiple
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible" :width="store.state.model.modelWidth">
        <img :src="dialogImageUrl" alt="Preview Image"  />
      </el-dialog>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.state.model.postModelFlag = false">取消</el-button>
        <el-button 
        type="primary" 
        @click="publish(ruleFormRef)"  
        style="backgroundColor:var(--primary-color); color: var(--main-bg); border: none;"
        :disabled="!canPublish"
        >
          发布
        </el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// form
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { addPost } from '../../api/post'
import { Plus } from '@element-plus/icons-vue'
const store = useStore()
const route = useRoute()
const canPublish = ref(true)
const form = reactive({
  title: '',
  content: ''
})
const ruleFormRef = ref('')
const rules = reactive({
  title: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { validator: validateEmpty, trigger: 'blur'}
  ],
  content: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { validator: validateEmpty, trigger: 'blur'}
  ],
})
function validateEmpty(rule, value, callback){
  if(value.trim() === '')
  {
    callback(new Error('不能为空'))
  }else{
    callback()
  }
}
function publish(formEl){
  formEl.validate((valid) => {
    if (valid) {
      canPublish.value = false; // 防止多次发布
      // 图片
      let formData = new FormData()
      fileList.value.forEach( e => {
        formData.append('mfs', e.raw)
        // console.log(mfs)
      })
      formData.append('title', form.title)
      formData.append('content', form.content)
      formData.append('tags', [...dynamicTags.value] )
      

      addPost(formData)
      .then(res=>{
        store.state.model.postModelFlag = false
        canPublish.value = true;
        if(res.code === 20000)
        {
          store.commit('showToast',{
            type: 'success',
            message: '发布成功'
          })
          form.title = '';
          form.content = '';
          dynamicTags.value.clear();
          fileList.value.splice(0);
          store.dispatch('fetchNewPostList', route.path === "/user/"+store.state.data.user.id ? store.state.data.user.id : 0)
        }
        else{
          if(res.code === 52008 || res.code === 52007)
          {
            store.commit('resetUserInfo')
          }
          store.commit('showToast',{
              type: 'error',
              message: res.message
            })
        }
      })
      .catch((res)=>{
        console.log(res)
        // store.commit('resetUserInfo')
        store.commit('showToast',{
            type: 'error',
            message: '服务器异常'
          })
      })
    }
  })
}

// tag
import { nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
const inputValue = ref('')
const dynamicTags = ref(new Set())
const inputVisible = ref(false)
const InputRef = ref('')
const handleClose = (tag) => {
  dynamicTags.value.delete(tag)
}
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
const handleInputConfirm = () => {
  if (inputValue.value.trim()) {
    if(dynamicTags.value.length > 4){
      store.commit('showToast',{
        type:"warning",
        title:"Waning",
        message:"最多添加五个标签"
      })
    }else{
      dynamicTags.value.add(inputValue.value)
    }
  }
  inputVisible.value = false
  inputValue.value = ''
}

// upload
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

const exceedTips= () => {
    store.commit('showToast',{
      type: "warning",
      message: "最多只能上传9张图片"
    })
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
.upload-pic{
  margin: 10px 0;
  display: flex;
  :deep().uploader{
    margin: 0 auto;
    text-align: center;
  }
  :deep().el-upload-list__item{
    width: 100px;
    height: 100px;
  }
  :deep().el-upload--picture-card{
    width: 100px;
    height: 100px;
  }
  :deep()img.el-upload-list__item-thumbnail{
    object-fit: cover !important;
  }
}
</style>
