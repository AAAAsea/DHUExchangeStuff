import { getPostList } from '@/api/post'
import {  getMyInfo, getUserInfo } from '@/api/user'
// import { isAccountLoggedIn } from '@/utils/auth';
export default {
  // 获取postList
  fetchPostList: ({ commit, state }, userId = 0 ) => {
    // if (!isAccountLoggedIn()) return;
    return getPostList(
      15, // limit
      userId === 0 ? state.data.postList.length : state.data.userPostList.length, // offset
      userId
    ).then(result => {
      if (result.code === 20000) {
        if(userId === 0)
        {
          state.data.postCount = result.data.postCount; // 保存一下总post数量
        }else{
          state.data.userPostCount = result.data.postCount; // 保存一下总post数量
        }
        commit('addData', { key: userId === 0 ?  'postList' : 'userPostList', value: result.data.postList });
      }
    });
  },
    // 更新postList
  fetchNewPostList: ({ commit, state }, userId = 0 ) => {
    return getPostList(
      15, // limit
      0, // offset, 
      userId
    ).then(result => {
      if (result.code === 20000) {
        if(userId === 0)
        {
          state.data.postCount = result.data.postCount; // 保存一下总post数量
        }else{
          state.data.userPostCount = result.data.postCount; // 保存一下总post数量
        }
        commit('updateData', { key: userId === 0 ?  'postList' : 'userPostList', value: result.data.postList });
      }
    });
  },
  // 获取用户信息
  fetchUserProfile: ({ commit, state }) => {
    // if (!isAccountLoggedIn()) return;
    console.log("profile")
    return getUserInfo(state.data.user.id).then(result => {
    console.log(result)
    if (result.code === 20000) {
      commit('updateData', { key: 'user', value: result.data.user });
    }
    });
  },
  // 获取本人信息
  fetchMyProfile: ({ commit }) => {
    return getMyInfo().then(result => {
    if (result.code === 20000) {
      commit('updateData', { key: 'user', value: result.data.user });
    }
    });
  },
}

