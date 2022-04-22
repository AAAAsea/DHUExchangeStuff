import request from '../utils/request'

/**
 * 获取post列表
 */
export function getPostList(limit=20, offset=0) {
  return request({
    url: '/postlist',
    method: 'get',
    params: {
      limit,
      offset,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取post详细信息
 */
export function getPostDetail(id) {
  return request({
    url: '/postdetail',
    method: 'get',
    params: {
      id
    },
  });
}

/**
 * 发布新的post
 */
export function addPost(title, content, tags) {
  return request({
    url: '/post/add',
    method: 'post',
    params: {
      title,
      content,
      tags,
      timestamp: new Date().getTime(),
    },
  });
}
