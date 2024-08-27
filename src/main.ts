import './assets/index.css'
import 'iconify-icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { PiniaAxiosPlugin, VueAxiosPlugin } from './plugins/axios'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App)
const pinia = createPinia()
pinia.use(PiniaAxiosPlugin)

app.use(pinia)
app.use(router)
app.use(VueAxiosPlugin)
app.use(autoAnimatePlugin)
app.mount('#app')
