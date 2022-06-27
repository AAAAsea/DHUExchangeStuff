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
    searchPostList: [],
    currentHotTagName: '',
    unreadNotice: {
      comment: 0,
      follow: 0,
      like: 0,
      letter: 0,
      sum: 0
    }
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