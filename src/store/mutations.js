import { ElMessage } from 'element-plus'

export default {
  updateData(state, { key, value }) {
    // console.log(key, value)
    state.data[key] = value;
  },
  addData(state, {key, value}){
    // console.log(value)
    state.data[key].push(...value)
  },
  showToast(state, payload){
    payload.message = payload.message ?? payload.title
    ElMessage({
      'show-close': true,
      offset: 40,
      ...payload
    })
  },
  resetPostList(state){
    state.data.postList.splice(0);
  },
  resetUserInfo(state){
    state.data.userPostList.splice(0);
    state.data.isLoggedIn = false;
    state.data.user = null;
    document.cookie = "ticket=;path=/";
  }
}