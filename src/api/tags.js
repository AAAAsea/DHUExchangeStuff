import request from '../utils/request'

/**
 * 获取post列表
 */
export function getHotTags(offset=10, limit=0) {
  return request({
    url: '/hotTag',
    method: 'get',
    params: {
      limit,
      offset,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 根据tagId获取post列表
 */
export function getPostListByTagId(offset=0, limit=10, tagId=0) {
  return request({
    url: '/hotPost',
    method: 'get',
    params: {
      limit,
      offset,
      tagId,
      timestamp: new Date().getTime(),
    },
  });
}
