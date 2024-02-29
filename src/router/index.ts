import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import TelaTodo from '@/views/Todo/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TelaTodo
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
