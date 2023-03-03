import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default class BaseRepository {
  public axios: NuxtAxiosInstance

  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios
  }
}
