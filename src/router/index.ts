/*
 * @Description: 
 * @Author: hexueying
 * @Date: 2025-03-19 16:25:20
 * @LastEditors: hexueying
 * @LastEditTime: 2025-03-20 11:48:26
 * @FilePath: index.ts
 */
import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean
    title?: string
  }
}

const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { keepAlive: true, title: '首页' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { keepAlive: true, title: '登录页' }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/Detail.vue'),
    meta: { keepAlive: true, title: '详情页' }
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue3 Demo'

  //路由拦截：如果有token才可以进去
  //当前去的页面名称：
  let toName: string = to.name as string;
  if (toName != "login") {
    if (localStorage.getItem("aps_token")) {
      next();
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
})


export default router
