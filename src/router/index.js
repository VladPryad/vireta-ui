import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '@/components/MainPage/MainPage.vue'
import Login from '@/components/Login/Login.vue'
import Pot from '@/components/Pot/Pot.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
  {
    path: '/pot',
    name: 'pot',
    component: Pot
  },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
