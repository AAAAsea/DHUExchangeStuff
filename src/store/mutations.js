import { ElNotification } from 'element-plus'

export default {
  updateData(state, { key, value }) {
    state.data[key] = value;
  },
  addPostList(state, postList){
    state.data.postList.push(...postList)
  },
  showToast(state, payload){
    ElNotification({
      ...payload
    })
  }
}