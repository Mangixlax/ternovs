import { Context, Plugin, Inject } from '@nuxt/types/app'
import MediaRepository from '~/api/repositories/MediaRepository'

interface IRepositoryList {
  media: MediaRepository
}

declare module 'vue/types/vue' {
  // this.$repositories inside Vue components
  interface Vue {
    $repositories: IRepositoryList
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$repositories inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $repositories: IRepositoryList
  }
  // nuxtContext.$repositories
  interface Context {
    $repositories: IRepositoryList
  }
}

declare module 'vuex/types/index' {
  // this.$repositories inside Vuex stores
  interface Store<S> {
    $repositories: IRepositoryList
  }
}

const RepositoryPlugin: Plugin = (context: Context, inject: Inject) => {
  inject('repositories', {
    media: new MediaRepository(context.$axios),
  })
}

export default RepositoryPlugin
