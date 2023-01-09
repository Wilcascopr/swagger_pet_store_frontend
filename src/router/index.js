import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FilterView from '../views/FilterView.vue'
import CreateView from '../views/CreateView.vue'
import PetView from '../views/PetView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: FilterView
  },
  {
    path: '/create/:id?',
    name: 'create',
    component: CreateView,
    params: true
  },
  {
    path: '/pet/:id',
    name: 'pet',
    component: PetView,
    params: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
