export default {
  data:{
    isLoggedIn: false,
    user: null,
    ...JSON.parse(localStorage.getItem('data')),
    postList: [],
    
  },
  model:{
    postModelFlag: false,
    loginModelFlag: false,
    leftDrawerModelFlag: false
  },
  user:{
    isLogin: false
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}