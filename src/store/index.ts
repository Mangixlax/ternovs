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
    state.categoriesList = value.data
  },
  setJournalCategoriesList(state: RootState, value: any) {
    state.journalCategoriesList = value.data
  },
  setBreadCrumbs(state: RootState, list = []) {
    state.breadCrumbs = list
  },
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit({ state, dispatch }: RootActionContext, { req }) {
    if (!state.isBot) {
      return Promise.all([
        dispatch('fetchCategoriesList'),
        dispatch('fetchJournalCategoriesList'),
      ])
    }
  },
  fetchCategoriesList({ commit }: RootActionContext): Promise<any | null> {
    return new Promise((resolve) => {
      this.$repositories.services
        .getCategoriesList()
        .then(async (data: any) => {
          // @TODO TBD
          commit('setCategoriesList', data)
          resolve(data)
        })
        .catch(() => resolve(null))
    })
  },
  fetchJournalCategoriesList({
    commit,
  }: RootActionContext): Promise<any | null> {
    return new Promise((resolve) => {
      this.$repositories.journal
        .getCategoriesList()
        .then(async (data: any) => {
          // @TODO TBD
          commit('setJournalCategoriesList', data)
          resolve(data)
        })
        .catch(() => resolve(null))
    })
  },
}
