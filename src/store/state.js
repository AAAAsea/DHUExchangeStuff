export default {
  data:{
    isLoggedIn: false,
    user: null,
    postCount: 99,
    userPostCount: 99,
    ...JSON.parse(localStorage.getItem('data')),
    postList: [],
    userPostList: []
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