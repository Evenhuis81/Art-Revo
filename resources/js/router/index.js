import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Subsectors from '../pages/Subsectors.vue'
import auth from './auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/subsectors',
    component: Subsectors
  },
  ...auth,
  { path: '/:pathMatch(.*)*', name: 'not-found', component: { template: `<div>PageNotFound</div>`} },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
