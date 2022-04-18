export default {
  data:{
    loginMode:'',
    ...JSON.parse(localStorage.getItem('data'))
  },
  settings:{
    lang: 'zh-CN',
    ...JSON.parse(localStorage.getItem('settings'))
  },
  liked:{
    ...JSON.parse(localStorage.getItem('liked'))
  }
}