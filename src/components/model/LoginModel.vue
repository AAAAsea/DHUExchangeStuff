<template>

  <!-- Form -->
  <el-dialog v-model="store.state.model.loginModelFlag"   title="登录" custom-class="dialog" :width="dialogWidth" center>
    <el-form 
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="rule-form"
    >
      <el-form-item label="账号" :label-width="auto" prop="account" required>
        <el-input v-model="ruleForm.account" autocomplete="off"  placeholder="account"/>
      </el-form-item>
      <el-form-item label="密码" :label-width="auto" prop="password" required>
        <el-input v-model="ruleForm.password"  autocomplete="off"  placeholder="password" show-password/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.state.model.loginModelFlag = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const ruleFormRef = ref('')
const ruleForm = reactive({
  account: '',
  password: ''
})
const dialogWidth = computed(()=>document.documentElement.clientWidth > 1000 ? '400px' : '90VW')

const rules = reactive({
  account: [
    { required: true, message: '账号不可为空', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不可为空', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
  store.state.model.loginModelFlag = false;
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
.rule-form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
