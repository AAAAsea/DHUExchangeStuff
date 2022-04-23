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
    payload.message = payload.message ?? payload.title
    ElMessage({
      ...payload
    })
  },
  resetPostList(state){
    state.data.postList.splice(0)
  },
  resetUserInfo(state){
    state.data.isLoggedIn = false;
    state.data.user = null;
    var expires = new Date();
    expires.setTime(expires.getTime() - 10);
    document.cookie = 'ticket='+decodeURI('echo')+';expires=' + expires.toGMTString();
  }
}