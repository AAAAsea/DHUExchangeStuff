import axios from 'axios';
// 进度条动画
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store';

let baseURL = '/api';
if (process.env.NODE_ENV === "'dev'"){
  baseURL = '/api'
} else {
  baseURL = '/api'
}
const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 60000,
});

// 请求拦截器
service.interceptors.request.use(function (config) {
  NProgress.start()
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    NProgress.done()
    const res = response.data;
    // console.log(res)
    if(res.USER_NO_LOGIN == 52008 ) // 用户登录过期
    {
      store.commit('resetUserInfo')
      store.commit('showToast',{
        type: 'error',
        message: res.message
      })
    }
    return res;
  },
  async error => {
    NProgress.done()
    console.log(error)
  }
);

export default service;
