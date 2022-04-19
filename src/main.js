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

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(store)
  .use(i18n)
  .mount('#app')

