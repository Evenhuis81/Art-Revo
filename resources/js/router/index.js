import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Redirect from '../pages/Redirect.vue'
import auth from './auth'
import admin from './admin'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: Redirect
},
  ...auth,
  ...admin,
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: `<div>PageNotFound</div>`} },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
