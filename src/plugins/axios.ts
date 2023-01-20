import { NuxtApp } from '@nuxt/types/app'
import { AxiosRequestConfig } from 'axios'

export default function (ctx: NuxtApp) {
  ctx.$axios.interceptors.request.use((config: AxiosRequestConfig) => {
    config.baseURL = process.server ? 'http://nginx:8080' : process.env.BASE_URL
    
    return config
  })

  // Sending the visit path to the server to get SEO data about the visited page
  ctx.$axios.onRequest((config: AxiosRequestConfig) => {
    // Set the Path-Visited parameter if it is not set
    if (Object.keys(config.headers.common).indexOf('Path-Visited') === -1) {
      config.headers.common['Path-Visited'] = ctx.route.path
    }
  })

  if (process.client) {
    ctx.$axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
