import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.scss'
import './assets/css/element.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 路由
import router from  './router'
// Vuex
import store from './store'
// i18n
import i18n from './local';
// 引入ElementPlus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// 进度条动画
import 'nprogress/nprogress.css'
import nprogress from 'nprogress'

//noprogress
nprogress.inc(0.2)
nprogress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// const isDebug_mode =  process.env.NODE_ENV !== 'development';


const app = createApp(App)
// app.config.debug = isDebug_mode;
// app.config.devtools = false;
// app.config.productionTip = isDebug_mode;


app.use(router)
  // .use(ElementPlus)
  .use(store)
  .use(i18n)
  .mount('#app')

