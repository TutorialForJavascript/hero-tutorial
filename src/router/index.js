import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/herolist',
    name: 'Herolist',
    component: () => import(/* webpackChunkName: "about" */ '../views/Herolist.vue')

  },
  {
    path: '/herodetail',
    name: 'HeroCreate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Herodetail.vue')
  },
  {
    path: '/herodetail/:id',
    name: 'Herodetail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Herodetail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

