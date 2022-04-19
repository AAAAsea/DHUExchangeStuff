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
    isLogin: true
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}