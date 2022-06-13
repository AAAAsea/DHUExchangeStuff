import { getPostList, getPostListBySearch } from '@/api/post'
import {  getMyInfo, getUserInfo } from '@/api/user'
import {  getHotTags, getPostListByTagId } from '@/api/tags'

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
    // console.log("profile")
    return getUserInfo(state.data.user.id).then(result => {
    // console.log(result)
    if (result.code === 20000) {
      commit('updateData', { key: 'user', value: result.data.user });
    }
    });
  },
  // 获取本人信息（登录后调用）
  fetchMyProfile: ({ commit }) => {
    return getMyInfo().then(result => {
      if (result.code === 20000) {
        commit('updateData', { key: 'user', value: result.data.user });
      }
    });
  },
  // 获取热门标签
  fetchHotTags: ({ commit },{ offset = 0, limit = 10}) => {
    // console.log(offset,limit)
    return getHotTags(offset, limit).then(result => {
      // console.log(result)
    if (result.code === 20000) {
      commit('addData', { key: 'tags', value: result.data });
    }
    });
  },
  // 获取热门postList
  fetchHotPostList: ({ commit, state }, {offset = 0, limit = 10, id}) => {
    // if (!isAccountLoggedIn()) return;
    if(offset === 0)
    {
      state.data.hotPostList.splice(0)
    }
    return getPostListByTagId(
      offset,
      limit,
      id
    ).then(result => {
      if (result.code === 20000) {
        commit('addData', { key: 'hotPostList', value: result.data.postList });
        commit('updateData', { key: 'currentHotTagName', value: result.data.tagName });
      }
    });
  },
  // 获取搜索postList
  fetchSearchPostList: ({ commit, state }, {offset = 0, limit = 10, keyword}) => {
    if(offset === 0)
    {
      state.data.searchPostList.splice(0)
    }
    return getPostListBySearch(
      {
        offset,
        limit,
        keyword
      }
    ).then(result => {
      if (result.code === 20000) {
        commit('addData', { key: 'searchPostList', value: result.data.postList });
        commit('updateData', { key: 'currentSearchTagName', value: result.data.tagName });
      }
    });
  },
}

