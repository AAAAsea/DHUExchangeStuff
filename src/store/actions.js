import { getPostList } from '@/api/post'
import { getUserInfo } from '@/api/user'

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
  fetchNewPostList: ({ commit } ) => {

    return getPostList(
      15, // limit
      0, // offset
    ).then(result => {
      if (result.code === 20000) {
        commit('resetPostList');
        commit('addData', { key: 'postList', value: result.data.postList });
      }
    });
  },
  // 获取用户信息
  fetchUserProfile: ({ commit }) => {
    // if (!isAccountLoggedIn()) return;
    console.log("profile")
    return getUserInfo().then(result => {
    console.log(result)
    if (result.code === 20000) {
      commit('updateData', { key: 'user', value: result.data.user });
    }
    });
  },
}

