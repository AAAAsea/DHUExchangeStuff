  import { ElMessage } from 'element-plus';
  import 'element-plus/theme-chalk/el-message.css'; // 需要单独引入

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
  resetHotTags(state){
    state.data.tags.splice(0);
  },
  resetUserInfo(state){
    state.data.userPostList.splice(0);
    state.data.isLoggedIn = false;
    Object.keys(state.data.user).forEach(key=>{
      state.data.user[key] = ''
    })
  }
}