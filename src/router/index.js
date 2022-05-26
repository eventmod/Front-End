import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Create from "../views/CreateEvent.vue";
import EachEvent from "../views/EachEvent.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/each/:id',
    name: 'each event',
    component: EachEvent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
