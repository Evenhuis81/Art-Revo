import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import auth from './auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  ...auth,
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: `<div>PageNotFound</div>`} },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
