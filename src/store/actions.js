import { getPostList } from '@/api/post'
import { getUserInfo } from '@/api/user'
export default {
  // 获取postList
  fetchPostList: ({ commit }) => {``
    // if (!isAccountLoggedIn()) return;
    return getPostList().then(result => {
      console.log("postList",result.data)
      if (result.code === 200) {
        commit('updateData', { key: 'user', value: result.profile });
      }
    });
  },

  // 获取用户信息
  fetchUserProfile: ({ commit }) => {
    // if (!isAccountLoggedIn()) return;
    return getUserInfo().then(result => {
      if (result.code === 20000) {
        commit('updateData', { key: 'user', value: result.profile });
      }
    });
  },
}

