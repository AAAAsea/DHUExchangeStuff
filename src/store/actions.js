import { getPostList } from '@/api/post'
export default {
  fetchPostList: ({ commit }) => {
    // if (!isAccountLoggedIn()) return;
    return getPostList().then(result => {
      console.log("postList",result.data)
      if (result.code === 200) {
        commit('updateData', { key: 'user', value: result.profile });
      }
    });
  },
}

