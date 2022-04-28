import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.scss'
// 路由
import router from  './router'
// Vuex
import store from './store'
// i18n
import i18n from './local';
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 进度条动画
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'

//简单的配置，一般情况speed配置为500
nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false })
console.log(process.env.NODE_ENV)


const app = createApp(App)
app.config.devtools = (process.env.NODE_ENV !== 'production') // 上线后关闭开发者工具
app.use(router)
  .use(ElementPlus)
  .use(store)
  .use(i18n)
  .mount('#app')
  
