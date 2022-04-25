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
    leftDrawerModelFlag: false,
    modelWidth: '500px'
  },
  user:{
    isLogin: true
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}