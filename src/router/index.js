import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../views/WEB/Welcome.vue';
import Home from '../views/WEB/Home.vue';
import Create from "../views/WEB/CreateEvent.vue";
import EachEvent from "../views/WEB/EachEvent.vue";
import Profile from "../views/WEB/Profile.vue";
import ManageSys from "../views/WEB/ManageSystem.vue";
import EditEvent from "../views/WEB/EditEvent.vue";
import NotSupportDevice from "../views/WEB/NotSupportDevice.vue";
import AuthenKMUTT from "../views/LIFF/AuthenKMUTT.vue";

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
  {
    path: '/liffauth',
    name: 'LIFF Authen KMUTT',
    component: AuthenKMUTT
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
