import request from '../utils/request'

/**
 * 获取post列表
 */
export function getPostList(limit=20, offset=0) {
  return request({
    url: '/tags/hot',
    method: 'get',
    params: {
      limit,
      offset,
      timestamp: new Date().getTime(),
    },
  });
}
