import { getPostList } from '@/api/post'
import { getUserInfo } from '@/api/user'

export default {
  // 获取postList
  fetchPostList: ({ commit, state } ) => {
    // if (!isAccountLoggedIn()) return;
    return getPostList(
      15, // limit
      state.data.postList.length, // offset
    ).then(result => {
      // console.log("postList",result.data)
      if (result.code === 20000) {
        commit('addData', { key: 'postList', value: result.data });
      }
    });
  },
    // 更新postList
  fetchNewPostList: ({ commit } ) => {
    // if (!isAccountLoggedIn()) return;
    return getPostList(
      15, // limit
      0, // offset
    ).then(result => {
      // console.log("postList",result.data)
      if (result.code === 20000) {
        commit('resetPostList');
        commit('addData', { key: 'postList', value: result.data });
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

