import request from '../utils/request'

/**
 * 获取邮箱验证码
 */
export function getMailCode(mail) {
  return request({
    url: '/user/code',
    method: 'post',
    params: {
      mail
    },
  });
}