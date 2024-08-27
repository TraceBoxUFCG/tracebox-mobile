import axios from 'axios'
import type { AxiosInstance } from 'axios'
import 'pinia'
import type { App } from 'vue'
declare module 'pinia' {
  export interface PiniaCustomProperties {
    axios: AxiosInstance
  }
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {}
})

const PiniaAxiosPlugin = () => {
  return {
    axios: axiosClient
  }
}

const VueAxiosPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$axios = axiosClient

    app.provide('axios', axiosClient)
  }
}

export { PiniaAxiosPlugin, VueAxiosPlugin }
