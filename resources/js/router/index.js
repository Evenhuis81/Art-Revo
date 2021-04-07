import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: `<div>PageNotFound</div>`} },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
