import request from '../utils/request'


/**
 * 获取本人信息
 */
export function getMyInfo(){
  return request({
    url: '/users/info',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
} 
/**
 * 获取用户信息
 */
export function getUserInfo(id){
  return request({
    url: '/users/profile/'+id,
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
} 
/**
 * 修改用户昵称
 */
export function changeNickName(nickName){
  return request({
    url: '/users/nickName',
    method: 'post',
    params: {
      nickName
    },
  })
}
/**
 * 修改用户介绍
 */
export function changeDescription(description){
  return request({
    url: '/users/description',
    method: 'post',
    params: {
      description
    },
  })
}
/**
 * 修改用户昵头像
 */
export function changeAvatar(headerImage){
  return request({
    url: '/users/upload',
    method: 'post',
    params: {
      headerImage
    },
  })
}
/**
 * 修改用户昵头像
 */
export function follow(entityId){
  return request({
    url: '/follow',
    method: 'post',
    params: {
      entityType: 3,
      entityId
    },
  })
}
/**
 * 修改用户昵头像
 */
export function unfollow(entityId){
  return request({
    url: '/unfollow',
    method: 'post',
    params: {
      entityType: 3,
      entityId
    },
  })
}
/**
 * 获取关注列表
 */
export function getFollowees(id, offset = 0, limit = 10){
  return request({
    url: '/followees/' + id,
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}

/**
 * 获取粉丝
 */
export function getFollowers(id, offset = 0, limit = 10){
  return request({
    url: '/followers/' + id,
    method: 'get',
    params: {
      offset,
      limit
    },
  })
}