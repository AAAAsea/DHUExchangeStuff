import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css'
import router from  './router'
//引入ElementPlus
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

createApp(App).use(router).mount('#app')

