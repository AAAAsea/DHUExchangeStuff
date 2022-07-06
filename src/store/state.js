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
    },
    searchText: '',
    imageViewPics: [],
    imageViewIndex: 0,
    imageViewPicQuery: '',
    imageViewPosition: {
      top: 500,
      left: 0,
      right: 0,
      bottom: 0
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
    progressPercentage: 0,
    imageViewFlag: false
  },
  user:{
    isLogin: true
  },
  settings:{
    lang: 'zh-CN',
    theme: 'light',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}