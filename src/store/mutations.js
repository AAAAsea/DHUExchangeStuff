import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
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
      'show-close': true,
      offset: 40,
      ...payload
    })
  },
  resetPostList(state){
    state.data.postList.splice(0);
  },
  resetUserInfo(state){
    const router = useRouter()
    console.log(router)
    state.data.userPostList.splice(0);
    state.data.isLoggedIn = false;
    state.data.user = null;
    // router.push({path: '/'})
    document.cookie = "ticket=;path=/";
  }
}