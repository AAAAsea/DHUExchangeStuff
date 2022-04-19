<template>

  <!-- Form -->
  <el-dialog v-model="store.state.model.loginModelFlag"   title="登录" custom-class="dialog" :width="dialogWidth">
    <!-- 登录 -->
    <el-form 
    v-if="type === 'login'"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="rule-form"
    label-position="top"
    >
      <el-form-item :label="$t('login.account')" label-width="auto" prop="account" required>
        <el-input v-model="ruleForm.account" autocomplete="off"  placeholder="account"/>
      </el-form-item>
      <el-form-item :label="$t('login.password')" label-width="auto" prop="password" required>
        <el-input v-model="ruleForm.password"  autocomplete="off"  placeholder="password" show-password/>
      </el-form-item>
    </el-form>
    <!-- 注册 -->
    <el-form 
      v-else
      :model="registRuleForm"
      :rules="registRules"
      class="rule-form"
      label-position="top"

    >
      <el-form-item :label="$t('login.account')" label-width="auto" prop="mail" required>
        <el-input v-model="registRuleForm.mail" autocomplete="off"  placeholder="account"/>
      </el-form-item>
      <el-form-item :label="$t('login.code')" label-width="auto" prop="code" required >
        <div class="code">
          <el-input v-model="registRuleForm.code" autocomplete="off"  placeholder="account" :style="{width:   '50%'}" />
          <el-button type="primary" @click="handleCodeClick">发送</el-button>
        </div>
      </el-form-item>
      <el-form-item :label="$t('login.password')" label-width="auto" prop="password" required>
        <el-input v-model="registRuleForm.password"  autocomplete="off"  placeholder="password" show-password/>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <span class="dialog-footer">
        <el-button type="text" @click="type = type === 'login' ? 'regist' : 'login'">{{type === 'login' ? '前往注册' : '已有帐号，点击登录'}}</el-button>
        <el-button @click="store.state.model.loginModelFlag = false">取消</el-button>
        <el-button type="primary" @click="submit"
          >{{type === 'login' ? '登录' : '注册'}}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

const type = ref('login');
const store = useStore()

// 登录
const ruleForm = reactive({
  account: '',
  password: ''
})
const dialogWidth = computed(()=>document.documentElement.clientWidth > 1000 ? '400px' : '90VW')

const rules = reactive({
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 6, max: 10, message: 'Length should be 6 to 10', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 8, max: 15, message: 'Length should be 8 to 15', trigger: 'blur' },
  ],
})



// 注册
const registRuleForm = reactive({
  mail: '',
  code: '',
  password: ''
})

const registRules = reactive({
  mail: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 6, max: 10, message: 'Length should be 6 to 10', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 8, max: 15, message: 'Length should be 8 to 15', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 8, max: 15, message: 'Length should be 8 to 15', trigger: 'blur' },
  ],
})

// 提交
import { getMailCode, regist } from '@/api/auth'
// 验证码
function handleCodeClick(){
  getMailCode(registRuleForm.mail)
  .then((res)=>{
    console.log(res)
  })
}
// 提交
function submit(){
  if(type.value === 'regist'){
    regist(registRuleForm.mail, registRuleForm.password, registRuleForm.code)
    .then(res=>{
      console.log("注册返回信息：",res)
    })
  }
}

// 前台校验
// const submitForm = async (formEl) => {
//   if (!formEl) return
//   await formEl.validate((valid, fields) => {
//     if (valid) {
//       console.log('submit!')
//     } else {
//       console.log('error submit!', fields)
//     }
//   })
//   store.state.model.loginModelFlag = false;
// }

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
.rule-form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.code{
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>
