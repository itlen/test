import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('./views/view_Homepage.vue')
    }, {
      path: '/carusel',
      name: 'carusel',
      component: () => import('./views/view_Carusel.vue')
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
