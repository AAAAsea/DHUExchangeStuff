import request from '../utils/request'

/**
 * 获取邮箱验证码
 */
export function getMailCode(username) {
  return request({
    url: '/users/code',
    method: 'get',
    params: {
      username
    },
  });
}

/**
 * 注册
 */
export function regist({username, password, code, nickName}) {
  return request({
    url: '/register',
    method: 'post',
    params: {
      username,
      password,
      code,
      nickName
    },
  });
}

/**
 * 登录
 */
export function login(username, password) {
  return request({
    url: '/login',
    method: 'get',
    params: {
      username,
      password,
    },
  });
}