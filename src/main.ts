import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
