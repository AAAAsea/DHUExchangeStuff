<template>
  <div class="acount-info">
    <div id="avatar">
      <el-upload
        class="avatar-uploader"
        action="/api/users/header"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :disabled="!isEdit"
        name="file"
      >
        <img  :src="form.headerUrl.replace('/header','/image')  + '?width=150'" class="avatar" />
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
        <div v-if="!isEdit">{{form.nickName || '未设置'}}</div>
        <el-input v-else v-model="form.nickName" :readonly="!isEdit" class="input" autosize></el-input>
      </li>
      <li>
        <div class="label"> 介绍:</div>
        <div v-if="!isEdit">{{form.description || '这个人很懒，什么也没写...'}}</div>
        <el-input v-else v-model="form.description" :readonly="!isEdit" type="textarea" show-word-limit :maxlength="300" :autosize="{ minRows: 3, maxRows: 8 }" placeholder="在这里写下你的介绍"></el-input>
      </li>
      <li>
        <div class="label"> 背景:</div>
        <el-upload
          class="bg-uploader"
          drag
          action="/api/users/background"
          :show-file-list="false"
          :on-success="handleBgSuccess"
          :before-upload="beforeAvatarUpload"
          :disabled="!isEdit"
          name="file"
        >
          <img v-if="form.backgroundUrl"  :src="form.backgroundUrl.replace('/header','/image')   + '?width=1500'" class="bg" />
          <el-icon v-if="isEdit" class="el-icon--upload"><upload-filled /></el-icon>
        </el-upload>
      </li>
    </ul>
    <el-button class="savebtn" @click="saveInfo">{{isEdit ? '保存' : '编辑'}}</el-button>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import {  Plus, UploadFilled  } from '@element-plus/icons-vue'
import { changeNickName, changeDescription } from '@/api/user'
const store = useStore()
const user = store.state.data.user
const form = reactive({
  nickName: user.nickName,
  description: user.description,
  headerUrl: user.headerUrl,
  backgroundUrl: user.backgroundUrl
})
const isEdit = ref(false)

const handleAvatarSuccess = (response,uploadFile) => {
  form.headerUrl = URL.createObjectURL(uploadFile.raw)
  store.dispatch('fetchMyProfile')
}

const handleBgSuccess = (response,uploadFile) => {
  form.backgroundUrl = URL.createObjectURL(uploadFile.raw)
  store.dispatch('fetchMyProfile')
}

const beforeAvatarUpload= (rawFile) => {
  const types = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg']
  if (!types.includes(rawFile.type)) {
    alert('必须JP(e)G/PNG/GIF格式')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    alert('图片大小不能大于2MB!')
    return false
  }
  return true
}

function saveInfo(){
  if(isEdit.value)
  {
    let reuqests = []
    if(form.nickName !== user.nickName) reuqests.push(changeNickName(form.nickName))
    if(form.description !== user.description) reuqests.push(changeDescription(form.description))
    Promise.all(reuqests)
    .then( results => {
      console.log(results)
      let success = true;
      results.forEach(res=>{
        if(res.code !== 20000)
        {
          success = false;
          store.commit('showToast',{
            type: 'warning',
            message: res.message
          })
        }
      })
      if(success)
      {
        store.commit('showToast',{
          type: 'success',
          message: '修改成功~'
        })
        store.dispatch('fetchMyProfile')
        isEdit.value = false;
      }      
    })
    .catch(err=>{
      console.log(err)
      store.commit('showToast',{
          type: 'error',
          message: '修改失败~'
        })
    })
  }else{
    isEdit.value = true
  }
}
</script>

<style lang="scss" scoped>
.acount-info{
  background: var(--post-card-bg);
  border-radius: 5px;
  padding: 60px 30px;
  ul{
    list-style: none;
  }
  li{
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    .label{
      line-height: 30px;
      height: 30px;
      opacity: 0.8;
      width: 100px;
      box-sizing: border-box;
      letter-spacing: 1px;
    }
    .el-input__count{
      background: transparent;
    }
    :deep() .el-input_inner {
      box-shadow: none;
      background-color: var(--secondary-bg) !important;
      color: var(--main-text);
      &:focus{
        box-shadow: 0 0 0 1px var(--primary-color);
      }
    }

    .el-input {
      width: 100%;
    }
    .el-textarea{
      width: 100%;
    }
  }
}

#avatar {
  position: relative;
  text-align: center;
  padding-bottom: 30px;
  img{
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 2px solid var(--post-card-bg);
  } 
}
.savebtn{
  display: block;
  margin: 0 auto;
  background: var(--primary-color);
  color: var(--main-bg);
  border: none;
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
  border-color: var(--secondary-bg);
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

.bg-uploader{
  width: 300px;
  height: 180px;
  border: 1px solid var(--secondary-text);
  border-radius: 5px;
  :deep() .el-upload-dragger{
    position: relative;
    background: transparent;
    border: 1px solid transparent;
    width: 300px;
    height: 180px;
    img{
      width: 300px;
      height: 180px;
      object-fit: cover;
    }
    .el-icon--upload{
      width: 300px;
      height: 180px;
      position: absolute;
      transform: translateX(-50%);
      margin: 0;
      top: 0;
      background: rgba($color: #000000, $alpha: 0.5);
    }
  }
}
</style>