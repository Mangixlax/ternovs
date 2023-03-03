import { NuxtApp } from '@nuxt/types/app'
import { AxiosRequestConfig } from 'axios'

export default function ({ $axios, $route, $config }: NuxtApp) {
  $axios.interceptors.request.use((config: AxiosRequestConfig) => {
    if ($config.productionApi === true) {
      config.url = config.url?.replace(/^\/api\//g, '/api-dev/')
      config.baseURL = process.server ? 'http://0.0.0.0:3000' : config.baseURL
    } else {
      config.baseURL = process.server
        ? 'http://nginx:8080'
        : process.env.BASE_URL
    }
    return config
  })

  // Sending the visit path to the server to get SEO data about the visited page
  // $axios.onRequest((config: AxiosRequestConfig) => {
  //   // Set the Path-Visited parameter if it is not set
  //   if (Object.keys(config.headers.common).indexOf('Path-Visited') === -1) {
  //     config.headers.common['Path-Visited'] = $route.path
  //   }
  // })

  if (process.client) {
    $axios.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}
