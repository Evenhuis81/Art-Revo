import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import auth from './auth'
import admin from './admin'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...auth,
  ...admin,
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: `<div>PageNotFound</div>`} },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
