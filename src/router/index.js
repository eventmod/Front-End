import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue';
import Create from "../views/CreateEvent.vue";
import EachEvent from "../views/EachEvent.vue";
import Profile from "../views/Profile.vue";
import ManageSys from "../views/ManageSystem.vue";
import EditEvent from "../views/EditEvent.vue";
import NotSupportDevice from "../views/NotSupportDevice.vue";

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome
  },
  {
    path: '/home',
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
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile
  },
  {
    path: '/manage',
    name: 'manage system',
    component: ManageSys
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditEvent
  },
  {
    path: '/notsupport',
    name: 'not support device',
    component: NotSupportDevice
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
