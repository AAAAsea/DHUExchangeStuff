export default {
  data:{
    loginMode:'',
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