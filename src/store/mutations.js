import {  ElMessage } from 'element-plus'

export default {
  updateData(state, { key, value }) {
    console.log(key, value)
    state.data[key] = value;
  },
  addData(state, {key, value}){
    state.data[key].push(...value)
  },
  showToast(state, payload){
    payload.message = payload.title
    ElMessage({
      ...payload
    })
  }
}