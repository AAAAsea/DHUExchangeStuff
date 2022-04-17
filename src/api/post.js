import request from '../utils/request'

/**
 * 获取post列表
 */
export function getPostList() {
  return request({
    url: '/postlist',
    method: 'get',
    params: {
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