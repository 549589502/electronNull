/*
 * @Description: 
 * @Author: hexueying
 * @Date: 2025-03-19 13:50:20
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-19 17:22:55
 * @FilePath: main.ts
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
