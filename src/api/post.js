import request from '../utils/request'

/**
 * 获取post列表
 */
export function getPostList(limit=20, offset=0, userId = 0) {
  return request({
    url: '/postlist',
    method: 'get',
    params: {
      userId,
      limit,
      offset,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取post详细信息
 */
export function getPostDetail({id, offset = 0, limit = 10}) {
  return request({
    url: '/post/detail/'+id,
    method: 'get',
    params: {
      id,
      offset,
      limit
    },
  });
}

/**
 * 发布新的post
 */
export function addPost(formData, progressCallBack) {
  // console.log(formData)
  return request({
    url: '/post/add',
    method: 'post',
    data: formData,
    onUploadProgress: progressCallBack
  });
}

/**
 * 发布新的评论
 */
export function addComment({id, entityType, content, entityId = 0, targetId = 0}) {
  console.log(arguments)
  return request({
    url: '/comment/add/' + id,
    method: 'post',
    data: {
      entityType,
      entityId,
      targetId,
      content
    },
  });
}

/**
 * 发布新的点赞
 */
export function changeLikeStatus({entityType, entityId, entityUserId}) {
  return request({
    url: '/like',
    method: 'post',
    params: {
      entityType,
      entityId,
      entityUserId
    },
  });
}

/**
 * 删除
 */
export function deletePost(id) {
  return request({
    url: '/users/delete/' + id,
    method: 'post',
    data: {
      
    },
  })
}