import store from '../store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/protected',
    name: 'Protected',
    meta: { auth: true },
    component: () => import(/* webpackChunkName: "protected" */ '@/views/Protected.vue')
  },
  {
    path: '*',
    redirect: 'login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Responsible for guard the routes with meta auth:true
router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters['users/isAuthenticated']
  if (to.matched.some(record => record.meta.auth)) {
    if (!isUserLoggedIn) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
