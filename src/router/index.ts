import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewUser from '@/views/ViewUser.vue'
import ViewCode from '@/views/ViewCode.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Assistance App'
    }

  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/ViewUser.vue'),
    meta: {
      title: 'Assistance | User'
    }

  },
  {
    path: '/code-view',
    name: 'CodeView',
    component: () => import('../views/ViewCode.vue'),
    meta: {
      title: 'Code View'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
