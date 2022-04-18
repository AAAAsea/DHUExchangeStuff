export default {
  data:{
    loginMode:'',
    ...JSON.parse(localStorage.getItem('data'))
  },
  model:{
    postModelFlag: false
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
}