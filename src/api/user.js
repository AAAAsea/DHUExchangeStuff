import request from '../utils/request'

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
 * 修改用户昵称
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