import axios from 'axios';

let baseURL = 'http://localhost:8080/api';

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1500,
});

// 请求拦截器
service.interceptors.request.use(function (config) {
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    return res;
  },
  async error => {
    console.log(error)
  }
);

export default service;
