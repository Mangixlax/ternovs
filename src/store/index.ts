import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'
export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

export const state = () => ({
  categoriesList: [],
  journalCategoriesList: [],
  isBot: false,
  breadCrumbs: [],
})
/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {
  getCategoriesList(state: RootState): any {
    return state.categoriesList
  },
  getJournalCategoriesList(state: RootState): any {
    return state.journalCategoriesList
  },
  getBreadCrumbs(state: RootState) {
    return state.breadCrumbs
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setCategoriesList(state: RootState, value: any) {
    state.categoriesList = value.catalog.categories
  },
  setJournalCategoriesList(state: RootState, value: any) {
    state.journalCategoriesList = value.journal.categories
  },
  setBreadCrumbs(state: RootState, list = []) {
    state.breadCrumbs = list
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ dispatch }: RootActionContext) {
    return Promise.all([dispatch('fetchMainData')])
  },
  fetchMainData({ commit }: RootActionContext): Promise<any | null> {
    return new Promise((resolve) => {
      this.$axios
        .$get('/api/v1/main')
        .then(async (data: any) => {
          // @TODO TBD
          commit('setCategoriesList', data)
          commit('setJournalCategoriesList', data)
          resolve(data)
        })
        .catch(() => resolve(null))
    })
  },
}
