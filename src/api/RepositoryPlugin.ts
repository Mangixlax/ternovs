import { Context, Plugin, Inject } from '@nuxt/types/app'
import JournalRepository from '~/api/repositories/JournalRepository'
import ServicesRepository from '~/api/repositories/ServicesRepository'
interface IRepositoryList {
  journal: JournalRepository
  services: ServicesRepository
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
    journal: new JournalRepository(context.$axios),
    services: new ServicesRepository(context.$axios),
  })
}

export default RepositoryPlugin
