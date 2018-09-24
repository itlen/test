import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/view_Home.vue')
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('./views/view_Weather.vue')

    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('./views/view_Contacts.vue')
    }
  ]
})
