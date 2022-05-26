import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import 'remixicon/fonts/remixicon.css'

import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const app = createApp(App)

app.use(router)
app.mount('#app')
app.component('NavBar',NavBar)
app.component('Footer',Footer)

// createApp(App).use(router).mount('#app').component('NavBar',NavBar)
