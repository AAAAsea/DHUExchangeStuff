import request from '../utils/request'

/**
 * 获取用户信息
 */
export function getUserInfo(){
  return request({
    url: '/users/info',
    method: 'get',
    params: {
      timestamp: new Date().getTime(),
    },
  })
} 

/**
 * 修改用户信息
 */
export function changeUserInfo({nickName, introduce}){
  return request({
    url: '/users/info',
    method: 'post',
    data: {
      nickName,
      introduce
    },
  })
}