import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
// 后端接口域名（按需替换）
axios.defaults.baseURL = 'http://172.20.10.7:8080'
// 全局携带 Cookie
axios.defaults.withCredentials = true


const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
