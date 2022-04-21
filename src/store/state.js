export default {
  data:{
    isLoggedIn: false,
    postList: [],
    user: null,
    ...JSON.parse(localStorage.getItem('data'))
  },
  model:{
    postModelFlag: false,
    loginModelFlag: false
  },
  user:{
    isLogin: false
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}