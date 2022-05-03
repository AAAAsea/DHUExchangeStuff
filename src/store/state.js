export default {
  data:{
    isLoggedIn: false,
    user: {
      id: '',
      nickName: '',
      username: '',
      headerUrl: '',
      bakgroundUrl: ''
    },
    postCount: 99,
    userPostCount: 99,
    ...JSON.parse(localStorage.getItem('data')),
    postList: [],
    userPostList: [],
    tags: [],
    hotPostList: [],
    currentHotTagName: ''
  },
  model:{
    postModelFlag: false,
    loginModelFlag: false,
    leftDrawerModelFlag: false,
    rightDrawerModelFlag: false,
    modelWidth: '500px',
    publishPostFlag: true,
    progressModelFlag: false,
    progressPercentage: 0
  },
  user:{
    isLogin: true
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}