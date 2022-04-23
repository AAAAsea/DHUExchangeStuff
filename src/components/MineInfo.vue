<template>
  <div class="acount-info">
    <div id="avatar">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8081/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :disabled="!isEdit"
      >
        <img  :src="form.headerUrl" class="avatar" />
        <el-icon v-if="isEdit" class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <ul>
      <li>
        <div class="label"> 邮箱:</div>
        <div>{{user.username}}</div>
      </li>
      <li>
        <div class="label" > 昵称:</div>
        <div v-if="!isEdit">{{form.nickName ?? '未设置'}}</div>
        <el-input v-else v-model="form.nickName" :readonly="!isEdit" class="input" autosize></el-input>
      </li>
      <li>
        <div class="label"> 介绍:</div>
        <div v-if="!isEdit">{{form.introduce ?? '这个人很懒，什么也没写...'}}</div>
        <el-input v-else v-model="form.introduce" :readonly="!isEdit" type="textarea" show-word-limit :maxlength="300" :autosize="{ minRows: 3, maxRows: 8 }" placeholder="在这里写下你的介绍"></el-input>
      </li>
    </ul>
    <el-button class="savebtn" @click="isEdit = !isEdit">{{isEdit ? '保存' : '编辑'}}</el-button>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { Plus } from '@element-plus/icons-vue'

const store = useStore()
const user = store.state.data.user
const form = reactive({
  nickName: user.nickName,
  introduce: user.introduce,
  headerUrl: user.headerUrl
})
const isEdit = ref(false)

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  form.headerUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    alert('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    alert('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<style lang="scss" scoped>
.acount-info{
  background: var(--post-card-bg);
  border-radius: 3px;
  padding: 60px 30px;
  ul{
    list-style: none;
  }
  li{
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .label{
      line-height: 30px;
      height: 30px;
      opacity: 0.8;
      width: 100px;
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      letter-spacing: 1px;
    }
    .el-input {
      width: 200px;
    }
    .el-textarea{
      width: 70%;
    }
  }
}

#avatar {
  position: relative;
  text-align: center;
  padding-bottom: 30px;
  img{
    width: 72px;
    border-radius: 50%;
    border: 2px solid var(--post-card-bg);
  } 
}
.savebtn{
  display: block;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background: var(--main-bg);
  opacity: 0.5;
  border-radius: 50%;
  font-size: 28px;
  color: #8c939d;
  width: 72px;
  height: 72px;
  text-align: center;
}
</style>